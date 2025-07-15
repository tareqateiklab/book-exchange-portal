import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BookService } from '../../services/book';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './edit-book.html',
  styleUrls: ['./edit-book.css']
})
export class EditBook implements OnInit {
  bookForm: FormGroup;
  categories: any[] = [];
  users: any[] = [];
  loading = false;
  submitting = false;
  bookId: string = '';
  book: any = null;

  conditionOptions = [
    { value: 'New', label: 'New' },
    { value: 'Like New', label: 'Like New' },
    { value: 'Very Good', label: 'Very Good' },
    { value: 'Good', label: 'Good' },
    { value: 'Acceptable', label: 'Acceptable' }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      price: ['', [Validators.required, Validators.min(0.01)]],
      condition: ['', Validators.required],
      isbn: [''],
      categoryId: ['', Validators.required],
      userId: ['', Validators.required],
      authorFirstName: ['', Validators.required],
      authorLastName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.bookId = params['id'];
      if (this.bookId) {
        this.loadBookAndFormData();
      }
    });
  }

  loadBookAndFormData(): void {
    this.loading = true;
    
    Promise.all([
      this.bookService.getBook(this.bookId).toPromise(),
      this.bookService.getCategories().toPromise(),
      this.bookService.getUsers().toPromise()
    ]).then(([book, categories, users]) => {
      this.book = book;
      this.categories = categories || [];
      this.users = users || [];
      
      // Populate form with existing book data
      if (book) {
        this.bookForm.patchValue({
          title: book.title,
          description: book.description || '',
          price: book.price,
          condition: book.condition,
          isbn: book.isbn || '',
          categoryId: book.categoryId,
          userId: book.sellerId || '',
          authorFirstName: book.authors && book.authors.length > 0 ? book.authors[0].firstName : '',
          authorLastName: book.authors && book.authors.length > 0 ? book.authors[0].lastName : ''
        });
      }
      
      this.loading = false;
    }).catch(error => {
      console.error('Error loading data:', error);
      this.snackBar.open('Error loading book data', 'Close', { duration: 3000 });
      this.loading = false;
      this.router.navigate(['/books']);
    });
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      this.submitting = true;
      const formValue = this.bookForm.value;

      const bookData = {
        id: this.bookId, // Include the book ID for PUT request
        title: formValue.title,
        description: formValue.description || '',
        price: parseFloat(formValue.price),
        condition: formValue.condition,
        isbn: formValue.isbn || '',
        categoryId: parseInt(formValue.categoryId),
        sellerId: formValue.userId,
        authors: [
          {
            id: this.book?.authors && this.book.authors.length > 0 ? this.book.authors[0].id : '',
            firstName: formValue.authorFirstName,
            lastName: formValue.authorLastName,
            bio: this.book?.authors && this.book.authors.length > 0 ? this.book.authors[0].bio : ''
          }
        ]
      };

      this.bookService.updateBook(this.bookId, bookData as any).subscribe({
        next: (response) => {
          console.log('Book updated successfully:', response);
          this.snackBar.open('Book updated successfully!', 'Close', { duration: 3000 });
          this.router.navigate(['/books', this.bookId]);
        },
        error: (error) => {
          console.error('Error updating book:', error);
          this.snackBar.open('Error updating book. Please try again.', 'Close', { duration: 5000 });
          this.submitting = false;
        }
      });
    } else {
      this.markFormGroupTouched();
      this.snackBar.open('Please fill in all required fields correctly', 'Close', { duration: 3000 });
    }
  }

  markFormGroupTouched(): void {
    Object.keys(this.bookForm.controls).forEach(key => {
      const control = this.bookForm.get(key);
      control?.markAsTouched();
    });
  }

  getErrorMessage(fieldName: string): string {
    const control = this.bookForm.get(fieldName);
    if (control?.hasError('required')) {
      return `${fieldName} is required`;
    }
    if (control?.hasError('minlength')) {
      return `${fieldName} must be at least ${control.errors?.['minlength'].requiredLength} characters`;
    }
    if (control?.hasError('min')) {
      return `${fieldName} must be greater than 0`;
    }
    return '';
  }

  onCancel(): void {
    this.router.navigate(['/books', this.bookId]);
  }
}