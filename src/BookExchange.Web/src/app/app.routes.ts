import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { BookList } from './components/book-list/book-list';
import { BookDetails } from './components/book-details/book-details';
import { AddBook } from './components/add-book/add-book';
import { EditBook } from './components/edit-book/edit-book';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'books', component: BookList },
  { path: 'books/:id', component: BookDetails },
  { path: 'add-book', component: AddBook },
  { path: 'books/:id/edit', component: EditBook },
  { path: '**', redirectTo: '' }
];