import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MontadoraComponent } from './montadora.component';

describe('MontadoraComponent', () => {
  let component: MontadoraComponent;
  let fixture: ComponentFixture<MontadoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MontadoraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MontadoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
