import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Product } from '../../store/models/Product';
import { Warehouse } from '../../store/models/Warehouse';
import { WarehouseService } from '../../store/services/warehouse.service';
import { SharedService } from 'src/app/_utils/shared/shared.service';
import { Item } from 'src/app/basket/models/item';

@Component({
  selector: 'app-homeproducts',
  templateUrl: './store-front.component.html',
  providers: [MessageService]
})
export class StoreFrontComponent implements OnInit {

  products: Product[] = []
  warehouses !: Warehouse[]
  text: string = ""
  wishListProducts: Item[] = []
  selectetWarehouse !: number
  layout: string = 'list';
  warehouse !: Warehouse
  selectedWarehouseId!: number;
  checkWarehouse: boolean = false

  constructor(
    private warehouseService: WarehouseService,
    private sharedService: SharedService,
    private messageService: MessageService) {
    this.warehouseService.getAllWarehouses().subscribe((data) => {
      this.warehouses = data
    })
  }

  ngOnInit(): void {
    this.refreshProducts()
    this.refreshWarehouses()
  }

  refreshProducts() {
    this.warehouseService.getAllProducts().subscribe((data: any) => {
      this.products = data
    })
  };

  refreshWarehouses() {
    this.warehouseService.getAllWarehouses().subscribe((data) => {
      this.warehouses = data
    })
  }

  getProductsOfWarehouse() {
    this.warehouseService.getWarehouseProducts(this.selectedWarehouseId).subscribe((data) => {
      this.products = data
    })
    this.selectetWarehouse = this.selectedWarehouseId
    this.checkWarehouse = true

  }

  addToBasket(product: Product) {

    if (this.sharedService.getSharedList().find(item => item.productId === product.id)) {
      return
    }

    let item: Item = {
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity: 1,
      wareHouse: this.selectetWarehouse.toString(),
      imageUrl: product.imageUrl,
      categoryName: product.categoryName
    }

    this.sharedService.addToList(item);
    this.handleSuccess("Product Added To Basket")
  }

  private handleSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: message, life: 3000 });
  }
}
