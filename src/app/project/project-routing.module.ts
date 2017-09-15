import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';

import { ProjectComponent } from './project.component';
import { ScenarioComponent } from 'app/scenario/scenario.component';
import { ScenarioCreateComponent } from 'app/scenario/create/scenario-create.component';
import { StepComponent } from "app/step/step.component";
import { InvocationComponent } from "app/invocation/invocation.component";

const routes: Routes = [
  {
    path: ':projectKey/scenario/:scenarioNo',
    component: ScenarioComponent,
    data: {
      crumbs: [':projectKey', ':scenarioNo']
    },
    children: [
      {
        path: 'step/:stepNo',
        component: StepComponent,
        data: {
          crumbs: [':stepNo']
        },
        children: [
          {
            path: 'invocation/:hashCode',
            component: InvocationComponent,
            data: {
              crumbs: [':hashCode']
            }
          }
        ]
      }
    ]
  },
  {
    path: ':projectKey',
    component: ProjectComponent,
    data: {
      crumbs: [':projectKey']
    }
  },
  {
    path: ':projectKey/createScenario',
    component: ScenarioCreateComponent,
    data: {
      crumbs: [':projectKey', 'CreateScenario']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
