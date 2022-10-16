import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntencaoListaComponent } from './intencao-lista.component';

describe('IntencaoListaComponent', () => {
  let component: IntencaoListaComponent;
  let fixture: ComponentFixture<IntencaoListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntencaoListaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntencaoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
