/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CombustivelService } from './combustivel.service';

describe('Service: Combustivel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CombustivelService]
    });
  });

  it('should ...', inject([CombustivelService], (service: CombustivelService) => {
    expect(service).toBeTruthy();
  }));
});
