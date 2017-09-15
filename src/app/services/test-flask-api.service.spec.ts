import { TestBed, inject } from '@angular/core/testing';

import { TestFlaskApiService } from './test-flask-api.service';

describe('TestFlaskApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestFlaskApiService]
    });
  });

  it('should be created', inject([TestFlaskApiService], (service: TestFlaskApiService) => {
    expect(service).toBeTruthy();
  }));
});
