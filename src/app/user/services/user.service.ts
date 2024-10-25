import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { BearerToken } from '../models/bearertoken.interface';
import { User } from '../models/user.interface';
import { TokenService } from './token.service';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServerUrl = 'http://localhost:5000/users';

  constructor(private http: HttpClient, private tokenservice: TokenService) { }

  token: string = this.tokenservice.getToken()

  getUser(): Observable<User[]> {
    return this.http.get<User[]>(this.apiServerUrl, { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token) }).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    )
  }

  addUser(username: string, password: string, role: string): Observable<User[]> {
    return this.http.post<User[]>(this.apiServerUrl, {
      "username": username,
      "password": password,
      "enabled": 1,
      "authority": [
        {
          "username": username,
          "authority": "ROLE_" + role.toUpperCase()
        }
      ]
    }, { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token) }).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    )
  }

  login(username: string, password: string): Observable<BearerToken> {
    return this.http.post<BearerToken>(
      `${this.apiServerUrl}/auth/token`,
      {
        "username": username,
        "password": password
      }
    ).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError))
  }

  activate(userName: string): Observable<User> {
    return this.http.put<User>(
      `${this.apiServerUrl}/activate/` + userName, {},
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
      }
    ).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError))
  }

  deactivate(userName: string): Observable<User> {
    return this.http.put<User>(
      `${this.apiServerUrl}/deactivate/` + userName, {},
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
      }
    ).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError))
  }

  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {

      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
