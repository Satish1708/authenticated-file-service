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
