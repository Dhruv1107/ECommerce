import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CartDataService } from '../cart-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CompareComponent } from '../compare/compare.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dataList ;
  compareArray = [];
  indexArray = [];
  constructor(private data : DataService, private cart : CartDataService , private snackBar : MatSnackBar, private dialog : MatDialog, private router:Router) { }

  ngOnInit() {
   this.data.getDataList().subscribe(data => {
     console.log(data);
     this.dataList = data
   })
  }

  onClick(data , i){
    this.data.addToCart(this.dataList[i]).subscribe((data) => {
        this.router.navigate(['/cart'])
    })
  }

  openSnackBar(message,action){

    this.data.addToCompare(action).subscribe(data => {})
    let snackBarRef =  this.snackBar.open(message,this.compareArray.length.toString(), {
    })
    snackBarRef.onAction().subscribe(() => {
     let dialogRef = this.dialog.open(CompareComponent, {
       width : '75vw',
       height : '80vh',
     })
    })
  }
  

}
