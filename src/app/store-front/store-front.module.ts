import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreFrontRoutingModule } from './store-front-routing.module';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { DataViewModule } from 'primeng/dataview';
import { StoreFrontComponent } from './store-front/store-front.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule } from 'primeng/button';
import { StoreRoutingModule } from '../store/store-routing.module';

@NgModule({
  declarations: [
    StoreFrontComponent
  ],
  imports: [
    CommonModule,
    StoreFrontRoutingModule,
    ToastModule,
    DropdownModule,
    DataViewModule,
    FormsModule,
    StoreRoutingModule,
    ButtonModule,
    FontAwesomeModule,
  ]
})
export class StoreFrontModule { }
