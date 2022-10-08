import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntencaoComponent } from './intencao.component';

describe('IntencaoComponent', () => {
  let component: IntencaoComponent;
  let fixture: ComponentFixture<IntencaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntencaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntencaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
