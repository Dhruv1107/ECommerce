import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  dataList = new Subject();
  constructor(private http : HttpClient) { }
  getDataList(){
    return this.http.get('http://localhost:3000/products');
  }

  addToCart(item){
    return this.http.post('http://localhost:8080/insert',item)
  }

  removeFromCart(item) {
    return this.http.post('http://localhost:8080/cart' , item)
  }

  addToCompare(item){
    return this.http.post('http://localhost:8080/compare' , item)
  }

  getCompareList(){
    return this.http.get('http://localhost:8080/compare')
  }

  addProduct(product) {
    return this.http.post("http://localhost:3000/admin/add-product",product);
  }
}
