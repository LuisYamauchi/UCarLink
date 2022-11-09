import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LojaListaComponent } from './loja-lista.component';

describe('LojaListaComponent', () => {
  let component: LojaListaComponent;
  let fixture: ComponentFixture<LojaListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LojaListaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LojaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
