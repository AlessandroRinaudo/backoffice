import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-manage-stock',
  templateUrl: './manage-stock.component.html',
  styleUrls: ['./manage-stock.component.css']
})
export class ManageStockComponent implements OnInit {
  productsPoisson;
  newQuantity;
  newPromotion;

  constructor(public productsService: ProductsService) { }

  ngOnInit() {
    this.newQuantity = [];
    this.newPromotion = [];
    this.getProductsPoisson();
  }

  getProductsAll() {
    this.getProductsPoisson();
  }

  getProductsPoisson() {
    this.productsService.getProductCategories("poissons").subscribe(res => {
      this.productsPoisson = res;
    },
      (err) => {
        alert('failed loading json data');
      });
  }

  onModifyPromotion() {
    for (let tig_id = 0; tig_id < this.newPromotion.length; tig_id++) {
      if (this.newPromotion[tig_id]) {
        this.productsService.setPromotion(tig_id, this.newPromotion[tig_id]).subscribe(res => {
          res;
        },
          (err) => {
            alert('failed loading json data');
          });
      }
    }
    console.log(this.newPromotion)
  }

  addQuantity() {
    for (let tig_id = 0; tig_id < this.newQuantity.length; tig_id++) {
      if (this.newQuantity[tig_id]) {
        this.productsService.addQuantity(tig_id, this.newQuantity[tig_id]).subscribe(res => {
          res;
        },
          (err) => {
            alert(err + 'failed loading json data');
          });
      }
    }
    console.log(this.newQuantity)
  }

  modifyStock(){
    this.addQuantity();
    this.onModifyPromotion();
    this.getProductsAll();
  }
}
