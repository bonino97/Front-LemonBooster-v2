import { Injectable } from "@angular/core";
import { observable, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";
import { Setting } from "../models/setting.model";
import { AuthService } from "./auth.service";
import { Configuration } from "../models/configuration.model";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root",
})
export class SettingsService {
  url = environment.authUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  AddSetting(setting: Setting): Observable<any> {
    const params = JSON.stringify(setting);
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${this.authService.GetToken()}`);

    return this.http.post(`${this.url}/settings/add-settings`, params, {
      headers,
    });
  }

  GetSetting(): Observable<any> {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${this.authService.GetToken()}`);

    return this.http.get(`${this.url}/settings`, { headers });
  }

  AddConfiguration(configuration: Configuration): Observable<any> {
    return this.apiService.POST('configuration', configuration);
  }

  GetConfiguration(userId): Observable<any> {
    return this.apiService.GET(`configuration?id=${userId}`);
  }
}
