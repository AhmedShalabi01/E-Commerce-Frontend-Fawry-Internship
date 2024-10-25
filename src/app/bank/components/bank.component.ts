import { Component } from '@angular/core';
import { BankService } from '../services/bank.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Account } from '../models/account';
import { Transaction } from '../models/transaction';
import { Table } from 'primeng/table';
import { forkJoin, Observable, catchError, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'bank',
  templateUrl: './bank.component.html'
})
export class BankComponent {

  newAccountDialog: boolean = false;

  deleteAccountDialog: boolean = false;

  transactionDialog: boolean = false;

  submitted: boolean = false;

  account!: Account;

  accounts!: Account[];

  transactions!: Transaction[];

  editaccount: Account | undefined;

  deleteaccount: Account | undefined;

  cols: any[] = [];

  accountTypes: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(private accountService: BankService, 
    private messageService: MessageService) { }

  ngOnInit() {
    this.accountService.getUsers().subscribe({
      next: (response: Account[]) => {
        this.accounts = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });

    this.cols = [
      { field: 'cardnumber', header: 'Card Number' },
      { field: 'username', header: 'Username' },
      { field: 'balance', header: 'Balance' }
    ];
  }

  openNew() {
    this.account = {} as Account;
    this.submitted = false;
    this.newAccountDialog = true;
  }

  deleteAccount(account: Account) {
    this.deleteAccountDialog = true;
    this.account = { ...account };
  }

  hideDialogs() {
    this.newAccountDialog = false;
    this.submitted = false;
    this.deleteAccountDialog = false;
    this.transactionDialog = false;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  confirmDelete(account: Account) {
    this.accountService.deleteUser(account.cardnumber)
      .pipe((err) => this.handleObservableError(err))
      .subscribe({
        next: () => {
          this.handleSuccess('Account Deleted Successfully');
          this.accounts = [...this.accounts];
          this.account = {} as Account;
          this.hideDialogs();
        }
      });
  }

  saveAccount() {
    this.submitted = true;
    if (this.validateNewAccount(this.account)) {
      this.submitted = true;

      this.accountService.addUser(this.account)
      .pipe((err) => this.handleObservableError(err))
      .subscribe({
        next: (createdAccount) => {
          this.handleSuccess('Account Created');
          this.accounts.push(createdAccount);
          this.hideDialogs();
          this.account = {} as Account;
        }
      });
    } else {
      // Throw error if nor fields are complete
      console.error('Error, fields are not complete');
      this.messageService.add({ severity: 'error', summary: 'Failed', detail: "Fields cannot be empty", life: 3000 });
    }
  }

  onGetTransactions(account: Account): void {
    this.transactionDialog = true;
    this.accountService.getTransactions(account.cardnumber).subscribe(
      (response: Transaction[]) => {
        this.transactions = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  } 

  private validateNewAccount(account: Account): boolean {
    return (
      account &&
      account.cardnumber != null &&
      account.username != null &&
      account.password != null
    );
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
