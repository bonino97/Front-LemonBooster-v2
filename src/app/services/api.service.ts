import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

export class ResponseGeneric {
  success: boolean;
  data: any;
  error: any;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url = `http://104.248.113.209:5000/api`;

  constructor(private http: HttpClient, private authService: AuthService) {
    console.log('API');
  }

  POST(entity, data: any): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.authService.GetToken()}`);

    return this.http.post(`${this.url}/${entity}`, params, {
      headers: headers,
    });
  }

  PUT(entity, data: any): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.authService.GetToken()}`);

    return this.http.put(`${this.url}/${entity}`, params, {
      headers: headers,
    });
  }

  DELETE(entity): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.authService.GetToken()}`);

    return this.http.delete(`${this.url}/${entity}`, {
      headers: headers,
    });
  }

  GET(entity): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.authService.GetToken()}`);

    return this.http.get(`${this.url}/${entity}`, {
      headers: headers,
    });
  }
}
