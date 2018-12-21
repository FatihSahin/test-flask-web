import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Scenario } from 'models/model';
import { TestFlaskApiService } from 'app/services/test-flask-api.service';

@Injectable()
export class ScenarioService {
    // https://angular.io/guide/component-interaction#!#bidirectional-service
    // Observable scenario source
    private scenarioSource = new Subject<Scenario>();

    // Observable scenario stream
    scenarioSource$ = this.scenarioSource.asObservable();

    constructor(private api: TestFlaskApiService) {}

    provideScenario(scenarioNo: number) {
        this.api.getScenarioFlat(scenarioNo).subscribe(scenario => {
            scenario.steps = scenario.steps.reverse();
            this.scenarioSource.next(scenario);
        });
    }
}
