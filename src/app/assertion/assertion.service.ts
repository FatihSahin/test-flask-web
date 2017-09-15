import { Injectable } from '@angular/core';
import { TestFlaskApiService } from "app/services/test-flask-api.service";
import { Assertion, Step, Invocation, AssertionStatus } from "models/model";
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';
import * as _ from "lodash";
import * as httpRequestParser from "http-request-parser";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";

@Injectable()
export class AssertionService {

  assertions: Assertion[];

  constructor(private api: TestFlaskApiService, private http: HttpClient) {
    this.assertions = [];
  }

  getAssertionTitle(step: Step) {
    return step.stepNo + ' - ' + step.stepName;
  }

  loadByStep(stepNo: number): void {
    this.getByStep(stepNo).subscribe(assertion => {
      this.assertions = [];
      this.assertions.push(assertion);
    });
  }

  getByStep(stepNo: number): Observable<Assertion> {
    return this.api.getAssertionByStep(stepNo);
  }

  loadByScenario(scenarioNo: number): void {
    this.api.getAssertionsByScenario(scenarioNo).subscribe(assertions => {
      this.assertions = assertions;
    });
  }

  loadByProject(projectKey: string): void {
    this.api.getAssertionsByProject(projectKey).subscribe(assertions => {
      this.assertions = assertions;
    });
  }

  private showExplorer(): void {
    if (document.body.classList.contains('aside-menu-hidden')) {
      document.body.classList.remove('aside-menu-hidden');
    }
    window.scrollTo(0, 0);
  }

  assertAndShowStep(step: Step, assertion: Assertion) {
    this.showExplorer();

    //update explorer
    assertion.status = AssertionStatus.NotAsserted;
    this.assertions = [assertion];

    //trigger assertion
    this.assertStep(step, assertion).subscribe(updatedAssertion => {
      this.assertions = [assertion];
    });
  }

  private assertStep(step: Step, assertion: Assertion): Observable<Assertion> {

    const rootInvocation = step.invocations.find(i => i.depth === 1);
    const expectedObj = JSON.parse(assertion.expected);

    return this.callService(rootInvocation).flatMap(result => {
      const isMatch = _.isMatch(result, expectedObj);

      assertion.lastAssertedOn = new Date();
      assertion.status = isMatch ? AssertionStatus.Success : AssertionStatus.Fail;
      assertion.title = this.getAssertionTitle(step);
      assertion.lastAssertionResult = JSON.stringify(result);

      return this.api.updateAssertion(assertion);
    });
  }

  private callService(rootInvocation: Invocation): Observable<Object> {
    //result object
    let resultObj: Object;

    //parse raw http request   
    //https://www.npmjs.com/package/http-request-parser  
    let parsedRequestObj: any = httpRequestParser.parse(rootInvocation.requestRaw);

    //transform parsedRequestObj to make it suitable from Angular httpclient
    //lookup http method
    let httpHeaders: HttpHeaders = this.mapHttpHeaders(parsedRequestObj.headers, rootInvocation);

    if (parsedRequestObj.method === "POST") {
      //call service and get response obj
      const originalUrl: string = (<string>(parsedRequestObj.protocol)).toLowerCase() + '://' + parsedRequestObj.url;

      return this.http.post(originalUrl, parsedRequestObj.body.plain, { headers: httpHeaders })
        .flatMap(res => this.handleResult(rootInvocation)) //handle success
        .catch(err => this.handleResult(rootInvocation)); //or handle error both same as we go to api again and refresh assertion result
    }

    return Observable.of(resultObj);
  }

  private handleResult(rootInvocation: Invocation): Observable<Assertion> {
    //call api and get a fresh rootInvocation to obtain modified AssertionResult
    return this.api.getInvocation(rootInvocation.instanceHashCode).flatMap(inv => {
      //return assertion result as json object
      return Observable.of(JSON.parse(inv.assertionResult));
    });
  }

  private forbiddenCorsHeaders: string[] = ["Content-Length", "Accept-Encoding", "Host", "User-Agent", "Origin"];

  private mapHttpHeaders(headers: Array<any>, rootInvocation: Invocation): HttpHeaders {
    let angHeaders: HttpHeaders = new HttpHeaders();

    headers.forEach(hdr => {
      if (!(_.includes(this.forbiddenCorsHeaders, hdr.name))) {

        //find TestFlask-TestMode header and set it to 'Assert' mode
        if (hdr.name === "TestFlask-Mode") {
          angHeaders = angHeaders.append(hdr.name, "Assert");
        }
        else {
          angHeaders = angHeaders.append(hdr.name, hdr.values[0].value);
        }
      }
    });

    //append a step no header
    angHeaders = angHeaders.append("TestFlask-StepNo", rootInvocation.stepNo.toString());

    return angHeaders;
  }
}
