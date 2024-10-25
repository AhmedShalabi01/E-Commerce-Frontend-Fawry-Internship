import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreFrontComponent } from './store-front/store-front.component';

const routes: Routes = [
  { path: '', component: StoreFrontComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreFrontRoutingModule { }
