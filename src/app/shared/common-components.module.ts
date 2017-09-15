import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AssertResultComponent } from 'app/assert-result/assert-result.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    AssertResultComponent
  ],
  exports: [
    AssertResultComponent
  ],
  providers: [

  ]
})
export class CommonComponentsModule { }