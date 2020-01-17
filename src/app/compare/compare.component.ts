import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {
  compareList : any = []
  constructor(private dataService : DataService , private http : HttpClient) { }

  ngOnInit() {

    this.dataService.getCompareList().subscribe(data => {
      this.compareList = data
    })
  }

}
