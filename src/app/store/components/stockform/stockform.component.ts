import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { WarehouseService } from '../../services/warehouse.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faClose, faCubes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-stockform',
  templateUrl: './stockform.component.html'
})
export class StockformComponent implements OnInit {
  title = 'appBootstrap';
  modal : any
  @Input() ware_id !: number 
  @Input() product_id !: number
  quantity : string = ""

  closeResult !: string;

  

  constructor(private modalService: NgbModal , 
    private warehouseService : WarehouseService , 
    private router : Router,
    private library: FaIconLibrary)  {
      library.addIcons(faClose, faCubes);
    }
  ngOnInit(): void {
    
  }

    

  open(content : any) {

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {

      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });

  }

  

  private getDismissReason(reason: any): string {


    if (reason === ModalDismissReasons.ESC) {

      return 'by pressing ESC';

    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {

      return 'by clicking on a backdrop';

    } else {

      return  `with: ${reason}`;

    }

  }

  submit(modal: any){
    if(this.quantity == ""){
      alert("Please enter a quantity")
      return
    }
    console.log('w ' + this.ware_id)
    console.log('p ' + this.product_id)
    console.log('q ' + this.quantity)

    this.warehouseService.stockProduct(this.ware_id , this.product_id , parseInt(this.quantity)).subscribe((res) => {
      console.log(res)
    })
    this.quantity = ''
    alert("product added successfully")
    this.modalService.dismissAll()
  }

  checkRoute(){
    return isNaN(this.ware_id);
  }
  
}

