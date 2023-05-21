import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../../services/project.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-dashboard-project-keys-create',
  templateUrl: './dashboard-project-keys-create.component.html',
  styleUrls: ['./dashboard-project-keys-create.component.scss']
})
export class DashboardProjectKeysCreateComponent {
  project?: string
  createdKey?: string
  error?: string

  constructor(public route: ActivatedRoute, public projectService: ProjectService, public router: Router) {
    route.params.subscribe({
      next: value => this.project = value["id"]
    })
  }

  form = new FormBuilder().group({
    label: new FormControl(''),
    licensedTo: new FormControl('', Validators.required),
    expires: new FormControl(new Date(), Validators.required)
  })

  submit() {
    if(this.form.valid) {
      this.projectService.createKey(this.project!, this.form.controls.licensedTo.value!, this.form.controls.expires.value!, this.form.controls.label.value)
        .subscribe({
          next: value => {
            this.createdKey = value["key"]
          },
          error: err => {
            this.error = `An error occurred ${err["error"]["statusCode"]} (${err["error"]["message"]})`
          }
        })
    }
  }
}
