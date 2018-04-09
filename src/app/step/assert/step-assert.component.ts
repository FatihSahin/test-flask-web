import { Component, OnInit, Input, ViewChild, ChangeDetectorRef, SimpleChanges, OnChanges } from '@angular/core';
import { Assertion, AssertionStatus } from 'models/model';
import { JsonEditorComponent, JsonEditorOptions } from 'angular4-jsoneditor/jsoneditor/jsoneditor.component';
import { JsonViewerComponent } from 'app/shared/json-viewer.component';

@Component({
    selector: 'app-step-assert',
    templateUrl: './step-assert.component.html',
    styleUrls: ['./step-assert.component.scss']
})
export class StepAssertComponent implements OnChanges {

    // allows to use AssertionStatus in template
    AssertionStatus = AssertionStatus;

    jsonViewerForAssertExpected: JsonViewerComponent;
    jsonViewerForAssertResult: JsonViewerComponent;

    @ViewChild('jsonViewerForAssertExpected') set viewerExpected(viewer: JsonViewerComponent) {
        this.jsonViewerForAssertExpected = viewer;
    }

    @ViewChild('jsonViewerForAssertResult') set viewerResult(viewer: JsonViewerComponent) {
        this.jsonViewerForAssertResult = viewer;
    }

    @Input() assertion: Assertion;

    constructor(private changeDetector: ChangeDetectorRef) {
    }

    ngOnChanges(changes: SimpleChanges) {
        this.setExpected();
        this.setResult();
    }

    private setExpected() {
        if (this.jsonViewerForAssertExpected) {
            this.jsonViewerForAssertExpected.setData(this.assertion.expected);
        }
    }

    private setResult() {
        if (this.jsonViewerForAssertResult) {
            this.jsonViewerForAssertResult.setData(this.assertion.lastAssertionResult);
        }
    }

    onChangeResult(data: Object): void {
    }

    onChangeExpected(data: Object): void {
        this.assertion.expected = JSON.stringify(data);
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
