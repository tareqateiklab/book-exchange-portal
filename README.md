# Book Exchange Portal

A peer-to-peer marketplace for college students to buy, sell, and exchange textbooks.

## 🚀 Live Application

- **Frontend:** [https://wonderful-coast-09d80a11e.1.azurestaticapps.net/](https://wonderful-coast-09d80a11e.1.azurestaticapps.net/)
- **API:** [https://bookexchange-api-tareq-djacbqfpcbfxanh3.westus2-01.azurewebsites.net/swagger/index.html](https://bookexchange-api-tareq-djacbqfpcbfxanh3.westus2-01.azurewebsites.net/swagger/index.html)

## 📋 Project Overview

**Course:** ITMD 504 Programming and Application Foundations  
**Objective:** Build a complete full-stack web application with database integration

## 🛠️ Technology Stack

### Frontend
- **Framework:** Angular 17+ (Standalone Components)
- **UI Library:** Angular Material
- **Language:** TypeScript
- **Styling:** CSS3 with responsive design

### Backend
- **Framework:** ASP.NET Core 8 Web API
- **Language:** C#
- **Architecture:** RESTful API with JSON responses
- **ORM:** Entity Framework Core 8

### Database
- **Type:** Relational Database (Azure SQL Database)
- **Schema:** Normalized with proper relationships
- **Entities:** Books, Authors, Categories, Users

### DevOps & Deployment
- **Version Control:** GitHub
- **CI/CD:** GitHub Actions
- **Frontend Hosting:** Azure Static Web Apps
- **Backend Hosting:** Azure App Service
- **Database:** Azure SQL Database (Basic tier)

## 📊 Database Schema

### Core Entities
- **Books** - Book listings with details, pricing, and condition
- **Authors** - Author information (Many-to-Many with Books)
- **Categories** - Academic subject classifications
- **Users** - Seller/buyer profiles and contact information

### Relationships
- Books ↔ Authors (Many-to-Many)
- Categories → Books (One-to-Many)
- Users → Books (One-to-Many, as Sellers)

## 🎨 User Experience Design

The application interface was designed with user-centered principles, focusing on the needs of college students buying and selling textbooks.

### Design Process
- **User Research:** Identified target users (college students) and their pain points with expensive textbooks
- **User Journey Mapping:** Complete workflow from browsing to purchasing and selling
- **Wireframe Development:** Professional mockups created in Figma
- **Design System:** Angular Material for consistent, accessible UI components

### Key UX Features
- **Intuitive Navigation:** Clear, consistent header navigation across all pages
- **Efficient Search:** Quick book discovery with title and category filtering
- **Streamlined Listing:** Simple, form-based book submission process
- **Clear Information Hierarchy:** Easy-to-scan book cards with essential details
- **Direct Communication:** One-click seller contact functionality

**View Complete Design Documentation:** [docs/UXDesign.pdf](docs/UXDesign.pdf)

## 📈 Features

The Book Exchange Portal provides a complete solution for textbook trading:

- **Book Management:** Full CRUD operations for listing, editing, and managing book sales
- **Smart Search:** Search books by title or filter by academic category  
- **User Profiles:** Seller profiles with contact information for easy communication
- **Responsive Design:** Works seamlessly on desktop, tablet, and mobile devices

## 📁 Project Structure

```
book-exchange-portal/
├── .github/workflows/          # Automated deployment pipelines
├── src/
│   ├── BookExchange.API/       # ASP.NET Core Web API backend
│   │   ├── Controllers/        # API Controllers
│   │   ├── Models/            # Data Models
│   │   └── Data/              # DbContext & Migrations
│   └── BookExchange.Web/       # Angular frontend application
│       ├── src/app/
│       │   ├── components/     # Angular Components
│       │   ├── services/       # HTTP Services
│       │   └── utils/         # Utilities & Validators
├── docs/                       # Project documentation
└── database/                   # Database schema and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- .NET 8 SDK
- Visual Studio Code
- Azure CLI (for deployment)

### Local Development Setup

#### Backend (API)
```bash
cd src/BookExchange.API
dotnet restore
dotnet ef database update
dotnet run
```

#### Frontend (Angular)
```bash
cd src/BookExchange.Web
npm install
ng serve
```

### Environment Configuration
- Configure connection string in `src/BookExchange.API/appsettings.Development.json`

## 📋 Documentation

- **User Requirements:** [docs/UserRequirements.md](docs/UserRequirements.md)
- **Database Schema:** [docs/DatabaseSchema.md](docs/DatabaseSchema.md)
- **Deployment Guide:** [docs/Deployment.md](docs/Deployment.md)
- **UX Design & Wireframes:** [docs/UXDesign.pdf](docs/UXDesign.pdf)
- **API Documentation:** Available via Swagger UI at `/swagger`

## 🔗 Key URLs & Resources

- **GitHub Repository:** [https://github.com/tareqateiklab/book-exchange-portal](https://github.com/tareqateiklab/book-exchange-portal)
- **Live Frontend:** [Azure Static Web Apps](https://wonderful-coast-09d80a11e.1.azurestaticapps.net/)
- **Live API:** [Azure App Service](https://bookexchange-api-tareq-djacbqfpcbfxanh3.westus2-01.azurewebsites.net/swagger/index.html)

## 📈 Development Timeline

This project was developed progressively throughout the course, building from basic concepts to a full production application:

### Module 1-3: Foundation
- Project planning and requirements gathering
- Technology stack selection and setup
- Basic HTML, CSS, and JavaScript implementation

### Module 4-6: Backend Development  
- ASP.NET Core API development
- Database design and Entity Framework implementation
- RESTful endpoint creation and testing

### Module 7-8: Frontend Integration
- Angular application development
- Material UI component implementation
- API integration and data binding
- Search functionality and user interface polish

### Final Module: Deployment & Documentation
- Azure cloud deployment with CI/CD
- User experience design and wireframe creation
- Comprehensive testing and bug fixes
- Documentation completion and final submission

## 🎯 Course Requirements Met

### ✅ Multiple Frameworks
- Frontend: Angular 17+ with Material UI
- Backend: ASP.NET Core 8
- Database: SQL Server accessed using Entity Framework Core 8

### ✅ Database Integration
- Multiple related tables (Books, Authors, Categories, Users)
- Complete CRUD operations
- Proper relationships and constraints

### ✅ User Experience Design
- Professional wireframes and user journey documentation
- Figma-based design mockups
- Responsive, mobile-friendly interface
- Material Design component library

### ✅ Live Deployment
- Publicly accessible URLs
- Automated CI/CD pipeline through Github Actions
- Cloud hosting on Azure

### ✅ Source Control
- GitHub repository with commit history
- Proper project structure
- Comprehensive documentation

## 👨‍💻 Developer

**Name:** Tareq Ateik  
**Course:** ITMD 504 - Programming and Application Foundations  
**Instructor:** Raj Krishnan  
**Institution:** Illinois Institute of Technology

