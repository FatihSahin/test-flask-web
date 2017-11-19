import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { StepService } from 'app/step/step.service';
import { Invocation } from 'models/model';
import { TestFlaskApiService } from 'app/services/test-flask-api.service';
import { JsonEditorComponent, JsonEditorOptions } from 'angular4-jsoneditor/jsoneditor/jsoneditor.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-invocation',
  templateUrl: './invocation.component.html',
  styleUrls: ['./invocation.component.scss']
})
export class InvocationComponent implements OnInit {

  invocationHashCode: string;
  invocation: Invocation;

  jsonEditorForRequestOptions: JsonEditorOptions;
  @ViewChild('jsonEditorForRequest') jsonEditorForRequest: JsonEditorComponent;

  jsonEditorForResponseOptions: JsonEditorOptions;
  @ViewChild('jsonEditorForResponse') jsonEditorForResponse: JsonEditorComponent;

  jsonEditorForExceptionOptions: JsonEditorOptions;
  @ViewChild('jsonEditorForException') jsonEditorForException: JsonEditorComponent;

  constructor(private api: TestFlaskApiService, private route: ActivatedRoute, private stepService: StepService,
    private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.invocationHashCode = params.get('hashCode');
      this.invocation = this.stepService.getInvocation(this.invocationHashCode);

      this.jsonEditorForRequestOptions = new JsonEditorOptions();
      this.jsonEditorForRequestOptions.mode = 'code';
      this.jsonEditorForRequestOptions.modes = ['code', 'tree', 'text'];
      this.jsonEditorForRequestOptions.onChange = (() => {
        this.invocation.request = this.jsonEditorForRequest.getText();
      }).bind(this);

      this.jsonEditorForResponseOptions = new JsonEditorOptions();
      this.jsonEditorForResponseOptions.mode = 'code';
      this.jsonEditorForResponseOptions.modes = ['code', 'tree', 'text'];
      this.jsonEditorForResponseOptions.onChange = (() => {
        this.invocation.response = this.jsonEditorForResponse.getText();
      }).bind(this);

      this.jsonEditorForExceptionOptions = new JsonEditorOptions();
      this.jsonEditorForExceptionOptions.mode = 'code';
      this.jsonEditorForExceptionOptions.modes = ['code', 'tree', 'text'];
      this.jsonEditorForExceptionOptions.onChange = (() => {
        this.invocation.exception = this.jsonEditorForException.getText();
      }).bind(this);

      this.changeDetector.detectChanges();
    });
  }
}

