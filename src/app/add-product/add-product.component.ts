import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  myForm: FormGroup;

  constructor(private fb: FormBuilder,private dataService : DataService) {}

  ngOnInit() {
  this.myForm = this.fb.group({
    title: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', [Validators.required, Validators.minLength(10)]],
    imageUrl: ['', Validators.required]
  });
}

onSubmit(form: FormGroup) {
  console.log(form);
  let product = {
    title:form.value.title,
    price:form.value.price,
    description:form.value.description,
    imageUrl:form.value.imageUrl
  }
  this.dataService.addProduct(product).subscribe((data) => {
    console.log('object');
  });
}

}
