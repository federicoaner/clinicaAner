import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisTurnosAdminComponent } from './mis-turnos-admin.component';

describe('MisTurnosAdminComponent', () => {
  let component: MisTurnosAdminComponent;
  let fixture: ComponentFixture<MisTurnosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisTurnosAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisTurnosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
