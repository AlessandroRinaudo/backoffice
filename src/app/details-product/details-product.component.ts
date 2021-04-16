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

  constructor(public productsService : ProductsService) {
    this.products = [];
  }

  ngOnInit() {
    this.getProductsAll();
    this.getProductId(1);
  }

  getProductsAll(){
    this.productsService.getProducts().subscribe(res => {
      this.products = res;
    },
      (err) => {
        alert('failed loading json data');
      });
  }

  getProductId(tig_id){
    for(let p of this.products){
      if (p.tig_id == tig_id){
        this.product = p;
      }
    }
  }

  onSelectProduct(item){
    this.getProductId(item.tig_id)
  }
  onModifyPromotion(item){
    this.productsService.setPromotion(item.tig_id, this.newPromotion).subscribe(res => {
      this.product = res;
    },
      (err) => {
        alert('failed loading json data');
      });
    this.getProductsAll();
  }

  // getPercent ()


  

}
