import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable, catchError, forkJoin, throwError } from 'rxjs';
import { Coupon } from 'src/app/coupon/models/coupon';
import { CouponService } from 'src/app/coupon/services/coupon.service';


@Component({
  selector: 'coupon',
  templateUrl: './coupon.component.html',
  providers: [MessageService]
})
export class CouponComponent {

  couponDialog: boolean = false;

  deleteCouponDialog: boolean = false;

  deleteCouponsDialog: boolean = false;

  submitted: boolean = false;

  coupons!: Coupon[];

  coupon!: Coupon;

  selectedCoupons!: Coupon[];

  cols: any[] = [];

  couponTypes: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private couponService: CouponService, 
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit() {
    this.couponService.getAllCoupons().subscribe({
      next: (response: Coupon[]) => {
        this.coupons = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });

    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'code', header: 'Code' },
      { field: 'maxUsages', header: 'Maximum Usages' },
      { field: 'type', header: 'Type' },
      { field: 'discount', header: 'Discount' },
      { field: 'expiryDate', header: 'Expiry Date' }
    ];

    this.couponTypes = [
      { label: 'Fixed', value: 'fixed' },
      { label: 'Percentage', value: 'percentage' }
    ];
  }

  openNew() {
    this.coupon = {} as Coupon;
    this.submitted = false;
    this.couponDialog = true;
  }

  deleteSelectedCoupons() {
    this.deleteCouponsDialog = true;
  }

  editCoupon(coupon: Coupon) {
    this.coupon = { ...coupon };
    console.log(this.coupon);
    this.couponDialog = true;
  }

  deleteCoupon(coupon: Coupon) {
    this.deleteCouponDialog = true;
    this.coupon = { ...coupon };
  }

  hideDialogs() {
    this.couponDialog = false;
    this.submitted = false;
    this.deleteCouponDialog = false;
    this.deleteCouponsDialog = false;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  confirmDelete(coupon: Coupon) {
    this.couponService.deleteCoupon(coupon.id)
      .pipe((err) => this.handleObservableError(err))
      .subscribe({
        next: () => {
          this.handleSuccess('Coupon Deleted Successfully');
          this.coupons = [...this.coupons];
          this.coupon = {} as Coupon;
          this.hideDialogs();
        }
      });
  }


  confirmDeleteSelected() {
    // An array to store the observables for each delete operation
    const deleteObservables = [];

    // Iterate through the selected coupons and call deleteCoupon for each
    for (const selectedCoupon of this.selectedCoupons) {
      const deleteObservable = this.couponService.deleteCoupon(selectedCoupon.id!);
      deleteObservables.push(deleteObservable);
    }

    // Wait delete operations to complete
    forkJoin(deleteObservables).subscribe({
      next: () => {
        this.coupons = this.coupons.filter(val => !this.selectedCoupons.includes(val));
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Coupons Deleted',
          life: 3000
        });
        this.selectedCoupons = [];
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete coupons',
          life: 3000
        });
      }
    });

    this.hideDialogs();
  }

  saveCoupon() {
    this.submitted = true;

    if (this.validateCoupon(this.coupon)) {
      if (this.coupon.id !== undefined) {
        if (this.coupon.type === 'fixed') {
          this.updateFixedCoupon();
        } else if (this.coupon.type === 'percentage') {
          this.updatePercentageCoupon();
        }
      } else {
        // Handles create requests
        if (this.coupon.type === 'fixed') {
          this.addFixedCoupon();
        } else if (this.coupon.type === 'percentage') {
          this.addPercentageCoupon();
        }
      }
    } else {
      // Throw error if nor fields are complete
      console.error('Error, fields are not complete');
      this.messageService.add({ severity: 'error', summary: 'Failed', detail: "Fields cannot be empty", life: 3000 });
    }
  }

  private addFixedCoupon() {
    this.submitted = true;

    this.couponService.addFixedCoupon(this.coupon)
      .pipe((err) => this.handleObservableError(err))
      .subscribe({
        next: (createdCoupon) => {
          this.handleSuccess('Coupon Created');
          this.coupons.push(createdCoupon);
          this.hideDialogs();
          this.coupon = {} as Coupon;
        }
      });
  }

  private addPercentageCoupon() {
    this.submitted = true;

    this.couponService.addPercentageCoupon(this.coupon)
      .pipe((err) => this.handleObservableError(err))
      .subscribe({
        next: (createdCoupon) => {
          this.handleSuccess('Coupon Created');
          this.coupons.push(createdCoupon);
          this.hideDialogs();
          this.coupon = {} as Coupon;
        }
      });
  }

  private updateFixedCoupon() {
    this.submitted = true;

    this.couponService.updateFixedCoupon(this.coupon.id!, this.coupon)
      .pipe((err) => this.handleObservableError(err))
      .subscribe({
        next: (updatedCoupon) => {
          this.handleSuccess('Coupon Updated');
          const index = this.coupons.findIndex((coupon) => coupon.id === updatedCoupon.id);
          if (index !== -1) {
            this.coupons[index] = updatedCoupon;
          }
          this.hideDialogs();
          this.coupon = {} as Coupon;
        }
      });
  }

  private updatePercentageCoupon() {
    this.submitted = true;

    this.couponService.updatePercentageCoupon(this.coupon.id!, this.coupon)
      .pipe((err) => this.handleObservableError(err))
      .subscribe({
        next: (updatedCoupon) => {
          this.handleSuccess('Coupon Updated');
          const index = this.coupons.findIndex((coupon) => coupon.id === updatedCoupon.id);
          if (index !== -1) {
            this.coupons[index] = updatedCoupon;
          }
          this.hideDialogs();
          this.coupon = {} as Coupon;
        }
      });
  }

  private validateCoupon(coupon: Coupon): boolean {
    return (
      coupon &&
      coupon.code != null &&
      coupon.maxUsages != null &&
      coupon.type != null &&
      coupon.discount != null &&
      coupon.expiryDate != null
    );
  }

  showConsumptionHistory() {
    this.router.navigate(['coupon/consumption-history'])
  }

  // Handle successful and error message service
  private handleSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: message, life: 3000 });
  }

  private handleObservableError(observable: Observable<any>): Observable<any> {
    return observable.pipe(
      catchError((error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: `${error.error.message}`, life: 3000 });
        return throwError(() => error);
      })
    );
  }
}
