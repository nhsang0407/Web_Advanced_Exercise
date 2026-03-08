import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FashionService, Fashion } from '../services/fashion.service';

@Component({
  selector: 'app-fashion-form',
  standalone: false,
  templateUrl: './fashion-form.component.html',
  styleUrls: ['./fashion-form.component.css']
})
export class FashionFormComponent implements OnInit {
  fashion: Fashion = {
    title: '',
    details: '',
    thumbnail: '',
    style: 'Casual'
  };
  
  isEditMode = false;
  fashionId: string | null = null;
  loading = false;
  submitting = false;
  errorMessage = '';

  styles = ['Casual', 'Streetwear', 'Formal'];

  constructor(
    private fashionService: FashionService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.fashionId = params.get('id');
      if (this.fashionId && this.fashionId !== 'new') {
        this.isEditMode = true;
        this.loadFashion(this.fashionId);
      }
    });
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

  onSubmit(): void {
    if (!this.validateForm()) {
      return;
    }

    this.submitting = true;
    this.errorMessage = '';

    if (this.isEditMode && this.fashionId) {
      // Update existing fashion
      this.fashionService.updateFashion(this.fashionId, this.fashion).subscribe({
        next: (response) => {
          if (response.success) {
            alert('Fashion updated successfully!');
            this.router.navigate(['/']);
          }
          this.submitting = false;
        },
        error: (error) => {
          console.error('Error updating fashion:', error);
          this.errorMessage = 'Failed to update fashion. Please try again.';
          this.submitting = false;
        }
      });
    } else {
      // Create new fashion
      this.fashionService.createFashion(this.fashion).subscribe({
        next: (response) => {
          if (response.success) {
            alert('Fashion created successfully!');
            this.router.navigate(['/']);
          }
          this.submitting = false;
        },
        error: (error) => {
          console.error('Error creating fashion:', error);
          this.errorMessage = 'Failed to create fashion. Please try again.';
          this.submitting = false;
        }
      });
    }
  }

  validateForm(): boolean {
    if (!this.fashion.title.trim()) {
      alert('Please enter a title');
      return false;
    }
    if (!this.fashion.thumbnail.trim()) {
      alert('Please enter a thumbnail URL');
      return false;
    }
    if (!this.fashion.details.trim()) {
      alert('Please enter details');
      return false;
    }
    return true;
  }

  cancel(): void {
    if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      this.router.navigate(['/']);
    }
  }
}
