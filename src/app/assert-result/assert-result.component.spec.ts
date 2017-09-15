import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssertResultComponent } from './assert-result.component';

describe('AssertResultComponent', () => {
  let component: AssertResultComponent;
  let fixture: ComponentFixture<AssertResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssertResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssertResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
