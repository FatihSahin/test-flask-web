import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TestFlaskApiService } from "app/services/test-flask-api.service";
import { Scenario } from "models/model";
import { AssertionService } from 'app/assertion/assertion.service';

@Component({
  selector: 'app-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.scss']
})
export class ScenarioComponent implements OnInit {

  scenarioNo: number;
  scenario: Scenario;
  
  constructor(private api: TestFlaskApiService, private assertionService: AssertionService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.scenarioNo = +params.get('scenarioNo');
      this.api.getScenarioFlat(this.scenarioNo).subscribe(scenario => { 
        scenario.steps = scenario.steps.reverse();
        this.scenario = scenario;
      });
    });
  }

  recordScenario() {
    alert("Not implemented");
  }

  callScenario() {
    alert("Not implemented");
  }

  playScenario() {
    alert("Not implemented");
  }

  assertScenario() {
    this.assertionService.assertAndShowScenario(this.scenario);
  }

  cloneScenario() {
    alert("Not implemented");
  }

  saveScenario() {
    alert("Not implemented");
  }

}
