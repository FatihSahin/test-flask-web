import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Assertion, AssertionStatus } from 'models/model';
import { JsonEditorComponent, JsonEditorOptions } from 'angular4-jsoneditor/jsoneditor/jsoneditor.component';
import { race } from 'rxjs/observable/race';

@Component({
    selector: 'app-step-assert',
    templateUrl: './step-assert.component.html',
    styleUrls: ['./step-assert.component.scss']
})
export class StepAssertComponent implements OnInit {

    // allows to use AssertionStatus in template
    AssertionStatus = AssertionStatus;

    jsonEditorForAssertExpectedOptions: JsonEditorOptions;
    @ViewChild('jsonEditorForAssertExpected') jsonEditorForAssertExpected: JsonEditorComponent;

    jsonEditorForAssertResultOptions: JsonEditorOptions;
    @ViewChild('jsonEditorForAssertResult') jsonEditorForAssertResult: JsonEditorComponent;

    @Input() assertion: Assertion;

    constructor(private changeDetector: ChangeDetectorRef) {

    }

    ngOnInit() {
        this.jsonEditorForAssertExpectedOptions = new JsonEditorOptions();
        this.jsonEditorForAssertExpectedOptions.mode = 'code';
        this.jsonEditorForAssertExpectedOptions.modes = [ 'code', 'tree', 'text'];
        this.jsonEditorForAssertExpectedOptions.onChange = (() => {
          this.assertion.expected = this.jsonEditorForAssertExpected.getText();
        }).bind(this);

        this.jsonEditorForAssertResultOptions = new JsonEditorOptions();
        this.jsonEditorForAssertResultOptions.mode = 'code';
        this.jsonEditorForAssertResultOptions.modes = [ 'code', 'view', 'text'];
        this.jsonEditorForAssertResultOptions.onChange = (() => {
         // do nothing
        }).bind(this);

        this.changeDetector.detectChanges();
    }

    getAssertionStatusLabelStyle(status: AssertionStatus): Object {
        switch (status) {
            case AssertionStatus.Fail:
                return { color: 'red' };
            case AssertionStatus.Success:
                return { color: 'green' };
            case AssertionStatus.NotAsserted:
            default:
                return { color: 'black' };
        }
    }
}
