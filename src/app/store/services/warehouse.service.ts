import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Warehouse } from '../models/Warehouse';
import { HttpHeaders } from '@angular/common/http';
import { Product } from '../models/Product';
import { Inventory } from '../models/Inventory';
import { History } from '../models/History';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  url: string = "http://localhost:5000/store"

  warehouses = new Subject<Warehouse[]>();

  constructor(private http: HttpClient) { }

  getAllWarehouses(): Observable<Warehouse[]> {
    return this.http.get<Warehouse[]>(`${this.url}/warehouses`);
  }

  deleteWarehouse(id: number): Observable<Warehouse> {
    return this.http.delete<Warehouse>(`${this.url}/warehouses/${id}`, httpOptions);
  }

  createWarehouse(warehouse: any): Observable<any> {
    return this.http.post<Warehouse>(`${this.url}/warehouses`, warehouse);
  }

  updateWarehouse(warehouse: Warehouse): Observable<Warehouse> {
    return this.http.put<Warehouse>(`${this.url}/warehouses/${warehouse.id}`, warehouse);
  }

  getWarehouseById(id: string): Observable<Warehouse> {
    return this.http.get<Warehouse>(`${this.url}/warehouses/${id}`);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/products`);
  }

  stockProduct(warehouse_id: number, product_id: number, qunatity: number): Observable<any> {
    return this.http.post<any>(`${this.url}/warehouses/${warehouse_id}/product/${product_id}/stock/${qunatity}`, httpOptions);
  }

  getWarehouseProducts(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/warehouses/${id}/products`);
  }

  getWarehouseInvetoeries(id: number): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(`${this.url}/warehouses/${id}/inventories`);
  }

  gethistories(): Observable<History[]> {
    return this.http.get<History[]>(`${this.url}/histories`);
  }

  getQuantityOfProduct(warehouse_id: number, product_id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/warehouses/${warehouse_id}/product/${product_id}`);
  }


}
