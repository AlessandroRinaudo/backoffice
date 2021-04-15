import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  urlApi;

  constructor(public http: HttpClient) {
    this.urlApi = "http://localhost:8000/infoproducts/";  
  }

  getData(){
    return this.http.get(this.urlApi);
  }
}
