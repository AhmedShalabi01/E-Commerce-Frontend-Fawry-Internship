import { Injectable } from '@angular/core';
import { Cons, Observable } from 'rxjs';
import { Consumption } from '../models/consumption'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsumptionService {
  private apiServerUrl = 'http://localhost:5000/coupon/consumption-history';

  constructor(private http: HttpClient) { }

  // Subscriber functions
  public getAllConsumptions(): Observable<Consumption[]> {
    return this.http.get<Consumption[]>(`${this.apiServerUrl}/list`);
  }

  public deleteConsumption(id: number): Observable<any> {
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${id}`);
  }
}
