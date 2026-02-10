import { Component, ChangeDetectorRef } from '@angular/core';
import { IBookManagement } from '../myclass/IBookManagement';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ex50-restful-api',
  standalone: false,
  templateUrl: './ex50-restful-api.html',
  styleUrl: './ex50-restful-api.css',
})
export class Ex50RestfulAPI {
  // Local storage for books - loaded from JSON file
  books: IBookManagement[] = [];
  
  selectedBook: IBookManagement | null = null;
  editingBook: IBookManagement | null = null;
  newBook: IBookManagement = { 
    BookId: '', 
    BookName: '', 
    Tensach: '',
    Price: 0, 
    Giaban: '',
    Image: '', 
    Mota: '', 
    Ngaycapnhat: '', 
    Soluongton: '', 
    MaCD: '', 
    MaNXB: '' 
  };
  showCreateForm: boolean = false;
  showEditForm: boolean = false;
  showDetails: boolean = false;
  errMessage: string = '';
  successMessage: string = '';
  uploadProgress: number = 0;
  selectedFileName: string = '';
  isServerAvailable: boolean = false;
  warningMessage: string = '';
  isLoading: boolean = false;

  constructor(private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef) {
    this.loadBooks();
  }

  loadBooks() {
    this.isLoading = true;
    // Try loading from server first, fallback to local JSON file
    this.http.get<IBookManagement[]>('http://localhost:3000/books').subscribe({
      next: (data) => {
        this.books = data;
        this.isServerAvailable = true;
        this.warningMessage = '';
        console.log('Loaded books from server');
        this.errMessage = '';
        this.isLoading = false;
        // Force change detection after loading
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('Server not available, loading from local JSON file...');
        this.isServerAvailable = false;
        this.warningMessage = '⚠️ Server not running. Viewing READ-ONLY mode. To add/edit/delete books, start the server: cd my-server && node index.js';
        // Fallback to local JSON file
        this.http.get<{books: IBookManagement[]}>('/assets/data/books-management.json').subscribe({
          next: (data) => {
            this.books = data.books;
            console.log('Loaded books from local JSON file');
            this.errMessage = '';
            this.isLoading = false;
            // Force change detection after loading
            this.cdr.detectChanges();
          },
          error: (jsonErr) => {
            console.error('Error loading books from JSON:', jsonErr);
            this.errMessage = 'Error loading books from both server and local file';
            this.isLoading = false;
            this.cdr.detectChanges();
          }
        });
      }
    });
  }

  showCreateNewForm() {
    if (!this.isServerAvailable) {
      alert('⚠️ Cannot create new book: Server is not running!\n\nPlease start the server first:\ncd my-server\nnode index.js');
      return;
    }
    this.showCreateForm = true;
    this.showEditForm = false;
    this.showDetails = false;
    // Generate next BookId
    const nextId = `BK${String(this.books.length + 1).padStart(3, '0')}`;
    this.newBook = { 
      BookId: nextId, 
      BookName: '', 
      Tensach: '',
      Price: 0, 
      Giaban: '',
      Image: '', 
      Mota: '', 
      Ngaycapnhat: new Date().toLocaleDateString('vi-VN'), 
      Soluongton: '0', 
      MaCD: '', 
      MaNXB: '' 
    };
    this.selectedFileName = '';
  }

  createBook() {
    if (!this.newBook.BookId || !this.newBook.BookName) {
      alert('Please fill required fields: BookId and BookName');
      return;
    }

    // Check if BookId already exists
    if (this.books.some(b => b.BookId === this.newBook.BookId)) {
      alert('BookId already exists! Please use a different BookId.');
      return;
    }

    // Auto-fill Giaban if Price is provided and Giaban is empty
    if (this.newBook.Price && !this.newBook.Giaban) {
      this.newBook.Giaban = `${this.newBook.Price.toLocaleString()} VNĐ`;
    }

    // Auto-fill Tensach if not provided
    if (!this.newBook.Tensach) {
      this.newBook.Tensach = this.newBook.BookName;
    }

    // Set default Soluongton if empty
    if (!this.newBook.Soluongton) {
      this.newBook.Soluongton = '0';
    }

    // Send to server
    this.http.post('http://localhost:3000/books', this.newBook).subscribe({
      next: (data) => {
        console.log('Book created successfully');
        this.showCreateForm = false;
        this.successMessage = `✅ Book "${this.newBook.BookName}" created successfully!`;
        this.errMessage = '';
        // Reload books from server
        this.loadBooks();
        // Force change detection
        this.cdr.detectChanges();
        this.clearSuccessMessage();
      },
      error: (err) => {
        this.errMessage = '❌ Error creating book: Server is not available. Please start the server first!';
        console.error(err);
        alert('❌ Failed to create book!\n\nServer is not running.\nPlease start the server:\ncd my-server\nnode index.js');
      }
    });
  }

  showEditBookForm(book: IBookManagement) {
    if (!this.isServerAvailable) {
      alert('⚠️ Cannot edit book: Server is not running!\n\nPlease start the server first:\ncd my-server\nnode index.js');
      return;
    }
    this.editingBook = { ...book };
    this.showEditForm = true;
    this.showCreateForm = false;
    this.showDetails = false;
    this.selectedFileName = book.Image || '';
  }

  updateBook() {
    if (!this.editingBook) return;

    // Auto-fill Giaban if Price is provided and Giaban is empty
    if (this.editingBook.Price && !this.editingBook.Giaban) {
      this.editingBook.Giaban = `${this.editingBook.Price.toLocaleString()} VNĐ`;
    }

    // Auto-fill Tensach if not provided
    if (!this.editingBook.Tensach) {
      this.editingBook.Tensach = this.editingBook.BookName;
    }

    // Set default Soluongton if empty
    if (!this.editingBook.Soluongton) {
      this.editingBook.Soluongton = '0';
    }

    // Send update to server
    this.http.put(`http://localhost:3000/books/${this.editingBook.BookId}`, this.editingBook).subscribe({
      next: (data) => {
        console.log('Book updated successfully');
        const bookName = this.editingBook?.BookName || 'Book';
        this.showEditForm = false;
        this.successMessage = `✅ Book "${bookName}" updated successfully!`;
        this.errMessage = '';
        // Reload books from server
        this.loadBooks();
        // Force change detection
        this.cdr.detectChanges();
        this.clearSuccessMessage();
      },
      error: (err) => {
        this.errMessage = '❌ Error updating book: Server is not available. Please start the server first!';
        console.error(err);
        alert('❌ Failed to update book!\n\nServer is not running.\nPlease start the server:\ncd my-server\nnode index.js');
      }
    });
  }

  showBookDetails(book: IBookManagement) {
    this.selectedBook = book;
    this.showDetails = true;
    this.showCreateForm = false;
    this.showEditForm = false;
  }

  deleteBook(bookId: string) {
    if (!this.isServerAvailable) {
      alert('⚠️ Cannot delete book: Server is not running!\n\nPlease start the server first:\ncd my-server\nnode index.js');
      return;
    }
    const book = this.books.find(b => b.BookId === bookId);
    const bookName = book ? book.BookName : bookId;
    
    if (confirm(`Are you sure you want to delete book "${bookName}"?`)) {
      this.http.delete(`http://localhost:3000/books/${bookId}`).subscribe({
        next: (data) => {
          console.log('Book deleted successfully');
          this.successMessage = `✅ Book "${bookName}" deleted successfully!`;
          // Remove book from local array immediately
          this.books = this.books.filter(b => b.BookId !== bookId);
          // Force change detection
          this.cdr.detectChanges();
          this.errMessage = '';
          this.clearSuccessMessage();
        },
        error: (err) => {
          this.errMessage = 'Error deleting book. Server might be unavailable.';
          console.error(err);
        }
      });
    }
  }

  onFileSelected(event: any, isEdit: boolean = false) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      this.uploadProgress = 0;
      
      // Upload to upload server (port 3001)
      const formData = new FormData();
      formData.append('image', file);
      
      this.http.post<{success: boolean, fileName: string, message: string, url: string}>('http://localhost:3001/upload', formData).subscribe({
        next: (response) => {
          // Use the URL from response
          const imageUrl = response.url;
          if (isEdit && this.editingBook) {
            this.editingBook.Image = imageUrl;
          } else {
            this.newBook.Image = imageUrl;
          }
          this.uploadProgress = 100;
          setTimeout(() => {
            this.uploadProgress = 0;
          }, 1000);
          console.log('Image uploaded successfully:', imageUrl);
        },
        error: (err) => {
          console.error('Error uploading to server, using base64 instead:', err);
          // Fallback to base64 if upload fails
          this.uploadAsBase64(file, isEdit);
        }
      });
    }
  }

  private uploadAsBase64(file: File, isEdit: boolean) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const imageUrl = e.target.result;
      if (isEdit && this.editingBook) {
        this.editingBook.Image = imageUrl;
      } else {
        this.newBook.Image = imageUrl;
      }
      this.uploadProgress = 100;
      setTimeout(() => {
        this.uploadProgress = 0;
      }, 500);
    };
    reader.readAsDataURL(file);
  }

  cancelForm() {
    this.showCreateForm = false;
    this.showEditForm = false;
    this.showDetails = false;
    this.uploadProgress = 0;
    this.selectedFileName = '';
  }

  getImageUrl(imageName: string): string {
    if (!imageName) return 'https://via.placeholder.com/150/CCCCCC/666666?text=No+Image';
    // Return URL directly (supports both placeholder URLs and base64 data URLs)
    return imageName;
  }

  handleImageError(event: any, imageName: string) {
    const img = event.target;
    // Fallback to default placeholder on error
    img.src = 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Error';
  }

  private clearSuccessMessage() {
    setTimeout(() => {
      this.successMessage = '';
    }, 5000); // Clear after 5 seconds
  }
}
