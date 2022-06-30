import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaLogComponent } from './tabla-log.component';

describe('TablaLogComponent', () => {
  let component: TablaLogComponent;
  let fixture: ComponentFixture<TablaLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
