import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LojaDetalheComponent } from './loja-detalhe.component';

describe('LojaDetalheComponent', () => {
  let component: LojaDetalheComponent;
  let fixture: ComponentFixture<LojaDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LojaDetalheComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LojaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
