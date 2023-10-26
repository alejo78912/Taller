import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarReservaComponent } from './editar-reservas.component';

describe('EditarReservasComponent', () => {
  let component: EditarReservaComponent;
  let fixture: ComponentFixture<EditarReservaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarReservaComponent]
    });
    fixture = TestBed.createComponent(EditarReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
