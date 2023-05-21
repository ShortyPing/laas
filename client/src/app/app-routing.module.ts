import {inject, NgModule} from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {AuthService} from "./services/auth.service";

const routes: Routes = [
  {
    path: "auth",
    loadChildren: async () => (await import("./modules/auth/auth.module")).AuthModule
  },
  {
    path: "",
    loadChildren: async () => (await import("./modules/dashboard/dashboard.module")).DashboardModule,
    canActivate: [async () => {
      const authService = inject(AuthService)
      const router = inject(Router)
      if(!authService.authenticated.getValue())
        await authService.updateAuthentication()

      if(authService.authenticated.getValue())
        return true
      else {
        router.navigate(["/auth/login"], {skipLocationChange: true})
        return false
      }
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
