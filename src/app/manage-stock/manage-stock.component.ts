import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-manage-stock',
  templateUrl: './manage-stock.component.html',
  styleUrls: ['./manage-stock.component.css']
})
export class ManageStockComponent implements OnInit {
  productsPoisson;
  productsCrustaces;
  productsCoquillages;
  newQuantity;
  newPromotion;
  categories = [
    { "id": 1, "name": "poissons", "products": null  },
    { "id": 2, "name": "crustaces", "products": null },
    { "id": 3, "name": "coquillages", "products": null },
  ];

  constructor(public productsService: ProductsService) { }

  ngOnInit() {
    this.newQuantity = [];
    this.newPromotion = [];
    this.getProductsAll();
  }

  getProductsAll() {
    for (let i = 0; i < this.categories.length; i++){
      this.getProductsCategory(this.categories[i].name);
      console.log(this.categories[i].products)
    }
  }

  getProductsCategory(category) {
    this.productsService.getProductCategories(category).subscribe(res => {
      for (let i = 0; i < this.categories.length; i++)
        if (this.categories[i].name == category)
          this.categories[i].products = res;
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
    console.log(this.newQuantity);
  }

  modifyStock(){
    this.addQuantity();
    this.onModifyPromotion();
    this.getProductsAll();
  }
}
