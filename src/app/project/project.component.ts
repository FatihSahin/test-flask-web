import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TestFlaskApiService } from 'app/services/test-flask-api.service';
import { Scenario, InvocationMatch } from 'models/model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  projectKey: string;
  scenarios: Scenario[];

  // allows to use in template
  InvocationMatch = InvocationMatch;

  constructor(private api: TestFlaskApiService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.projectKey = params.get('projectKey');
      this.api.getScenariosFlat(this.projectKey).subscribe(data => this.scenarios = data);
    });
  }

  // Modified version of Thymine's solution on
  // https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
  getBackgroundColor(label: string): string {
    let hash = 0;
    if (label.length > 0) {
      for (let i = 0; i < label.length; i++) {
        hash = label.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash;
      }
    }
    const hue = Math.floor(Math.abs((Math.sin(hash) * 10000) % 1 * 16777216)) % 360;
    return 'hsl(' + hue + ',100%,75%)';
  }
}
