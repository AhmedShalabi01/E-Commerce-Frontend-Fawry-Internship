import { Component, OnInit } from '@angular/core';
import { Inventory } from '../../models/Inventory';
import { WarehouseService } from '../../services/warehouse.service';
import { Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faAdd, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-showwarproducts',
  templateUrl: './showwarproducts.component.html'
})
export class ShowwarproductsComponent implements OnInit {

  inventories: Inventory[] = []
  text: string = ""
  warehouse_id !: number
  selectedProduct !: Inventory

  faAdd = faAdd

  constructor(
    private warehouseService: WarehouseService, 
    private router: Router) {

    this.warehouse_id = parseInt(this.router.url.split('/')[3])
    if (this.warehouse_id == undefined || this.warehouse_id == null) {
      this.router.navigate(['/store/warehouses'])
    }
    this.router.navigate([`/store/warehouses/${this.warehouse_id}/products`]);
  }

  ngOnInit(): void {
    this.refreshProductList();
  }

  refreshProductList() {
    this.warehouseService.getWarehouseInvetoeries(this.warehouse_id).subscribe((invenotries) => {
      this.inventories = invenotries
      console.log(invenotries)
    });
  }

  getSearchedProducts() {
    if (this.text == "") {
      this.refreshProductList();
    } else {
      this.inventories = this.inventories.filter((invenotry) =>
        !invenotry.id.toString().indexOf(this.text) ||
        !invenotry.product.name.toLocaleLowerCase().indexOf(this.text.toLocaleLowerCase()) ||
        !invenotry.product.categoryName.toLocaleLowerCase().indexOf(this.text.toLocaleLowerCase()) ||
        !invenotry.product.price.toString().indexOf(this.text)
      )
    }
    console.log(this.text)
  }

}
