import { TestBed } from '@angular/core/testing';

import { NoteEvaluationService } from './note-evaluation.service';

describe('NoteEvaluationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NoteEvaluationService = TestBed.get(NoteEvaluationService);
    expect(service).toBeTruthy();
  });
});
