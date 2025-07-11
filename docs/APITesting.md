# API Testing Guide

## Overview
This document provides step-by-step instructions for testing the Book Exchange Portal API endpoints.

## Prerequisites
- API running locally: `dotnet run` from `src/BookExchange.API/`
- Default URL: `https://localhost:7xxx` or `http://localhost:5xxx`
- Testing tool: Postman, Thunder Client, or curl

## Testing Workflow

### 1. Create User (Required First)
**Endpoint:** `POST /api/users`
**Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "555-1234"
}
```

**Expected Response:**
```json
{
  "id": "5e4c8172-571e-4326-316f-08ddc06cb5f2",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "555-1234",
  "createdAt": "2025-07-11T11:30:00.000Z",
  "books": []
}
```

### 2. Create Category
**Endpoint:** `POST /api/categories`
**Body:**
```json
{
  "name": "Computer Science",
  "description": "Programming and CS textbooks"
}
```

**Expected Response:**
```json
{
  "id": 1,
  "name": "Computer Science",
  "description": "Programming and CS textbooks",
  "books": []
}
```

### 3. Create Book
**Endpoint:** `POST /api/books`
**Body:** (use actual IDs from previous responses)
```json
{
  "title": "Introduction to Programming",
  "isbn": "9781234567890",
  "price": 45.99,
  "description": "Great programming textbook",
  "sellerId": "5e4c8172-571e-4326-316f-08ddc06cb5f2",
  "categoryId": 1
}
```

**Expected Response:**
```json
{
  "id": "5db58c48-7941-4c7e-5cdc-08ddc06eb95a",
  "title": "Introduction to Programming",
  "authors": [],
  "isbn": "9781234567890",
  "price": 45.99,
  "description": "Great programming textbook",
  "sellerId": "5e4c8172-571e-4326-316f-08ddc06cb5f2",
  "seller": null,
  "datePosted": "2025-07-11T11:33:13.5986916Z",
  "categoryId": 1,
  "category": null
}
```

## Additional Endpoints

### Get All Resources
- `GET /api/users` - List all users
- `GET /api/categories` - List all categories  
- `GET /api/books` - List all books (with full navigation properties)

### Get Single Resource
- `GET /api/users/{id}` - Get user by ID
- `GET /api/categories/{id}` - Get category by ID
- `GET /api/books/{id}` - Get book by ID (with full navigation properties)

### Update Resources
- `PUT /api/users/{id}` - Update user
- `PUT /api/categories/{id}` - Update category
- `PUT /api/books/{id}` - Update book

### Delete Resources
- `DELETE /api/users/{id}` - Delete user
- `DELETE /api/categories/{id}` - Delete category
- `DELETE /api/books/{id}` - Delete book

## Important Notes

1. **Foreign Key Dependencies**: Always create Users and Categories before creating Books
2. **Navigation Properties**: POST responses may show `null` for navigation properties - use GET to see full relationships
3. **GUID vs Int IDs**: Users and Books use GUID, Categories use integer IDs
4. **Required Fields**: All `required` properties must be provided in requests

## Sample Data for Quick Testing

### Additional Users
```json
{
  "firstName": "Jane",
  "lastName": "Smith", 
  "email": "jane@example.com",
  "phone": "555-5678"
}
```

### Additional Categories
```json
{
  "name": "Mathematics",
  "description": "Math and statistics textbooks"
}
```

```json
{
  "name": "Physics", 
  "description": "Physics and engineering books"
}
```