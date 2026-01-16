# Authenticated File Service

A backend service that supports:
- JWT-based authentication
- User-scoped file upload
- Metadata persistence in PostgreSQL
- Secure file listing and download
- Storage abstraction (local disk → S3 ready)

## Tech Stack
- Node.js (Express)
- PostgreSQL
- JWT authentication
- Multer (file uploads)

## Running Locally

1. Install dependencies
```bash
npm install
2. Create .env from example
```bash
cp .env.example .env
3.Start PostgreSQL and create schema
4.Run the app
```bash
npm start

##**Notes**
uploads/ is intentionally ignored
Storage backend can be swapped with S3 without changing routes
