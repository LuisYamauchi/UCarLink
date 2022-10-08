import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoVeiculoComponent } from './tipo-veiculo.component';

describe('TipoVeiculoComponent', () => {
  let component: TipoVeiculoComponent;
  let fixture: ComponentFixture<TipoVeiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoVeiculoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoVeiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
