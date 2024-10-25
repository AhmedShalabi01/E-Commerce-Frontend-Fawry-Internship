import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CouponComponent } from './components/coupon/coupon.component';
import { ConsumptionComponent } from './components/consumption/consumption.component';

const routes: Routes = [
  { path: '', component: CouponComponent },
  { path: 'consumption-history', component: ConsumptionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponRoutingModule { }
