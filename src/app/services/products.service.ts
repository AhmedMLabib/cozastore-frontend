import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _http: HttpClient, private _authS: AuthService) {}
  productUrl = 'cozastore-backend-production.up.railway.app/products';
  staticFileUrl = 'cozastore-backend-production.up.railway.app/images/';
  addNewProduct(product: FormData): Observable<any> {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this._authS.getToken()}`,
    });
    return this._http.post(this.productUrl, product, { headers: header });
  }
  getProducts(): Observable<any> {
    return this._http.get(this.productUrl);
  }

  deleteProduct(id: any): Observable<any> {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this._authS.getToken()}`,
      'content-type': 'application/json',
    });
    return this._http.post<any>(
      `${this.productUrl}/delete`,
      { id: id },
      { headers: header }
    );
  }
  changeStatus(id: any, status: boolean): Observable<any> {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this._authS.getToken()}`,
      'content-type': 'application/json',
    });
    return this._http.patch<any>(
      this.productUrl,
      { id: id, isActive: status },
      { headers: header }
    );
  }
}
