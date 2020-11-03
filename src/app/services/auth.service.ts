import { ApiService } from "../services/api.service";
import { Injectable } from "@angular/core";
import { User } from "../models/user.models";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  url = environment.authUrl;
  helper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {}

  Register(user: User): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.post(`${this.url}/auth/register`, params, {
      headers: headers,
    });
  }

  Login(user: User): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.post(`${this.url}/auth/login`, params, {
      headers: headers,
    });
  }

  ConfirmAccount(url): Observable<any> {
    let params = JSON.stringify(url);
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.post(`${this.url}/auth/confirm-account`, params, {
      headers: headers,
    });
  }

  IsAuhtenticated(): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json").set('Authorization', `Bearer ${this.GetToken()}`);;
    return this.http.get(`${this.url}/auth/authenticated`, {headers});
  }

  Logout() {
    localStorage.removeItem("LemonToken");
    this.router.navigate(["auth/login"]);
  }

  GetToken() {
    return localStorage.getItem("LemonToken");
  }

  LoggedIn() {
    const lemonToken = localStorage.getItem("LemonToken");
    return !!lemonToken && !this.helper.isTokenExpired(lemonToken);
  }
}
