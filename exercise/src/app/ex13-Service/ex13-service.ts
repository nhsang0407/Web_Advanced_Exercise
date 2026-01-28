import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Ex13Service {
  productsImage=[
    {"ProductId":"p1","ProductName":"Coca","Price":100,"Image":"assets/h1.jpg"},
    {"ProductId":"p2","ProductName":"Pepsi","Price":300,"Image":"assets/h2.jpg"},
    {"ProductId":"p3","ProductName":"Sting","Price":200,"Image":"assets/h3.jpg"},
  ]
  constructor() { }
  getProductsWithImages()
  {
    return this.productsImage
  }
  getProductDetail(id:any)
  {
    return this.productsImage.find(x=>x.ProductId==id)
  }
}