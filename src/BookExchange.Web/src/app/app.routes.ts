import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { BookList } from './components/book-list/book-list';
import { BookDetails } from './components/book-details/book-details';
import { AddBook } from './components/add-book/add-book';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'books', component: BookList },
  { path: 'books/:id', component: BookDetails },
  { path: 'add-book', component: AddBook },
  { path: '**', redirectTo: '' }
];