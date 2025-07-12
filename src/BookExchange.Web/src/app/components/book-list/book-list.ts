import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService, Book } from '../../services/book';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookList implements OnInit {
  books: Book[] = [];
  loading = false;
  error = '';

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.loading = true;
    this.bookService.getBooks().subscribe({
      next: (books) => {
        this.books = books;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }
}