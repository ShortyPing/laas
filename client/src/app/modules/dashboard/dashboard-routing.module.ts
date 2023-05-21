import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {DashboardHomeComponent} from "./dashboard-home/dashboard-home.component";
import {DashboardProjectsComponent} from "./dashboard-projects/dashboard-projects.component";
import {DashboardProjectCreateComponent} from "./dashboard-project-create/dashboard-project-create.component";
import {DashboardProjectKeysComponent} from "./dashboard-project-keys/dashboard-project-keys.component";
import {
  DashboardProjectKeysCreateComponent
} from "./dashboard-project-keys-create/dashboard-project-keys-create.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "",
        component: DashboardHomeComponent
      },
      {
        path: "projects",
        component: DashboardProjectsComponent
      },
      {
        path: "projects/create",
        component: DashboardProjectCreateComponent
      },
      {
        path: "projects/:id/keys",
        component: DashboardProjectKeysComponent
      },
      {
        path: "projects/:id/keys/create",
        component: DashboardProjectKeysCreateComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
