import { Component, OnInit, Input, ViewChild, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { JsonEditorOptions, JsonEditorComponent } from 'angular4-jsoneditor/jsoneditor/jsoneditor.component';

@Component({
    selector: 'json-viewer',
    template: '<json-editor #jsonEditor></json-editor>'
})
export class JsonViewerComponent implements OnInit {

    @ViewChild('jsonEditor') jsonEditor: JsonEditorComponent;

    @Output()
    change: EventEmitter<Object> = new EventEmitter<Object>();

    constructor(private changeDetector: ChangeDetectorRef) { }

    setData(value: string) {
        try {
            const obj = JSON.parse(value ? value : '{}');
            this.jsonEditor.set(obj);
        } catch (error) {
        }
    }

    ngOnInit() {
        this.jsonEditor.options = new JsonEditorOptions();
        this.jsonEditor.options.mode = 'code';
        this.jsonEditor.options.modes = ['code', 'tree', 'text'];
        // tree mode has a bug when searched and invocation is changed (weird obj appears with isTrusted prop WTF!)
        this.jsonEditor.options.search = false;
        this.jsonEditor.options.onChange = (() => {
            this.change.emit(this.jsonEditor.get());
        }).bind(this);
    }
}
