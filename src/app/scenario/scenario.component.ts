import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TestFlaskApiService } from 'app/services/test-flask-api.service';
import { Scenario } from 'models/model';
import { AssertionService } from 'app/assertion/assertion.service';
import { NotificationsService } from 'angular2-notifications';
import { Observable } from 'rxjs/Observable';
import { ScenarioService } from 'app/scenario/scenario.service';

@Component({
  selector: 'app-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.scss']
})
export class ScenarioComponent implements OnInit {

  scenarioNo: number;
  scenario: Scenario;
  getLabels = ((): Observable<string[]> => {
    return this.api.getLabels(this.scenario.projectKey);
  }).bind(this);

  constructor(private api: TestFlaskApiService, private assertionService: AssertionService, private scenarioService: ScenarioService,
    private router: Router, private route: ActivatedRoute, private notify: NotificationsService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.scenarioNo = +params.get('scenarioNo');
      this.scenarioService.scenarioSource$.subscribe(sce => this.scenario = sce);
      this.scenarioService.provideScenario(this.scenarioNo);
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

  deleteScenario() {
    const canDelete: boolean = window.confirm('Do you really want to delete this scenario?');
    if (canDelete) {
      this.api.deleteScenario(this.scenarioNo).subscribe(ok => {
        if (ok) {
          this.router.navigateByUrl('/project/' + this.scenario.projectKey);
          this.notify.success(
            'Scenario #' + this.scenario.scenarioNo,
            'Scenario deleted!',
            {
              showProgressBar: false,
              timeOut: 1500,
              clickToClose: true,
            }
          );
        }
      });
    }
  }

  deleteStep(stepNo: number) {
    const canDelete: boolean = window.confirm('Do you really want to delete this step?');
    if (canDelete) {
      this.api.deleteStep(stepNo).subscribe(ok => {
        this.scenarioService.provideScenario(this.scenarioNo);
        this.router.navigate(['project', this.scenario.projectKey, 'scenario', this.scenario.scenarioNo]);
        this.notify.success(
          'Step #' + stepNo,
          'Step deleted!',
          {
            showProgressBar: false,
            timeOut: 1500,
            clickToClose: true,
          }
        );
      });
    }
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
