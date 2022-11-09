import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TipoPortaDetalheComponent } from './tipo-porta-detalhe.component';

describe('TipoPortaDetalheComponent', () => {
  let component: TipoPortaDetalheComponent;
  let fixture: ComponentFixture<TipoPortaDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TipoPortaDetalheComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoPortaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
