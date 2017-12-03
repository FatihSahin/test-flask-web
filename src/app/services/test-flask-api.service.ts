import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project, Scenario, Step, Invocation, Assertion } from 'models/model';
import { AppSettings } from 'appSettings/appSettings';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TestFlaskApiService {

  constructor(private http: HttpClient) {
  }

  public getProjects(): Observable<Project[]>  {
    return this.http.get<Project[]>(AppSettings.API_ENDPOINT + 'project');
  }

  public getProject(projectKey: string): Observable<Project> {
    return this.http.get<Project>(AppSettings.API_ENDPOINT + 'project/' + projectKey);
  }

  public getScenariosFlat(projectKey: string): Observable<Scenario[]> {
    return this.http.get<Scenario[]>(AppSettings.API_ENDPOINT + 'project/scenarios/' + projectKey);
  }

  public getScenarioFlat(scenarioNo: number): Observable<Scenario> {
    return this.http.get<Scenario>(AppSettings.API_ENDPOINT + 'scenario/' + scenarioNo);
  }

  public getInvocation(instanceHashCode: string): Observable<Invocation> {
    return this.http.get<Invocation>(AppSettings.API_ENDPOINT + 'step/invocation/' + instanceHashCode);
  }

  public getStep(stepNo: number): Observable<Step> {
    return this.http.get<Step>(AppSettings.API_ENDPOINT + 'step/' + stepNo);
  }

  public updateStep(step: Step): Observable<Step> {
    return this.http.put<Step>(AppSettings.API_ENDPOINT + 'step/', step);
  }

  // inserts or updates
  public putAssertion(assertion: Assertion): Observable<Assertion> {
    return this.http.put<Assertion>(AppSettings.API_ENDPOINT + 'step/assertion/' + assertion.stepNo, assertion)
  }

  public getAssertionByStep(stepNo: number): Observable<Assertion> {
    return this.http.get<Assertion>(AppSettings.API_ENDPOINT + 'step/assertion/' + stepNo);
  }

  public getAssertionsByScenario(scenarioNo: number): Observable<Assertion[]> {
    return this.http.get<Assertion[]>(AppSettings.API_ENDPOINT + 'scenario/assertion/' + scenarioNo);
  }

  public getAssertionsByProject(projectKey: string): Observable<Assertion[]> {
    return this.http.get<Assertion[]>(AppSettings.API_ENDPOINT + 'project/assertion/' + projectKey);
  }

  public insertScenario(scenario: Scenario): Observable<Scenario> {
    return this.http.post<Scenario>(AppSettings.API_ENDPOINT + 'scenario', scenario);
  }

  public cloneScenario(scenarioNo: number): Observable<Scenario> {
    return this.http.post<Scenario>(AppSettings.API_ENDPOINT + 'scenario/clone', scenarioNo);
  }

  public updateScenario(scenario: Scenario): Observable<Scenario> {
    return this.http.put<Scenario>(AppSettings.API_ENDPOINT + 'scenario', scenario);
  }

  public insertProject(project: Project): Observable<Project> {
    return this.http.post<Project>(AppSettings.API_ENDPOINT + 'project', project);
  }

  public updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>(AppSettings.API_ENDPOINT + 'project', project);
  }

  ngOnInit() {

  }

}
