import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProjectCreateComponent } from './dashboard-project-create.component';

describe('DashboardProjectCreateComponent', () => {
  let component: DashboardProjectCreateComponent;
  let fixture: ComponentFixture<DashboardProjectCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardProjectCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardProjectCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
