import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModeloDetalheComponent } from './modelo-detalhe.component';

describe('ModeloDetalheComponent', () => {
  let component: ModeloDetalheComponent;
  let fixture: ComponentFixture<ModeloDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModeloDetalheComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeloDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
