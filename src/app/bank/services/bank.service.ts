import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  private apiServerUrl = 'http://localhost:5000/bank';

  constructor(private http: HttpClient) { }
  public getUsers(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiServerUrl}/Accounts`)
  }

  public addUser(user: Account): Observable<Account> {
    return this.http.post<Account>(`${this.apiServerUrl}/create/user`, user)
  }

  public updateUser(user: Account): Observable<Account> {
    return this.http.post<Account>(`${this.apiServerUrl}/update/user`, user)
  }

  public deleteUser(userid: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/delete/user/${userid}`);
  }

  public getTransactions(userid: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiServerUrl}/${userid}/transactions`);
  }
}
