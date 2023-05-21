import {Component} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router) {
  }

  form = new FormBuilder()
    .group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })

  err: boolean = false

  async submit() {
    if (!this.form.valid) return;

    this.authService.login(this.form.controls.username.value!, this.form.controls.password.value!).then((v) => {
      if(v) {
        this.router.navigate(['/'])
      } else {
        this.err =true
      }
    })
  }
}
