import { Component, OnInit } from '@angular/core';
import { Scenario } from 'models/model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TestFlaskApiService } from 'app/services/test-flask-api.service';
import { NotificationsService } from 'angular2-notifications';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-scenario-create',
  templateUrl: './scenario-create.component.html',
  styleUrls: ['./scenario-create.component.scss']
})
export class ScenarioCreateComponent implements OnInit {

  scenario: Scenario;
  getLabels = ((): Observable<string[]> => {
    return this.api.getLabels(this.scenario.projectKey);
  }).bind(this);

  constructor(private api: TestFlaskApiService, private route: ActivatedRoute, private router: Router,
    private notify: NotificationsService) {
    this.scenario = new Scenario();
    this.scenario.steps = [];
    this.scenario.labels = [];
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.scenario.projectKey = params.get('projectKey');
    });
  }

  createScenario(): void {
    this.api.insertScenario(this.scenario).subscribe(sce => {
      this.scenario = sce;
      this.notify.success(
        'Scenario #' + this.scenario.scenarioNo,
        'Successfully saved!',
        {
          showProgressBar: false,
          timeOut: 1500,
          clickToClose: true,
        }
      );
      setTimeout(() => {
        this.router.navigate(['project', this.scenario.projectKey]);
      }, 750);
    });
  }
}
