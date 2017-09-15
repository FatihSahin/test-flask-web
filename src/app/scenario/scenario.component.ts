import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TestFlaskApiService } from "app/services/test-flask-api.service";
import { Scenario } from "models/model";

@Component({
  selector: 'app-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.scss']
})
export class ScenarioComponent implements OnInit {

  scenarioNo: number;
  scenario: Scenario;
  
  constructor(private api: TestFlaskApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.scenarioNo = +params.get('scenarioNo');
      this.api.getScenarioFlat(this.scenarioNo).subscribe(scenario => { 
        scenario.steps = scenario.steps.reverse();
        this.scenario = scenario;
      });
    });
  }

}
