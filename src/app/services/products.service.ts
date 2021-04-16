import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  urlApi;

  constructor(public http: HttpClient) {
    this.urlApi = "http://localhost:8000";  
  }

  getProducts(){
    return this.http.get(this.urlApi + "/infoproducts/");
  }
  setPromotion(id, discount) {
    return this.http.get(this.urlApi + "/modifyDiscount/" + id + "/" + discount + "/");
  }
}
