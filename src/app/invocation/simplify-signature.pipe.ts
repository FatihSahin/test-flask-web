import { Pipe, PipeTransform } from '@angular/core';
import { StepService } from 'app/step/step.service';

@Pipe({ name: 'simplifySignature' })
export class SimplifySignaturePipe implements PipeTransform {

    constructor(private stepService: StepService) { }

    transform(value: string): string {
        return this.stepService.simplifyName(value);
    }
}
