import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { WarehouseService } from '../../services/warehouse.service';
import { Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  products : Product[] = []
  text : string = ""
  warehouse_id !: number
  quantity !: any
  product_id !: string
  selectedProduct!: Product;

  faArrowCircleLeft = faArrowCircleLeft

  constructor(
    private warehouseService : WarehouseService , 
    private router : Router) {
      this.warehouse_id = parseInt(this.router.url.split('/')[3]);
    }

  ngOnInit(): void {
    this.refreshList(); 
  }
 
  refreshList(){
    this.warehouseService.getAllProducts().subscribe((products) => {
      this.products = products
      console.log(products)
    })
  }

  getSearchedProducts(){
    if(this.text == ""){
      this.refreshList();
    }else{
      this.products = this.products.filter((product) =>
       !product.id.toString().indexOf(this.text) || 
       !product.name.toLocaleLowerCase().indexOf(this.text.toLocaleLowerCase()) || 
       !product.categoryName.toLocaleLowerCase().indexOf(this.text.toLocaleLowerCase()) ||
       !product.price.toString().indexOf(this.text)
      )
    }
    console.log(this.text)
  }

  onStock(){
    console.log(this.product_id)
    console.log(this.quantity)
    console.log(this.warehouse_id)
  }

  goToWarehouseProducts(){
    if(this.checkRoute())
    {
      this.router.navigate(['/store'])
      return
    }
    
    this.router.navigate([`/store/warehouses/${this.warehouse_id}/products`])
  }

  checkRoute(){
    return isNaN(this.warehouse_id)
  }
}
