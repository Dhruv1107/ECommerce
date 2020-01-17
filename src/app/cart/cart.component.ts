import { Component, OnInit } from '@angular/core';
import { CartDataService } from '../cart-data.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems : any = [];
  constructor(private cart : CartDataService , private data : DataService) { }

  ngOnInit() {
    this.cart.getItems().subscribe(data => {
      this.cartItems = data
    })
  }

  onClick(index,data){
    this.cartItems.splice(index,1)
    this.data.removeFromCart(data).subscribe(data => {})
  }
}
