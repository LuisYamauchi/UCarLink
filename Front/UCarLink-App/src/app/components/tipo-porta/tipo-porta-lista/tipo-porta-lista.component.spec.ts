import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombustivelListaComponent } from './combustivel-lista.component';

describe('CombustivelListaComponent', () => {
  let component: CombustivelListaComponent;
  let fixture: ComponentFixture<CombustivelListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CombustivelListaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombustivelListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
