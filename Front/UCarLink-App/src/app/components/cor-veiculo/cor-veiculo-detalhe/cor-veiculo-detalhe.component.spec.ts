import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CorVeiculoDetalheComponent } from './cor-veiculo-detalhe.component';

describe('CorVeiculoDetalheComponent', () => {
  let component: CorVeiculoDetalheComponent;
  let fixture: ComponentFixture<CorVeiculoDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CorVeiculoDetalheComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorVeiculoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
