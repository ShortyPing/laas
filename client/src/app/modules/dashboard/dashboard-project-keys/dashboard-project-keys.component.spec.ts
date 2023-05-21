import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProjectKeysComponent } from './dashboard-project-keys.component';

describe('DashboardProjectKeysComponent', () => {
  let component: DashboardProjectKeysComponent;
  let fixture: ComponentFixture<DashboardProjectKeysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardProjectKeysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardProjectKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
