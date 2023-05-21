import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../../services/project.service";
import {Project} from "../../../dto/project.dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-projects',
  templateUrl: './dashboard-projects.component.html',
  styleUrls: ['./dashboard-projects.component.scss']
})
export class DashboardProjectsComponent implements OnInit{


  projects: Project[] = []
  loaded: boolean =false

  constructor(public projectService: ProjectService, public router: Router) {

  }

  ngOnInit(): void {
    this.projectService.getSelfProjects().subscribe({
      next: value => {
        this.projects = value,
          this.loaded = true
      }
    })
  }


}
