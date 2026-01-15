import { Component } from '@angular/core';
import { Catalogservice } from '../catalogservice';

@Component({
  selector: 'app-ex14-catalog-service',
  standalone: false,
  templateUrl: './ex14-catalog-service.html',
  styleUrl: './ex14-catalog-service.css',
})
export class Ex14CatalogService {
  categories: any[] = [];

  constructor(private catalogService: Catalogservice) {
    this.categories = this.catalogService.getCategories();
  }
}
