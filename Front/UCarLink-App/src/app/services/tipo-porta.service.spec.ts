/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TipoPortaService } from './tipo-porta.service';

describe('Service: TipoPorta', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipoPortaService]
    });
  });

  it('should ...', inject([TipoPortaService], (service: TipoPortaService) => {
    expect(service).toBeTruthy();
  }));
});
