/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TipoVeiculoService } from './tipo-veiculo.service';

describe('Service: TipoVeiculo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipoVeiculoService]
    });
  });

  it('should ...', inject([TipoVeiculoService], (service: TipoVeiculoService) => {
    expect(service).toBeTruthy();
  }));
});
