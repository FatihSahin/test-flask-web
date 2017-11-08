import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TestFlaskApiService } from "app/services/test-flask-api.service";
import { Scenario } from "models/model";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  projectKey: string;
  scenarios: Scenario[];

  constructor(private api: TestFlaskApiService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.projectKey = params.get('projectKey');
      this.api.getScenariosFlat(this.projectKey).subscribe(data => this.scenarios = data);
    });
  }

}
