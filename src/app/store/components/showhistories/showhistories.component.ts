import { Component, OnInit } from '@angular/core';
import { WarehouseService } from '../../services/warehouse.service';
import { History } from '../../models/History';

@Component({
  selector: 'app-showhistories',
  templateUrl: './showhistories.component.html'
})
export class ShowhistoriesComponent implements OnInit {
  histories!: History[];
  text!: string;
  constructor(private warehouseService: WarehouseService) {

  }
  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    this.warehouseService.gethistories().subscribe(histories => {
      this.histories = histories;
    })
  }

  getSerchedHistories() {
    if (this.text == '') {
      this.refreshList();
    } else {
      this.histories = this.histories.filter((history) =>
        !history.id.toString().indexOf(this.text) ||
        !history.warehouseName.toLocaleLowerCase().indexOf(this.text.toLocaleLowerCase()) ||
        !history.productName.toLocaleLowerCase().indexOf(this.text.toLocaleLowerCase()) ||
        !history.stockEnum.toLocaleLowerCase().indexOf(this.text.toLocaleLowerCase()) ||
        !history.time.toLocaleLowerCase().indexOf(this.text.toLocaleLowerCase()) ||
        !history.date.toLocaleLowerCase().indexOf(this.text.toLocaleLowerCase())
      )
    }
  }
}

