import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Material UI imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

import { BookService, Book, Category } from '../../services/book';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookList implements OnInit {
  books: Book[] = [];
  categories: Category[] = [];
  loading = false;
  error: string | null = null;
  
  // Search properties
  searchTerm = '';
  selectedCategoryId = 0;

  constructor(
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBooks();
    this.loadCategories();
  }

  loadBooks(): void {
    this.loading = true;
    this.error = null;
    
    this.bookService.getBooks().subscribe({
      next: (books) => {
        this.books = books;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load books. Please try again.';
        this.loading = false;
        console.error('Error loading books:', error);
      }
    });
  }

  loadCategories(): void {
    this.bookService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        // Don't show error for categories, just log it
      }
    });
  }

  onSearch(): void {
    this.loading = true;
    this.error = null;

    // If no search criteria, load all books
    if (!this.searchTerm.trim() && this.selectedCategoryId === 0) {
      this.loadBooks();
      return;
    }

    const categoryId = this.selectedCategoryId > 0 ? this.selectedCategoryId : undefined;
    
    this.bookService.searchBooks(this.searchTerm, categoryId).subscribe({
      next: (books) => {
        this.books = books;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Search failed. Please try again.';
        this.loading = false;
        console.error('Search error:', error);
      }
    });
  }

  onClear(): void {
    this.searchTerm = '';
    this.selectedCategoryId = 0;
    this.loadBooks();
  }

  viewBook(id: string): void {
    this.router.navigate(['/books', id]);
  }

  getAuthorName(book: Book): string {
    if (book.authors && book.authors.length > 0) {
      return `${book.authors[0].name}`;
    }
    return 'Unknown Author';
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  }
}