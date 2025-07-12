# Book Exchange Portal - User Requirements Document

## Project Overview

**Project Name:** Book Exchange Portal  
**Duration:** 3 weeks  
**Technology Stack:** Angular 17+ Frontend, ASP.NET Core 8 Web API, Azure SQL Database  
**Deployment:** Azure Static Web Apps + Azure App Service  

## Problem Statement

College and university students face significant financial burden due to expensive textbooks, with limited budgets making it difficult to purchase required course materials. Traditional textbook sources often charge high prices for books that may only be used for one semester.

## Solution Overview

The Book Exchange Portal is a peer-to-peer marketplace that enables students to buy, sell, and exchange textbooks directly with other students. This platform reduces costs, promotes sustainability through book reuse, and creates a community-driven solution for textbook accessibility.

## Target Users

### Primary Users
- **College/University Students** (Ages 18-25)
  - Need: Affordable textbooks for courses
  - Budget: Limited financial resources
  - Tech Savvy: Comfortable with web applications
  - Location: Campus-based communities

### Secondary Users
- **Graduate Students** (Ages 22-30)
  - Need: Specialized academic books
  - Budget: Moderate financial resources
  - Usage: Research and coursework materials

## User Personas

### Persona 1: Sarah - Undergraduate Student
- **Age:** 20, Sophomore studying Business
- **Budget:** $200/semester for textbooks
- **Goals:** Find affordable textbooks, sell books after courses
- **Pain Points:** High textbook costs, limited buyback options
- **Technology:** Uses smartphone primarily, familiar with e-commerce

### Persona 2: Mike - Graduate Student
- **Age:** 24, Master's in Computer Science
- **Budget:** $300/semester for specialized books
- **Goals:** Find rare/specialized books, connect with academic community
- **Pain Points:** Hard-to-find technical books, expensive specialized materials
- **Technology:** Power user, prefers web applications

## Functional Requirements

### Core Features (MVP)

#### 1. Book Listing Management
- **Create Listings:** Users can add books for sale with details
  - Book title, author, ISBN, condition, price
  - Course/category association
  - Book description and photos
- **Edit Listings:** Modify existing book listings
- **Delete Listings:** Remove sold or unavailable books

#### 2. Book Discovery & Search
- **Browse Books:** View all available books in organized layout
- **Search Functionality:** Find books by title, author, ISBN, or course
- **Category Filtering:** Filter books by academic subject/department
- **Sort Options:** Sort by price, date added, condition

#### 3. Book Details & Information
- **Detailed View:** Complete book information display
- **Seller Information:** Contact details and seller profile
- **Book Condition:** Clear condition descriptions and standards
- **Pricing Information:** Transparent pricing display

#### 4. User Management
- **User Profiles:** Basic seller/buyer profiles
- **Contact Information:** Name, email, phone, location
- **Listing History:** Track books sold/purchased

### Advanced Features (Future Enhancements)

#### 1. Communication System
- **Messaging:** Direct communication between buyers and sellers
- **Contact Forms:** Simple inquiry system
- **Meeting Coordination:** Campus location suggestions

#### 2. Enhanced Discovery
- **Course-Based Recommendations:** Suggest books by course code
- **Price Comparison:** Compare with online retailer prices
- **Wishlist:** Save books for future purchase

#### 3. Community Features
- **User Ratings:** Seller/buyer rating system
- **Reviews:** Book condition reviews
- **Campus Integration:** University-specific marketplaces

## User Scenarios

### Scenario 1: Sarah Needs a Textbook
1. **Context:** Sarah needs "Introduction to Marketing" for her BUS 101 class
2. **Action:** Opens Book Exchange Portal, searches for book title
3. **Process:** Reviews available listings, compares prices and conditions
4. **Outcome:** Finds book in "Very Good" condition for $45 (retail $180)
5. **Next Steps:** Contacts seller through provided information

### Scenario 2: Mike Sells Completed Course Books
1. **Context:** Mike finished CS 580 and wants to sell "Advanced Algorithms"
2. **Action:** Creates new book listing with details
3. **Process:** Uploads book info, sets price, provides contact details
4. **Outcome:** Lists book for $85 (paid $140 new)
5. **Next Steps:** Receives inquiry from interested buyer

### Scenario 3: Course-Specific Book Search
1. **Context:** Student needs all books for "CHEM 201" course
2. **Action:** Uses category filter for "Chemistry" and course search
3. **Process:** Browses chemistry books, filters by course relevance
4. **Outcome:** Finds 3 of 4 required books from fellow students
5. **Next Steps:** Saves remaining book to wishlist

## Success Criteria

### User Experience Metrics
- **Easy Book Discovery:** Users can find relevant books within 30 seconds
- **Simple Listing Process:** Create book listing in under 3 minutes
- **Mobile Responsive:** Full functionality on mobile devices
- **Fast Load Times:** Pages load within 2 seconds

### Business Value Metrics
- **Cost Savings:** Average 60% savings compared to retail prices
- **Community Engagement:** Active listings from multiple users
- **Successful Transactions:** Demonstrated buyer-seller connections
- **Platform Growth:** Increasing number of books and users

## Technical Requirements

### Performance Requirements
- **Response Time:** Page loads < 2 seconds
- **Availability:** 99% uptime during academic terms
- **Scalability:** Support for 1000+ concurrent users
- **Mobile Support:** Responsive design for all screen sizes

### Security Requirements
- **Data Protection:** Secure handling of user contact information
- **Input Validation:** Prevent malicious input and SQL injection
- **HTTPS:** Encrypted communication for all transactions
- **Privacy:** User data protection and privacy controls

### Accessibility Requirements
- **WCAG Compliance:** Basic accessibility standards
- **Keyboard Navigation:** Full keyboard accessibility
- **Screen Reader Support:** Semantic HTML structure
- **Color Contrast:** Adequate contrast for readability

## Constraints & Assumptions

### Technical Constraints
- **Budget:** Limited to free/basic Azure tiers
- **Timeline:** 3-week development period
- **Team Size:** Single developer implementation
- **Technology Stack:** Must use Angular + ASP.NET Core + Azure

### Business Constraints
- **Legal:** No payment processing (contact-based transactions)
- **Liability:** Platform facilitates contact only, not transactions
- **Content:** User-generated content with basic moderation
- **Scale:** Academic proof-of-concept, not production scale

### User Assumptions
- **Technical Literacy:** Users comfortable with basic web applications
- **Trust:** Users willing to meet/contact other students
- **Campus Context:** Primary use within university communities
- **Academic Calendar:** Seasonal usage patterns (start/end of terms)

## Future Roadmap

### Phase 2 Features
- User authentication and login system
- Advanced messaging and communication tools
- Photo uploads for book condition verification
- Campus-specific marketplaces

### Phase 3 Features
- Mobile application development
- Integration with university course catalogs
- Payment processing and transaction management
- Advanced analytics and recommendation engine

---

**Document Version:** 1.0  
**Last Updated:** Day 6 of Development  
**Status:** Initial Requirements Complete