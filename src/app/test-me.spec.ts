import { TestBed } from '@angular/core/testing';
import { TestMe } from './test-me';

describe('TestMe', () => {
  let service: TestMe;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestMe);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
