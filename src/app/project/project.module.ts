import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProjectComponent } from './project.component';
import { ProjectRoutingModule } from './project-routing.module';

import { CommonComponentsModule } from 'app/shared/common-components.module';
import { ScenarioComponent } from 'app/scenario/scenario.component';
import { ScenarioCreateComponent } from 'app/scenario/create/scenario-create.component';
import { StepComponent } from 'app/step/step.component';
import { StepAssertComponent } from 'app/step/assert/step-assert.component';
import { TreeModule } from 'angular-tree-component';
import { InvocationComponent } from 'app/invocation/invocation.component';
import { StepService } from 'app/step/step.service';

import { JsonPrettifyPipe, JsonParserPipe } from 'app/invocation/json-transform.pipe';
import { SimplifySignaturePipe } from 'app/invocation/simplify-signature.pipe';
import { ProjectCreateComponent } from 'app/project/create/project-create.component';

import { Ng4JsonEditorModule } from 'angular4-jsoneditor';
import { RouteReuseStrategy } from '@angular/router';

@NgModule({
  imports: [
    ProjectRoutingModule,
    CommonModule,
    FormsModule,
    TreeModule,
    CommonComponentsModule,
    Ng4JsonEditorModule,
    ModalModule.forRoot()
  ],
  declarations: [
    ProjectComponent,
    ScenarioComponent,
    ScenarioCreateComponent,
    StepComponent,
    StepAssertComponent,
    InvocationComponent,
    JsonPrettifyPipe,
    JsonParserPipe,
    SimplifySignaturePipe,
    ProjectCreateComponent
  ],
  providers: [
    StepService
  ]
})
export class ProjectModule { }
