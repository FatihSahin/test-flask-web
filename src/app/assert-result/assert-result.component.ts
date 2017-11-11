import { Component, OnInit, Input } from '@angular/core';
import { AssertionStatus } from 'models/model';

@Component({
  selector: 'assert-result',
  templateUrl: './assert-result.component.html',
  styleUrls: ['./assert-result.component.scss']
})
export class AssertResultComponent implements OnInit {

  @Input() status: AssertionStatus;

  constructor() { }

  ngOnInit() {
  }

}
