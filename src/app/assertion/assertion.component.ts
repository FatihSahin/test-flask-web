import { Component, OnInit } from '@angular/core';
import { AssertionService } from "app/assertion/assertion.service";
import { Step, Invocation, Assertion, AssertionStatus } from "models/model";

@Component({
  selector: 'app-assertion',
  templateUrl: './assertion.component.html',
  styleUrls: ['./assertion.component.scss']
})
export class AssertionComponent implements OnInit {

  // allows to use AssertionStatus in template
  AssertionStatus = AssertionStatus;

  constructor(public assertionService: AssertionService) { }

  ngOnInit() {

  }

}
