import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { ProductsComponent } from './components/products/products.component';
import { ShowhistoriesComponent } from './components/showhistories/showhistories.component';
import { ShowwarehousesComponent } from './components/showwareouses/showwareouses.component';
import { ShowwarproductsComponent } from './components/showwarproducts/showwarproducts.component';
import { StockformComponent } from './components/stockform/stockform.component';

const routes: Routes = [
  { path: '', component: ShowwarehousesComponent },
  { path: 'warehouses/create', component: FormComponent },
  { path: 'warehouses/edit/:id', component: FormComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'warehouses/:id/products', component: ShowwarproductsComponent },
  { path: 'warehouses/:id/products/stock', component: ProductsComponent },
  { path: 'warehouses/:id/product/:prodId/stock', component: StockformComponent },
  { path: 'histories', component: ShowhistoriesComponent },
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
