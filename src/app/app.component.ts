import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TokenService } from './user/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'E-Commerce App';
  tabItems!: MenuItem[];
  loggedIn: boolean = false;

  constructor(
    private tokenService: TokenService,
    private router: Router) { }

  ngOnInit(): void {

    if (!this.tokenService.getToken()) {
      this.tabItems = [
        {
          label: 'Home',
          routerLink: 'home'
        },
        {
          label: 'Basket',
          icon: 'pi pi-shopping-cart',
          routerLink: 'basket'
        },
        {
          label: 'Login',
          icon: 'pi pi-fw pi-user',
          routerLink: '/users/login'
        },
      ]
    } else {
      this.tabItems = [
        {
          label: 'Home',
          routerLink: 'home'
        },
        {
          label: 'Users',
          icon: 'pi pi-fw pi-user',
          routerLink: '/users/table'
        },
        {
          label: 'Products',
          icon: 'pi pi-shopping-bag',
          routerLink: '/products',
        },
        {
          label: 'Store',
          icon: 'pi pi-building',
          routerLink: 'store'
        },
        {
          label: 'Coupons',
          icon: 'pi pi-check-square',
          routerLink: 'coupon'
        },
        {
          label: 'Bank',
          icon: 'pi pi-money-bill',
          routerLink: 'bank'
        },
      ];
    }
  }
}
