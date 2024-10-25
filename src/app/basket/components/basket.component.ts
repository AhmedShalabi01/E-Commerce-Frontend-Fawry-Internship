import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Item } from '../models/item';
import { SharedService } from 'src/app/_utils/shared/shared.service';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';

@Component({
    selector: 'basket',
    templateUrl: './basket.component.html',
    styleUrls: ['./basket.component.scss'],
    providers: [MessageService]
})
export class BasketComponent implements OnInit {

    isLoading: boolean = true;

    deleteOrderDialog: boolean = false;

    deleteOrdersDialog: boolean = false;

    basket!: any[];

    totalCost: number = 0;

    item!: Item;

    selectedItems: Item[] = [];

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private messageService: MessageService,
        private sharedService: SharedService,
        private router: Router) { }

    ngOnInit() {
        this.basket = this.sharedService.getSharedList();
        this.totalCost = this.sharedService.getTotalCost();
        
        setTimeout(() => {
            this.isLoading = false;
        }, 1000);

        this.cols = [
            { field: 'order', header: 'Order' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' }
        ];
    }

    placeOrder() {
        this.router.navigate(['/order'])
    }

    onQuantityChange(order: Item) {
        this.sharedService.setQuantity(order);
    }


    deleteSelectedOrders() {
        this.deleteOrdersDialog = true;
    }

    deleteOrder(item: Item) {
        this.deleteOrderDialog = true;
        this.item = item;
    }

    confirmDeleteSelected() {
        this.deleteOrdersDialog = false;
        this.basket = this.basket.filter(val => !this.selectedItems.includes(val));
        this.selectedItems.map(item => this.sharedService.removeFromList(item));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'orders Deleted', life: 3000 });
        this.selectedItems = [];
    }

    confirmDelete() {
        this.deleteOrderDialog = false;
        this.sharedService.removeFromList(this.item);
        this.basket = this.basket.filter(val => val.id !== this.item.productId);
        this.basket = [...this.basket];
        this.item = {} as Item;
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.basket.length; i++) {
            if (this.basket[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
