import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient, private _authS: AuthService) {}
  userURL = 'cozastore-backend-production.up.railway.app/user';
  getUsers(): Observable<any> {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this._authS.getToken()}`,
      'content-type': 'application/json',
    });
    return this._http.get<any>(this.userURL, { headers: header });
  }
}
