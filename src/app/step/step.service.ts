import { Injectable } from '@angular/core';
import { Step, Invocation } from 'models/model';

@Injectable()
export class StepService {

  step: Step;

  constructor() { }

  getInvocation(hashCode: string): Invocation {
    return this.step.invocations.find(s => s.instanceHashCode === hashCode);
  }

  simplifyName(signature: string): string {
    const expression = /::(\w+)\(/;
    const match = expression.exec(signature);
    return match[1];
  }
}
