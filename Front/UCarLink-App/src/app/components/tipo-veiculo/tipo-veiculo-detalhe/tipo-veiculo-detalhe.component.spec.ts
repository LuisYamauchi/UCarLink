import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TipoVeiculoDetalheComponent } from './tipo-veiculo-detalhe.component';

describe('TipoVeiculoDetalheComponent', () => {
  let component: TipoVeiculoDetalheComponent;
  let fixture: ComponentFixture<TipoVeiculoDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TipoVeiculoDetalheComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoVeiculoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
