import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProjectKeysCreateComponent } from './dashboard-project-keys-create.component';

describe('DashboardProjectKeysCreateComponent', () => {
  let component: DashboardProjectKeysCreateComponent;
  let fixture: ComponentFixture<DashboardProjectKeysCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardProjectKeysCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardProjectKeysCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
