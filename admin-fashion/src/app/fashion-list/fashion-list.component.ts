import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FashionService, Fashion } from '../services/fashion.service';

@Component({
  selector: 'app-fashion-list',
  standalone: false,
  templateUrl: './fashion-list.component.html',
  styleUrls: ['./fashion-list.component.css']
})
export class FashionListComponent implements OnInit {
  fashions: Fashion[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private fashionService: FashionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadFashions();
  }

  loadFashions(): void {
    this.loading = true;
    this.errorMessage = '';
    
    this.fashionService.getAllFashions().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.fashions = response.data;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading fashions:', error);
        this.errorMessage = 'Failed to load fashions. Please try again.';
        this.loading = false;
      }
    });
  }

  viewDetail(id: string): void {
    this.router.navigate(['/fashion', id]);
  }

  editFashion(id: string): void {
    this.router.navigate(['/fashion/edit', id]);
  }

  deleteFashion(id: string, title: string): void {
    const confirmDelete = confirm(`Are you sure you want to delete "${title}"?`);
    
    if (confirmDelete && id) {
      this.fashionService.deleteFashion(id).subscribe({
        next: (response) => {
          if (response.success) {
            alert('Fashion deleted successfully!');
            this.loadFashions(); // Reload the list
          }
        },
        error: (error) => {
          console.error('Error deleting fashion:', error);
          alert('Failed to delete fashion. Please try again.');
        }
      });
    }
  }

  addNew(): void {
    this.router.navigate(['/fashion/new']);
  }

  formatDate(date: Date | undefined): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}
