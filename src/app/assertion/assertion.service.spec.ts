import { TestBed, inject } from '@angular/core/testing';

import { AssertionService } from './assertion.service';

describe('AssertionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssertionService]
    });
  });

  it('should be created', inject([AssertionService], (service: AssertionService) => {
    expect(service).toBeTruthy();
  }));
});
