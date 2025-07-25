import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Book {
  id: string;
  title: string;
  isbn: string;
  price: number;
  condition: string;
  description: string;
  sellerId: string;
  categoryId: number;
  createdAt: Date;
  imageFileName?: string; // Add this line
  // Navigation properties
  seller?: User;
  category?: Category;
  authors?: Author[];
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  university: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface Author {
  id: string;
  firstName: string;
  lastName: string;
  bio: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Book operations
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/api/books`);
  }

  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/api/books/${id}`);
  }

  createBook(book: Partial<Book>): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/api/books`, book);
  }

  updateBook(id: string, book: Partial<Book>): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/api/books/${id}`, book);
  }

  deleteBook(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/books/${id}`);
  }

  createBookWithImage(formData: FormData): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/api/books`, formData);
  }

  // Category operations
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/api/categories`);
  }

  // User operations
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/api/users`);
  }
  searchBooks(searchTerm: string, categoryId?: number): Observable<Book[]> {
    let params = new HttpParams();
    
    if (searchTerm && searchTerm.trim()) {
      params = params.set('search', searchTerm.trim());
    }
    
    if (categoryId && categoryId > 0) {
      params = params.set('categoryId', categoryId.toString());
    }

    return this.http.get<Book[]>(`${this.apiUrl}/api/books/search`, { params });
}

}