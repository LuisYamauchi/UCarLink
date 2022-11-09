import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CombustivelDetalheComponent } from './combustivel-detalhe.component';

describe('CombustivelDetalheComponent', () => {
  let component: CombustivelDetalheComponent;
  let fixture: ComponentFixture<CombustivelDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CombustivelDetalheComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CombustivelDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
