import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient, private _router: Router) {
    const token = localStorage.getItem('accessToken');
    if (token) {
      this.tokenSubject.next(token);
    }
  }
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  loginApiURL = 'https://cozastore-backend-production.up.railway.app/login';
  login(loginData: any): Observable<any> {
    return this._http.post<any>(this.loginApiURL, loginData).pipe(
      tap((res) => {
        const token = res['access token'];
        if (token) {
          localStorage.setItem('accessToken', token);
          this.tokenSubject.next(token);
        }
      })
    );
  }
  getAccessToken(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }
  getToken() {
    return this.tokenSubject.value || '';
  }
  logout() {
    this.tokenSubject.next(null);
    localStorage.removeItem('accessToken');
    this._router.navigate(['/login']);
  }
  isAuthenticated(): boolean {
    return this.tokenSubject.value !== null;
  }
  decodeAccessToken(): any {
    const token = this.tokenSubject.value;
    if (token) {
      return jwtDecode<any>(token);
    }
    return null;
  }
  // register
  registerApiURL =
    'https://cozastore-backend-production.up.railway.app/register';
  register(registerData: any): Observable<any> {
    return this._http.post<any>(this.registerApiURL, registerData);
  }

  // send message
  messageURL = 'https://cozastore-backend-production.up.railway.app/message';
  sendMessage(formData: any): Observable<any> {
    return this._http.post<any>(this.messageURL, formData);
  }
  // get messages
  getMessages(): Observable<any> {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this.tokenSubject.value}`,
      'content-type': 'application/json',
    });
    return this._http.get(this.messageURL, { headers: header });
  }
}
