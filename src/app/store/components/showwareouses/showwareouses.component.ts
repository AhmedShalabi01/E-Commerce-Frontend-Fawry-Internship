import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Warehouse } from '../../models/Warehouse';
import { WarehouseService } from '../../services/warehouse.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faAdd, faCubes, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-showwareouses',
  templateUrl: './showwareouses.component.html',
  styleUrls: ['./showwareouses.component.css']
})
export class ShowwarehousesComponent implements OnInit{
  
  warehouses : Warehouse[] = [
  ];

  selectedWarehouse!: Warehouse;

  constructor(
    private warehouseService : WarehouseService , 
    private router : Router ){}

  faPen = faPen
  faTrash = faTrash
  faAdd = faAdd
  faCubes = faCubes

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(){
    this.warehouseService.getAllWarehouses().subscribe(warehouses => {
      this.warehouses = warehouses
      console.log(warehouses)
    })
  }

  deleteWarehouse(id : number){
    this.warehouseService.deleteWarehouse(id).subscribe(() => this.warehouses = this.warehouses.filter((warehouse)=> warehouse.id != id))
    console.log(id)
  }
}

