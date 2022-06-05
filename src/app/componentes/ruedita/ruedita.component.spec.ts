import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RueditaComponent } from './ruedita.component';

describe('RueditaComponent', () => {
  let component: RueditaComponent;
  let fixture: ComponentFixture<RueditaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RueditaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RueditaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
