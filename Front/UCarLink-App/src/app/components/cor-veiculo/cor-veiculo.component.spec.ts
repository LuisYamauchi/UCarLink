import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorVeiculoComponent } from './cor-veiculo.component';

describe('CorVeiculoComponent', () => {
  let component: CorVeiculoComponent;
  let fixture: ComponentFixture<CorVeiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorVeiculoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorVeiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
