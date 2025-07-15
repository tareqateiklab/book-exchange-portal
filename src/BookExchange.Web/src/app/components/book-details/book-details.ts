import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { BookService } from '../../services/book';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDividerModule
  ],
  templateUrl: './book-details.html',
  styleUrls: ['./book-details.css']
})
export class BookDetails implements OnInit {
  public environment = environment;
  book: any = null;
  loading = true;
  error: string | null = null;
  bookId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.bookId = params['id'];
      if (this.bookId) {
        this.loadBookDetails();
      } else {
        this.error = 'No book ID provided';
        this.loading = false;
      }
    });
  }

  loadBookDetails(): void {
    this.loading = true;
    this.error = null;

    this.bookService.getBook(this.bookId).subscribe({
      next: (data) => {
        this.book = data;
        this.loading = false;
        console.log('Book details loaded:', data);
      },
      error: (err) => {
        this.error = 'Book not found or failed to load';
        this.loading = false;
        console.error('Error loading book details:', err);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/books']);
  }

editBook(): void {
  this.router.navigate(['/books', this.bookId, 'edit']);
}

  deleteBook(): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(this.bookId).subscribe({
        next: () => {
          this.snackBar.open('Book deleted successfully!', 'Close', { 
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.router.navigate(['/books']);
        },
        error: (err) => {
          console.error('Error deleting book:', err);
          this.snackBar.open('Error deleting book. Please try again.', 'Close', { 
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }

  contactSeller(): void {
    if (this.book?.user?.email) {
      // In a real app, this might open a contact form or messaging system
      this.snackBar.open(
        `Contact ${this.book.user.firstName} at ${this.book.user.email}`, 
        'Close', 
        { duration: 5000 }
      );
    } else {
      this.snackBar.open('Seller contact information not available', 'Close', { 
        duration: 3000 
      });
    }
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  }

  getAuthorsString(authors: any[]): string {
    if (!authors || authors.length === 0) {
      return 'Author not specified';
    }
    return authors.map(a => a.name).join(', ');
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'Date not available';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}