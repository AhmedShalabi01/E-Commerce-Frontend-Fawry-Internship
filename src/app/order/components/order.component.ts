import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Coupon } from '../models/coupon';
import { SharedService } from 'src/app/_utils/shared/shared.service';
import { Item } from 'src/app/basket/models/item';
import { Order } from '../models/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  email!: string;
  coupon?: string;
  couponData?: Coupon;
  cardNumber!: number;
  orderItems!: Item[];
  totalCost: number = 0;

  order!: Order;

  loading: boolean = false;

  constructor(
    private orderService: OrderService,
    private messageService: MessageService,
    private sharedService: SharedService) { }

  ngOnInit() {
    this.orderItems = this.sharedService.getSharedList();
    this.totalCost = this.sharedService.getTotalCost();
  }

  confirmOrder() {
    this.order = {
      email: this.email,
      accountNumber: this.cardNumber,
      coupon: this.coupon,
      storeId: parseInt(this.orderItems[0].wareHouse),
      orderItems: this.orderItems
    }

    if (!this.couponData) {
      this.orderService.createOrderWithoutCoupon(this.order)
        .pipe((err) => this.handleObservableError(err))
        .subscribe({
          next: () => this.handleSuccess("Order confirmed successfully")
        });
    } else {
      this.orderService.createOrderWithCoupon(this.order)
        .pipe((err) => this.handleObservableError(err))
        .subscribe({
          next: () => this.handleSuccess("Order confirmed successfully")
        });
    }
  }

  applyCoupon() {
    this.loading = true;
    this.orderService.getCoupon(this.coupon!)
      .pipe((err) => this.handleObservableError(err))
      .subscribe({
        next: (response) => {
          this.couponData = response;
          if (this.couponData?.type == "FIXED") {
            this.totalCost -= this.couponData.discount;
            this.totalCost = this.totalCost < 0 ? 0 : this.totalCost;
          } else if (this.couponData?.type == "PERCENTAGE") {
            this.totalCost -= (this.totalCost * this.couponData.discount) / 100;
          }
          setTimeout(() => {
            this.loading = false
          }, 1000);
          this.handleSuccess("Coupon Applied Successfully");
        },
      });
  }

  initializeOrder() {
    return {
      email: this.email,

    }
  }

  private handleSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: message, life: 3000 });
  }

  private handleObservableError(observable: Observable<any>): Observable<any> {
    return observable.pipe(
      catchError((error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: `${error.error.message}`, life: 3000 });
        this.coupon = "";
        this.loading = false;
        return throwError(() => error);
      })
    );
  }
}
