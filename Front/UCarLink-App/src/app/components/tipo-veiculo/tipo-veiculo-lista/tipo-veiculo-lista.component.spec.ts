import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoVeiculoListaComponent } from './tipo-veiculo-lista.component';

describe('TipoVeiculoListaComponent', () => {
  let component: TipoVeiculoListaComponent;
  let fixture: ComponentFixture<TipoVeiculoListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoVeiculoListaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoVeiculoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
