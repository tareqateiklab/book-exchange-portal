import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BookService } from '../../services/book';

@Component({
  selector: 'app-add-book',
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
  templateUrl: './add-book.html',
  styleUrls: ['./add-book.css']
})
export class AddBook implements OnInit {
  bookForm: FormGroup;
  categories: any[] = [];
  users: any[] = [];
  loading = false;
  submitting = false;

  conditionOptions = [
    { value: 'New', label: 'New' },
    { value: 'Like New', label: 'Like New' },
    { value: 'Very Good', label: 'Very Good' },
    { value: 'Good', label: 'Good' },
    { value: 'Acceptable', label: 'Acceptable' }
  ];

  constructor(
    private fb: FormBuilder,
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
      authorName: ['', Validators.required] // Simplified - single author for now
    });
  }

  ngOnInit(): void {
    this.loadFormData();
  }

  loadFormData(): void {
    this.loading = true;
    
    // Load categories and users
    Promise.all([
      this.bookService.getCategories().toPromise(),
      this.bookService.getUsers().toPromise()
    ]).then(([categories, users]) => {
      this.categories = categories || [];
      this.users = users || [];
      this.loading = false;
    }).catch(error => {
      console.error('Error loading form data:', error);
      this.snackBar.open('Error loading form data', 'Close', { duration: 3000 });
      this.loading = false;
    });
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      this.submitting = true;
      const formValue = this.bookForm.value;

      // Create book object with proper structure for API
      const authorParts = formValue.authorName.trim().split(' ');
      const firstName = authorParts[0] || '';
      const lastName = authorParts.slice(1).join(' ') || '';

      const bookData = {
        title: formValue.title,
        description: formValue.description || '',
        price: parseFloat(formValue.price),
        condition: formValue.condition,
        isbn: formValue.isbn || '',
        categoryId: parseInt(formValue.categoryId),
        sellerId: formValue.userId,
        authors: [
          {
            firstName: firstName,
            lastName: lastName,
            bio: ''
          }
        ]
      };

      console.log('Submitting book data:', bookData);

      this.bookService.createBook(bookData as any).subscribe({
        next: (response) => {
          console.log('Book created successfully:', response);
          this.snackBar.open('Book added successfully!', 'Close', { 
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.router.navigate(['/books']);
        },
        error: (error) => {
          console.error('Error creating book:', error);
          this.snackBar.open('Error adding book. Please try again.', 'Close', { 
            duration: 5000,
            panelClass: ['error-snackbar']
          });
          this.submitting = false;
        }
      });
    } else {
      this.markFormGroupTouched();
      this.snackBar.open('Please fill in all required fields correctly', 'Close', { 
        duration: 3000 
      });
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
    this.router.navigate(['/books']);
  }
}