import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoPortaComponent } from './tipo-porta.component';

describe('TipoPortaComponent', () => {
  let component: TipoPortaComponent;
  let fixture: ComponentFixture<TipoPortaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoPortaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoPortaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
