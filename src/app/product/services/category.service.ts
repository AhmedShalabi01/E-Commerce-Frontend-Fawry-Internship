import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiServerUrl = "http://localhost:5000/products/categories";

  constructor(private http: HttpClient) { }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiServerUrl}/list`)
  }

  public saveNewCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.apiServerUrl}/saveNewCategory`, category);
  }

}
