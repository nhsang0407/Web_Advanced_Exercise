import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Ex13Service } from '../ex13-Service/ex13-service';

@Component({
  selector: 'app-ex13',
  standalone: false,
  templateUrl: './ex13.html',
  styleUrl: './ex13.css',
})
export class Ex13 {
  public products:any
  constructor(pservice: Ex13Service,private router:Router){
  this.products=pservice.getProductsWithImages()
  }
  viewDetail(f:any)
  {
  this.router.navigate(['ex13',f.ProductId])
}
}
