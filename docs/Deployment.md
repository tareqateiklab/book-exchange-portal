# Deployment Documentation - Book Exchange Portal

## Overview
This document provides comprehensive instructions for deploying the Book Exchange Portal to Azure cloud services using GitHub Actions for continuous integration and deployment (CI/CD).

## Architecture
- **Frontend**: Angular application deployed to Azure Static Web Apps
- **Backend**: ASP.NET Core Web API deployed to Azure App Service (Linux)
- **Database**: Azure SQL Database
- **CI/CD**: GitHub Actions workflows for automated deployment

## Prerequisites
- Azure subscription with sufficient credits/resources
- GitHub repository with appropriate permissions
- .NET 8 SDK for local development
- Node.js and Angular CLI for frontend development

## Azure Resources Setup

### 1. Resource Group Creation
```bash
# Create resource group
az group create --name book-exchange-rg --location "East US"
```

### 2. Azure SQL Database Setup
```bash
# Create SQL Server
az sql server create \
  --name bookexchange-server-[your-initials] \
  --resource-group book-exchange-rg \
  --location "East US" \
  --admin-user bookadmin \
  --admin-password [secure-password]

# Create database
az sql db create \
  --resource-group book-exchange-rg \
  --server bookexchange-server-[your-initials] \
  --name bookexchange-db \
  --service-objective Basic
```

### 3. Azure App Service (API Backend)
```bash
# Create App Service Plan (Linux)
az appservice plan create \
  --name bookexchange-plan \
  --resource-group book-exchange-rg \
  --sku F1 \
  --is-linux

# Create Web App
az webapp create \
  --resource-group book-exchange-rg \
  --plan bookexchange-plan \
  --name bookexchange-api-[your-initials] \
  --runtime "DOTNETCORE:8.0"
```

## GitHub Actions Workflows

### Backend API Deployment Workflow
**File**: `.github/workflows/main_bookexchange-api-tareq.yml`

This workflow automatically deploys the ASP.NET Core API to Azure App Service when changes are pushed to the main branch.

**Key Features**:
- Triggers on push to `main` branch, specifically for changes in `src/BookExchange.API/`
- Builds .NET 8 application
- Publishes artifacts
- Deploys to Azure App Service using publish profile

**Workflow Steps**:
1. **Checkout Code**: Downloads repository content
2. **Setup .NET**: Configures .NET 8 SDK
3. **Restore Dependencies**: `dotnet restore`
4. **Build Application**: `dotnet build --configuration Release`
5. **Publish Application**: `dotnet publish --configuration Release --output ./publish`
6. **Deploy to Azure**: Uses Azure Web App Deploy action

### Frontend Deployment Workflow
**File**: `.github/workflows/azure-static-web-apps-wonderful-coast-09d80a11e.yml`

This workflow automatically deploys the Angular application to Azure Static Web Apps.

**Key Features**:
- Triggers on push to `main` branch for changes in `src/BookExchange.Web/`
- Builds Angular application with production configuration
- Deploys to Azure Static Web Apps

**Workflow Steps**:
1. **Checkout Code**: Downloads repository content
2. **Build and Deploy**: Uses Azure Static Web Apps Deploy action
   - **App Location**: `src/BookExchange.Web`
   - **Output Location**: `dist/book-exchange.web`
   - **Angular Build**: `ng build --configuration production`
