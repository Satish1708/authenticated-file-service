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

1. Install dependencies <br>
npm install<br>
2. Create .env from example<br>
cp .env.example .env<br>
3.Start PostgreSQL and create schema<br>
4.Run the app<br>
npm start<br>
<br><br><br><br>
**Notes**
uploads/ is intentionally ignored
Storage backend can be swapped with S3 without changing routes
