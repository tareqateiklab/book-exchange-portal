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
  // Navigation properties
  seller?: User;
  category?: Category;
  authors?: Author[];
}

export interface User {
  id: string;
  name: string;
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
  name: string;
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
    return this.http.get<Book[]>(`${this.apiUrl}/books`);
  }

  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/books/${id}`);
  }

  createBook(book: Partial<Book>): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/books`, book);
  }

  updateBook(id: string, book: Partial<Book>): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/books/${id}`, book);
  }

  deleteBook(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/books/${id}`);
  }

  // Category operations
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  // User operations
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }
  searchBooks(searchTerm: string, categoryId?: number): Observable<Book[]> {
    let params = new HttpParams();
    
    if (searchTerm && searchTerm.trim()) {
      params = params.set('search', searchTerm.trim());
    }
    
    if (categoryId && categoryId > 0) {
      params = params.set('categoryId', categoryId.toString());
    }

    return this.http.get<Book[]>(`${this.apiUrl}/books/search`, { params });
}

}