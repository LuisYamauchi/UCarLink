import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntencaoDetalheComponent } from './intencao-detalhe.component';

describe('IntencaoDetalheComponent', () => {
  let component: IntencaoDetalheComponent;
  let fixture: ComponentFixture<IntencaoDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntencaoDetalheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntencaoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
