import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { StepService } from "app/step/step.service";
import { Invocation } from "models/model";
import { TestFlaskApiService } from "app/services/test-flask-api.service";

@Component({
  selector: 'app-invocation',
  templateUrl: './invocation.component.html',
  styleUrls: ['./invocation.component.scss']
})
export class InvocationComponent implements OnInit {

  invocationHashCode: string;
  invocation: Invocation;

  constructor(private api: TestFlaskApiService, private route: ActivatedRoute, private stepService: StepService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.invocationHashCode = params.get('hashCode');
      this.invocation = this.stepService.getInvocation(this.invocationHashCode);
    });
  }
}
