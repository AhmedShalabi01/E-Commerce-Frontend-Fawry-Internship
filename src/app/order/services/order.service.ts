import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Order } from '../models/order';
import { Coupon } from '../models/coupon';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:5000/order';

  constructor(private http: HttpClient){}

  getCoupon(couponCode: string): Observable<Coupon> {
    return this.http.get<Coupon>(`${this.apiUrl}/getCoupon/${couponCode}`)
  }

  createOrderWithoutCoupon(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/orderwithoutcoupon`, order)
      .pipe(
        catchError(this.handleError)
      );
  }

  createOrderWithCoupon(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/orderwithcoupon`, order)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error (HTTP ${error.status}): ${error.error}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
