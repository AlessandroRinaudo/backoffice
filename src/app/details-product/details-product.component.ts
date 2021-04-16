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
  newPromotion;
  newQuantity;

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
      if(p.id == id){
        this.product = p;
      }
    }
  }
  onSelectProduct(item){
    this.getProductId(item.id)
  }
  onModifyPromotion(){
    alert(this.newPromotion)
  }

  addQuantity(){
    if(this.newQuantity)
    alert(this.newQuantity)
  }
  removeQuantity(){
    alert(this.newQuantity)
  }

  // getPercent ()


  

}
