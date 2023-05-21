import { Component } from '@angular/core';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent {

  constructor(public authService: AuthService) {
  }

}
