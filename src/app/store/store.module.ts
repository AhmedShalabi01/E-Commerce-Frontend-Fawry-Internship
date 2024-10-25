import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { FormComponent } from './components/form/form.component';
import { HeadersComponent } from './components/headers/headers.component';
import { ProductsComponent } from './components/products/products.component';
import { ShowhistoriesComponent } from './components/showhistories/showhistories.component';
import { ShowwarehousesComponent } from './components/showwareouses/showwareouses.component';
import { ShowwarproductsComponent } from './components/showwarproducts/showwarproducts.component';
import { StockformComponent } from './components/stockform/stockform.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DataViewModule } from 'primeng/dataview'
import { SidebarModule } from 'primeng/sidebar';


import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    ShowwarehousesComponent,
    HeadersComponent,
    FormComponent,
    ProductsComponent,
    StockformComponent,
    ShowwarproductsComponent,
    ShowhistoriesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    StoreRoutingModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    TableModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    DynamicDialogModule,
    MessagesModule,
    InputNumberModule,
    DataViewModule,
    DropdownModule,
    FontAwesomeModule,
    SidebarModule
  ]
})
export class StoreModule { }
