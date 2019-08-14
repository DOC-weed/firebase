import { TestBed } from '@angular/core/testing';

import { MetodosService } from './metodos.service';

describe('MetodosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MetodosService = TestBed.get(MetodosService);
    expect(service).toBeTruthy();
  });
});
