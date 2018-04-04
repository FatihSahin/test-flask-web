import { Component, OnInit, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { StepService } from 'app/step/step.service';
import { Invocation } from 'models/model';
import { TestFlaskApiService } from 'app/services/test-flask-api.service';
// import { JsonEditorComponent, JsonEditorOptions } from 'angular4-jsoneditor/jsoneditor/jsoneditor.component';
import { ChangeDetectorRef } from '@angular/core';
import { JsonViewerComponent } from 'app/shared/json-viewer.component';

@Component({
  selector: 'app-invocation',
  templateUrl: './invocation.component.html',
  styleUrls: ['./invocation.component.scss']
})
export class InvocationComponent implements OnInit {

  invocationHashCode: string;
  invocation: Invocation;

  jsonViewerForRequest: JsonViewerComponent;
  jsonViewerForResponse: JsonViewerComponent;
  jsonViewerForException: JsonViewerComponent;

  @ViewChild('jsonViewerForRequest') set viewerRequest(viewer: JsonViewerComponent) {
    this.jsonViewerForRequest = viewer;
    this.setRequest();
  }

  @ViewChild('jsonViewerForResponse') set viewerResponse(viewer: JsonViewerComponent) {
    this.jsonViewerForResponse = viewer;
    this.setResponse();
  }

  @ViewChild('jsonViewerForException') set viewerException(viewer: JsonViewerComponent) {
    this.jsonViewerForException = viewer;
    this.setException();
  }

  constructor(private api: TestFlaskApiService, private route: ActivatedRoute, private stepService: StepService,
    private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.invocationHashCode = params.get('hashCode');
      this.invocation = this.stepService.getInvocation(this.invocationHashCode);

      this.setRequest();
      this.setResponse();
      this.setException();
    });
  }

  private setException() {
    if (this.jsonViewerForException) {
      this.jsonViewerForException.setData(this.invocation.exception);
    }
  }

  private setResponse() {
    if (this.jsonViewerForResponse) {
      this.jsonViewerForResponse.setData(this.invocation.response);
    }
  }

  private setRequest() {
    if (this.jsonViewerForRequest) {
      this.jsonViewerForRequest.setData(this.invocation.request);
    }
  }

  onChangeRequest(data: Object): void {
    this.invocation.request = JSON.stringify(data);
  }

  onChangeResponse(data: Object): void {
    this.invocation.response = JSON.stringify(data);
  }

  onChangeException(data: Object): void {
    this.invocation.exception = JSON.stringify(data);
  }
}
