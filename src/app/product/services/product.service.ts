import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiServerUrl = "http://localhost:5000/products";

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiServerUrl}/list`)
  }

  public addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiServerUrl}/saveNewProduct`, product);
  }

  public updateProduct(product: Product, productId: number): Observable<Product> {
    return this.http.put<Product>(`${this.apiServerUrl}/updateProduct/${productId}`, product);
  }

  public deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/deleteProduct/${productId}`);
  }

  public searchProduct(Keyword: string): Observable<Product[]> {
    const params = { Keyword: Keyword };
    return this.http.get<Product[]>(`${this.apiServerUrl}/search`, { params });
  }
}
