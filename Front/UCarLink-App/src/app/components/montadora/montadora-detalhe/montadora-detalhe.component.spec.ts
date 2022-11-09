import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MontadoraDetalheComponent } from './montadora-detalhe.component';

describe('MontadoraDetalheComponent', () => {
  let component: MontadoraDetalheComponent;
  let fixture: ComponentFixture<MontadoraDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MontadoraDetalheComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MontadoraDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
