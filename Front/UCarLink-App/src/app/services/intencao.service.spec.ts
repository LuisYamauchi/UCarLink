/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IntencaoService } from './intencao.service';

describe('Service: Intencao', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IntencaoService]
    });
  });

  it('should ...', inject([IntencaoService], (service: IntencaoService) => {
    expect(service).toBeTruthy();
  }));
});
