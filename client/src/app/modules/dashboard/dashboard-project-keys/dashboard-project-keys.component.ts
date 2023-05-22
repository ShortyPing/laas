import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {ProjectService} from "../../../services/project.service";
import {Project} from "../../../dto/project.dto";
import {Key} from "../../../dto/key.dto";
import {environment} from "../../../../environments/environment";
@Component({
  selector: 'app-dashboard-project-keys',
  templateUrl: './dashboard-project-keys.component.html',
  styleUrls: ['./dashboard-project-keys.component.scss']
})
export class DashboardProjectKeysComponent implements OnInit {

  project!: string
  error: string = ""
  projectObj?: Project
  keys: Key[] = []
  constructor(public route: ActivatedRoute, public projectService: ProjectService, public router: Router) {
    route.params.subscribe({
      next: value => this.project = value["id"]
    })
  }

  environment = environment

  ngOnInit(): void {
    this.projectService.getProject(this.project).subscribe({
      next: value => {
        this.projectObj = value


        this.projectService.getKeys(this.project).subscribe({
          next: v => this.keys = v
        })
      },
      error: err => {
        this.error = `An error occurred ${err["error"]["statusCode"]} (${err["error"]["message"]})`
      }
    })


  }

  enableDisableKey(key: string, status: boolean) {

    this.projectService.enableDisableKey(this.project, key, status).subscribe({
      next: () => this.ngOnInit()
    })
  }

  checkKeyValidity(key: Key): "VALID" | "EXPIRED" | "DISABLED" {
    if(!key.activated) return "DISABLED"
    if(new Date(key.expires).getTime() < new Date().getTime()) return "EXPIRED"
    return "VALID"
  }

}
