import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';


@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})
export class DetailsProductComponent implements OnInit {

  products;
  product;

  constructor(public productsService : ProductsService) {
    this.products = [];
  }

  ngOnInit() {
    this.productsService.getData().subscribe(res => {
        this.products = res;
        this.getProductId(1);
      },
      (err) => {
        alert('failed loading json data');
      });
  }

  getProductId(id){
    for(let p of this.products){
      if(p.id == 4){
        this.product = p;
      }
    }
  }

  // getPercent ()


  

}
