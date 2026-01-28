import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ex13Service } from '../ex13-Service/ex13-service';

@Component({
  selector: 'app-ex13-detail',
  standalone: false,
  templateUrl: './ex13-detail.html',
  styleUrl: './ex13-detail.css',
})
export class Ex13Detail {
  selectedProduct: any;
  
  // Dùng Router để điều hướng
  // Dùng ActivatedRoute để nhận điều hướng
  constructor(
    private router: Router, 
    private activeRoute: ActivatedRoute,
    private service: Ex13Service
  ) {
    activeRoute.params.subscribe((params) => {
      let id = params['id'];
      this.selectedProduct = this.service.getProductDetail(id);
    });
  }
  
  goBack() {
    this.router.navigate(['/ex13']);
  }
}
