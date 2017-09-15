import { Injectable } from '@angular/core';
import { Step, Invocation } from "models/model";

@Injectable()
export class StepService {

  step: Step;

  constructor() { }

  getInvocation(hashCode: string): Invocation {
    return this.step.invocations.find(s => s.instanceHashCode === hashCode);
  }

  simplifyName(signature: string): string {
    let expression = /::(\w+)\(/;
    let match = expression.exec(signature);
    return match[1];
  }
}
