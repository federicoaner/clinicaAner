import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriaClinicaAdminComponent } from './historia-clinica-admin.component';

describe('HistoriaClinicaAdminComponent', () => {
  let component: HistoriaClinicaAdminComponent;
  let fixture: ComponentFixture<HistoriaClinicaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriaClinicaAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriaClinicaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
