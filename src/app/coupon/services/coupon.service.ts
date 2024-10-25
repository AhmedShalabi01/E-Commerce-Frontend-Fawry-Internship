import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coupon } from '../models/coupon'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  private apiServerUrl = 'http://localhost:5000/coupon';

  constructor(private http: HttpClient) { }

  // Subscriber functions
  public getAllCoupons(): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(`${this.apiServerUrl}/list`);
  }

  public addFixedCoupon(coupon: Coupon): Observable<Coupon> {
    return this.http.post<Coupon>(`${this.apiServerUrl}/add/fixed`, coupon);
  }

  public addPercentageCoupon(coupon: Coupon): Observable<any> {
    return this.http.post<void>(`${this.apiServerUrl}/add/percentage`, coupon);
  }

  public updateFixedCoupon(id: number, coupon: Coupon): Observable<any> {
    return this.http.put<void>(`${this.apiServerUrl}/update/fixed/${id}`, coupon);
  }

  public updatePercentageCoupon(id: number, coupon: Coupon): Observable<any> {
    return this.http.put<void>(`${this.apiServerUrl}/update/percentage/${id}`, coupon);
  }

  public deleteCoupon(id: number): Observable<any> {
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${id}`);
  }
}
