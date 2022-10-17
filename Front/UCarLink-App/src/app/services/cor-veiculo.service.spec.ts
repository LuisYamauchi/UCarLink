/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CorVeiculoService } from './cor-veiculo.service';

describe('Service: CorVeiculo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CorVeiculoService]
    });
  });

  it('should ...', inject([CorVeiculoService], (service: CorVeiculoService) => {
    expect(service).toBeTruthy();
  }));
});
