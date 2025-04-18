import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private _http: HttpClient, private _authS: AuthService) {}
  orderURL = 'https://cozastore-backend-production.up.railway.app/orders';

  getOrders(): Observable<any> {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this._authS.getToken()}`,
      'content-type': 'application/json',
    });
    return this._http.get(this.orderURL, { headers: header });
  }
  getOrder(id: string): Observable<any> {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this._authS.getToken()}`,
      'content-type': 'application/json',
    });
    return this._http.post(
      `${this.orderURL}/order`,
      { id: id },
      { headers: header }
    );
  }
  addOrders(orders: any): Observable<any> {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this._authS.getToken()}`,
      'content-type': 'application/json',
    });
    return this._http.post(this.orderURL, orders, { headers: header });
  }
  changeStatus(id: string, status: string): Observable<any> {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this._authS.getToken()}`,
      'content-type': 'application/json',
    });
    return this._http.patch(
      this.orderURL,
      { id: id, status: status },
      { headers: header }
    );
  }
}
