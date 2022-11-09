import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MontadoraListaComponent } from './montadora-lista.component';

describe('MontadoraListaComponent', () => {
  let component: MontadoraListaComponent;
  let fixture: ComponentFixture<MontadoraListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MontadoraListaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MontadoraListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
