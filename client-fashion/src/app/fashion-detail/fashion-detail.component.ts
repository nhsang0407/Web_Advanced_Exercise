import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FashionService, Fashion } from '../services/fashion.service';

@Component({
  selector: 'app-fashion-detail',
  standalone: false,
  templateUrl: './fashion-detail.component.html',
  styleUrls: ['./fashion-detail.component.css']
})
export class FashionDetailComponent implements OnInit {
  fashion: Fashion | null = null;
  loading = false;
  errorMessage = '';

  constructor(
    private fashionService: FashionService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadFashion(id);
    }
  }

  loadFashion(id: string): void {
    this.loading = true;
    this.errorMessage = '';
    
    this.fashionService.getFashionById(id).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.fashion = response.data;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading fashion:', error);
        this.errorMessage = 'Failed to load fashion details.';
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  filterByStyle(style: string): void {
    this.router.navigate(['/'], { queryParams: { style } });
  }
}
