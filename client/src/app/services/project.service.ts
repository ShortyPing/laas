import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {environment} from "../../environments/environment";
import {Project} from "../dto/project.dto";
import {Key} from "../dto/key.dto";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getSelfProjects() {
    return this.http.get<Project[]>(`${environment.backendUrl}/user/self/project`, {
      headers: new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${this.authService.token.getValue()}`)
    })
  }

  createProject(name: string, defaultTemplate: string) {
    return this.http.post(`${environment.backendUrl}/project`, {
      name,
      defaultTemplate
    }, {
      headers: new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${this.authService.token.getValue()}`)
    })
  }

  getProject(id: string) {
    return this.http.get<Project>(`${environment.backendUrl}/project/${id}`, {
      headers: new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${this.authService.token.getValue()}`)
    })
  }

  getKeys(id: string) {
    return this.http.get<Key[]>(`${environment.backendUrl}/project/${id}/key`, {
      headers: new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${this.authService.token.getValue()}`)
    })
  }

  createKey(project: string, licensedTo: string, expires: Date, label: string | null) {
    return this.http.post<any>(`${environment.backendUrl}/project/${project}/key`, {
      licensedTo,
      expires: new Date(expires).toISOString(),
      label
    }, {
      headers: new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${this.authService.token.getValue()}`)
    })
  }

  enableDisableKey(project: string, key: string, status: boolean) {
    return this.http.patch(`${environment.backendUrl}/project/${project}/key/enabled`, {
      status: status,
      key: key
    }, {
      headers: new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${this.authService.token.getValue()}`)
    })
  }

}
