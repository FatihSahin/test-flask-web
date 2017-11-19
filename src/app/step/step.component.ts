import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TestFlaskApiService } from 'app/services/test-flask-api.service';
import { Step, Invocation, Assertion, AssertionStatus } from 'models/model';
import { ITreeOptions } from 'angular-tree-component/dist/defs/api';
import { StepService } from 'app/step/step.service';
import { NotificationsService } from 'angular2-notifications';
import { AssertionService } from 'app/assertion/assertion.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {
  // props
  stepNo: number;
  step: Step;
  rootInvocation: Invocation;
  assertion: Assertion;
  tree: Array<any> = [];
  treeOptions: ITreeOptions;

  constructor(private api: TestFlaskApiService, private route: ActivatedRoute,
    private stepService: StepService, private notify: NotificationsService, private assertionService: AssertionService) {
  }

  loadInvocationTree(invocations: Invocation[]) {

    this.tree = [];

    const mappedInvocations: any = {};
    let currentInvocation: Invocation;
    let mappedElem: any;

    // First map the nodes of the array to an object -> create a hash table.
    for (let i = 0, len = invocations.length; i < len; i++) {
      currentInvocation = invocations[i];
      mappedInvocations[currentInvocation.instanceHashCode] = {
        id: currentInvocation.instanceHashCode,
        invocation: currentInvocation,
        name: this.stepService.simplifyName(currentInvocation.invocationSignature),
        isExpanded: true,
        children: []
      };
    }

    // create tree
    for (const instanceHashCode in mappedInvocations) {
      if (mappedInvocations.hasOwnProperty(instanceHashCode)) {
        mappedElem = mappedInvocations[instanceHashCode];
        // If the element is not at the root level, add it to its parent array of children.
        if (mappedElem.invocation.parentInstanceHashCode) {
          mappedInvocations[mappedElem.invocation.parentInstanceHashCode].children.push(mappedElem);
        }
        // If the element is at the root level, push it into root nodes array
        else {
          this.tree.push(mappedElem);
        }
      }
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.stepNo = +params.get('stepNo');
      this.loadStep();
    });
  }

  private loadStep() {
    this.api.getStep(this.stepNo).subscribe(data => {

      // this can be refactored (both service and component has step property, seems awkward)
      this.step = data;
      this.stepService.step = this.step;

      // load invocations
      this.loadInvocationTree(this.step.invocations);
      if (this.step.invocations) {
        this.rootInvocation = this.step.invocations.find(inv => inv.depth === 1);
      }

      // load assertion
      this.assertionService.getByStep(this.stepNo).subscribe(assertion => {
        if (assertion) {
          this.assertion = assertion;
        }
        else {
          // create a dummy assertion
          this.assertion = this.assertionService.createDummyAssertion(this.step);
        }
      });
    });
  }

  saveStep() {
    this.api.updateStep(this.step).subscribe(step => {
      // also put assertion if any expected expression is saved
      if (this.assertion && this.assertion.expected) {
        this.api.putAssertion(this.assertion).subscribe((ass) => {
          this.notifyStepSave(step);
        })
      }
      else { // directly notify
        this.notifyStepSave(step);
      }
    });
  }

  private notifyStepSave(step: Step): void {
    this.notify.success(
      'Step #' + step.stepNo,
      'Successfully saved!',
      {
        showProgressBar: false,
        timeOut: 1500,
        clickToClose: true,
      }
    );
  }

  revertStep() {
    window.location.reload();
  }

  assertStep() {
    this.assertionService.assertAndShowStep(this.step, this.assertion);
  }

  playStep() {
    alert('Not implemented');
  }

  callStep() {
    alert('Not implemented');
  }
}
