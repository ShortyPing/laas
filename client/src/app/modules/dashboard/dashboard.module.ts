import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardProjectsComponent } from './dashboard-projects/dashboard-projects.component';
import { DashboardProjectCreateComponent } from './dashboard-project-create/dashboard-project-create.component';
import {ReactiveFormsModule} from "@angular/forms";
import { DashboardProjectKeysComponent } from './dashboard-project-keys/dashboard-project-keys.component';
import { DashboardProjectKeysCreateComponent } from './dashboard-project-keys-create/dashboard-project-keys-create.component';


@NgModule({
  declarations: [
    DashboardComponent,
    DashboardHomeComponent,
    DashboardProjectsComponent,
    DashboardProjectCreateComponent,
    DashboardProjectKeysComponent,
    DashboardProjectKeysCreateComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
