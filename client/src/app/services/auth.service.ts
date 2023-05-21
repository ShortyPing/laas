import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);
  authenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  self: BehaviorSubject<{ username: string } | undefined> = new BehaviorSubject<{username: string} | undefined>(undefined);

  constructor(private http: HttpClient, private router: Router) {
    this.token.next(localStorage.getItem("token") || undefined)
    this.updateAuthentication()
  }

  async updateAuthentication() {
    return new Promise((resolve, reject) => {
      console.log(this.token.getValue())
      this.http.get<any>(`${environment.backendUrl}/user/self`, {
        headers: new HttpHeaders()
          .set("Content-Type", "application/json")
          .set("Authorization", `Bearer ${this.token.getValue()}`)
      }).subscribe({
        next: dat => {
          this.self.next({
            username: dat["username"]
          })
        },
        complete: () => {
          this.authenticated.next(true)
          console.log("Successfully authenticated")

          resolve(1)
        },
        error: () => {
          this.authenticated.next(false)
          resolve(0)
        }
      })
    })
  }

  logout() {
    localStorage.removeItem("token")
    this.authenticated.next(false)
    this.self.next(undefined)
    this.token.next(undefined)

    this.router.navigate(['/auth/login'])

  }
  async login(username: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.http.post<any>(`${environment.backendUrl}/user/login`, {
        username,
        password
      }, {
        headers: new HttpHeaders()
          .set("Content-Type", "application/json")
      }).subscribe({
        next: value => {
          this.token.next(value["token"])
          localStorage.setItem("token", value["token"])
          this.updateAuthentication()
          resolve(true)
        },
        error: err => {
          resolve(false)
        }
      })
    })

  }



}
