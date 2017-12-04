import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TestFlaskApiService } from 'app/services/test-flask-api.service';
import { Scenario } from 'models/model';
import { AssertionService } from 'app/assertion/assertion.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.scss']
})
export class ScenarioComponent implements OnInit {

  scenarioNo: number;
  scenario: Scenario;

  constructor(private api: TestFlaskApiService, private assertionService: AssertionService, private router: Router,
    private route: ActivatedRoute, private notify: NotificationsService) { }

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
    alert('Not implemented');
  }

  callScenario() {
    alert('Not implemented');
  }

  playScenario() {
    alert('Not implemented');
  }

  assertScenario() {
    this.assertionService.assertAndShowScenario(this.scenario);
  }

  cloneScenario() {
    this.api.cloneScenario(this.scenario.scenarioNo).subscribe(sc => {
      this.router.navigate(['project', sc.projectKey, 'scenario', sc.scenarioNo]);
      this.notify.success(
        'Scenario #' + sc.scenarioNo,
        'Successfully cloned!',
        {
          showProgressBar: false,
          timeOut: 1500,
          clickToClose: true,
        }
      );
    });
  }

  saveScenario() {
    this.api.updateScenario(this.scenario).subscribe(sc => {
      this.scenario = sc;
      this.notify.success(
        'Scenario #' + this.scenario.scenarioNo,
        'Successfully updated!',
        {
          showProgressBar: false,
          timeOut: 1500,
          clickToClose: true,
        }
      );
    });
  }
}
