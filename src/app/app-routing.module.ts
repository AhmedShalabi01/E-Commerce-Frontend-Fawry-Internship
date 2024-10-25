import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/components/home.component';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./store-front/store-front.module').then(m => m.StoreFrontModule) },
  { path: 'coupon', loadChildren: () => import('./coupon/coupon.module').then(m => m.CouponModule) },
  { path: 'products', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) },
  { path: 'basket', loadChildren: () => import('./basket/basket.module').then(m => m.BasketModule) },
  { path: 'bank', loadChildren: () => import('./bank/bank.module').then(m => m.BankModule) },
  { path: 'store', loadChildren: () => import('./store/store.module').then(m => m.StoreModule) },
  { path: 'users', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'order', loadChildren: () => import('./order/order.module').then(m => m.OrderModule) },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
