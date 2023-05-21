import { Component } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ProjectService} from "../../../services/project.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-project-create',
  templateUrl: './dashboard-project-create.component.html',
  styleUrls: ['./dashboard-project-create.component.scss']
})
export class DashboardProjectCreateComponent {


  constructor(private projectService: ProjectService, private router: Router) {
  }
  form = new FormBuilder()
    .group({
      name: new FormControl('', Validators.required),
      defaultTemplate: new FormControl('')
    })

  error: string = ""

  submit() {
    if(this.form.valid) {
      this.projectService.createProject(this.form.controls.name.value!, this.form.controls.defaultTemplate.value!).subscribe({
        next: () => {
          this.router.navigate(['/projects'])
        },
        error: (err) => {
          this.error = `An unknown error occurred (${err["error"]["statusCode"]})`
          console.log(err)
        }
      })
    } else {
      this.error = "Please fill all required fields"
    }

  }
}
