import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable, catchError, forkJoin, throwError } from 'rxjs';
import { Consumption } from 'src/app/coupon/models/consumption';
import { ConsumptionService } from 'src/app/coupon/services/consumption.service';


@Component({
  selector: 'consumption',
  templateUrl: './consumption.component.html',
  providers: [MessageService]
})
export class ConsumptionComponent {

  consumptionDialog: boolean = false;

  deleteConsumptionDialog: boolean = false;

  deleteConsumptionsDialog: boolean = false;

  submitted: boolean = false;

  consumptions!: Consumption[];

  consumption!: Consumption;

  selectedConsumptions!: Consumption[];

  cols: any[] = [];

  consumptionTypes: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(private consumptionService: ConsumptionService, private messageService: MessageService) { }

  ngOnInit() {
    this.consumptionService.getAllConsumptions().subscribe({
      next: (response: Consumption[]) => {
        this.consumptions = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });

    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'couponCode', header: 'Coupon Code' },
      { field: 'orderId', header: 'Order ID' },
      { field: 'timestamp', header: 'Timestamp' }
    ];
  }

  openNew() {
    this.consumption = {} as Consumption;
    this.submitted = false;
    this.consumptionDialog = true;
  }

  deleteSelectedConsumptions() {
    this.deleteConsumptionsDialog = true;
  }

  editConsumption(consumption: Consumption) {
    this.consumption = { ...consumption };
    this.consumptionDialog = true;
  }

  deleteConsumption(consumption: Consumption) {
    this.deleteConsumptionDialog = true;
    this.consumption = { ...consumption };
  }

  hideDialogs() {
    this.consumptionDialog = false;
    this.submitted = false;
    this.deleteConsumptionDialog = false;
    this.deleteConsumptionsDialog = false;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  confirmDelete(consumption: Consumption) {
    this.consumptionService.deleteConsumption(consumption.id)
      .pipe((err) => this.handleObservableError(err))
      .subscribe({
        next: () => {
          this.handleSuccess('Consumption Deleted Successfully');
          this.consumptions = [...this.consumptions];
          this.consumption = {} as Consumption;
          this.hideDialogs();
        }
      });
  }


  confirmDeleteSelected() {
    // An array to store the observables for each delete operation
    const deleteObservables = [];

    // Iterate through the selected consumptions and call deleteConsumption for each
    for (const selectedConsumption of this.selectedConsumptions) {
      const deleteObservable = this.consumptionService.deleteConsumption(selectedConsumption.id!);
      deleteObservables.push(deleteObservable);
    }

    // Wait delete operations to complete
    forkJoin(deleteObservables).subscribe({
      next: () => {
        this.consumptions = this.consumptions.filter(val => !this.selectedConsumptions.includes(val));
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Consumptions Deleted',
          life: 3000
        });
        this.selectedConsumptions = [];
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete consumptions',
          life: 3000
        });
      }
    });

    this.hideDialogs();
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
