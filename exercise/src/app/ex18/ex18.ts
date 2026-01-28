import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Customer {
  Id: string;
  Name: string;
  Email: string;
  Age: number;
  Image: string;
}

interface CustomerType {
  CustomerTypeId: number;
  CustomerTypeName: string;
  Customers: Customer[];
}

@Component({
  selector: 'app-ex18',
  standalone: false,
  templateUrl: './ex18.html',
  styleUrl: './ex18.css',
})
export class Ex18 implements OnInit {
  customerTypes: CustomerType[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('Ex18 ngOnInit called');
    this.http.get<CustomerType[]>('/assets/data/customers.json').subscribe({
      next: (data) => {
        console.log('Data loaded:', data);
        this.customerTypes = data;
      },
      error: (err) => {
        console.error('Error loading customer data:', err);
      }
    });
  }
}
