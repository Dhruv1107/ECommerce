import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartDataService {
  itemsInCart = [];
  constructor(private http : HttpClient) { }

  addItems(item){
    this.itemsInCart.push(item)
  }

  getItems(){
    return this.http.get('http://localhost:8080/cart')
  }

  removeItems(index){
    this.itemsInCart.splice(index,1)
  }
}
