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
**File**: `.github/workflows/api-deployment.yml`

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
**File**: `.github/workflows/azure-static-web-apps-[app-name].yml`

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

## Step-by-Step Deployment Guide

### Initial Setup (One-time)

#### 1. Azure App Service Configuration
1. Navigate to Azure Portal → App Services → `bookexchange-api-[initials]`
2. Go to **Configuration** → **Application Settings**
3. Add connection string:
   - **Name**: `DefaultConnection`
   - **Value**: `Server=tcp:bookexchange-server-[initials].database.windows.net,1433;Initial Catalog=bookexchange-db;Persist Security Info=False;User ID=bookadmin;Password=[password];MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;`
   - **Type**: SQLServer

#### 2. GitHub Actions Secrets Setup
1. Navigate to GitHub Repository → Settings → Secrets and Variables → Actions
2. Add required secrets:
   - `AZURE_WEBAPP_PUBLISH_PROFILE`: Download from Azure App Service → Get Publish Profile
   - `AZURE_STATIC_WEB_APPS_API_TOKEN`: Automatically created during Static Web App setup

### Continuous Deployment Process

#### Automatic Deployment Triggers
1. **Push to Main Branch**: Any commit to `main` branch triggers deployment
2. **Path-based Triggers**: 
   - API changes in `src/BookExchange.API/` → API deployment
   - Frontend changes in `src/BookExchange.Web/` → Frontend deployment

#### Manual Deployment Steps
If needed, deployments can be triggered manually:

1. **Re-run GitHub Actions**:
   - Go to GitHub → Actions tab
   - Select failed/desired workflow
   - Click "Re-run jobs"

2. **Manual Azure Deployment**:
   ```bash
   # API Deployment
   cd src/BookExchange.API
   dotnet publish --configuration Release
   # Deploy publish folder to Azure App Service

   # Frontend Deployment
   cd src/BookExchange.Web
   ng build --configuration production
   # Deploy dist/ folder to Azure Static Web Apps
   ```

## Environment Configuration

### Development Environment
**File**: `src/BookExchange.Web/src/environments/environment.ts`
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7001/api'
};
```

### Production Environment
**File**: `src/BookExchange.Web/src/environments/environment.prod.ts`
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://bookexchange-api-[initials].azurewebsites.net/api'
};
```

## Monitoring and Troubleshooting

### Deployment Status Verification
1. **GitHub Actions**: Check workflow status in Actions tab
2. **Azure App Service**: Monitor deployment logs in Deployment Center
3. **Live URLs**: Verify applications are accessible

### Common Issues and Solutions

#### API Deployment Issues
- **Connection String**: Verify Azure SQL connection string is correct
- **Firewall**: Ensure Azure SQL allows Azure services access
- **Build Errors**: Check .NET version compatibility

#### Frontend Deployment Issues
- **Build Path**: Verify `app_location` and `output_location` in workflow
- **API URL**: Confirm production environment points to correct API URL
- **Routing**: Ensure Angular routing is configured for SPA

### Logs and Monitoring
1. **Azure App Service Logs**: 
   - Enable Application Logging
   - View Log Stream for real-time monitoring
2. **GitHub Actions Logs**: Detailed build and deployment logs
3. **Browser Console**: Frontend error monitoring

## Live URLs
- **Frontend**: `https://[generated-name].azurestaticapps.net`
- **API**: `https://bookexchange-api-[initials].azurewebsites.net`
- **API Documentation**: `https://bookexchange-api-[initials].azurewebsites.net/swagger`

## Security Considerations
- Connection strings stored in Azure App Service configuration (not in code)
- GitHub secrets used for deployment credentials
- Azure SQL Database configured with firewall rules
- HTTPS enforced on all endpoints

## Performance Optimization
- **API**: Uses Entity Framework Core with async operations
- **Frontend**: Angular production build with optimization
- **Database**: Proper indexing on search fields
- **CDN**: Azure Static Web Apps includes global CDN

## Backup and Recovery
- **Database**: Azure SQL Database automatic backups enabled
- **Code**: Git repository serves as source code backup
- **Configuration**: Azure resources documented for recreation

This deployment setup provides a robust, automated CI/CD pipeline that follows cloud best practices and ensures reliable application delivery.