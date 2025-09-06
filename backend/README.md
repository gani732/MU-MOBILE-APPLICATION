# Mahindra Uni Connect Backend

## Setup Instructions

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Add your Firebase Admin SDK service account key as `service-account.json` in this directory (do **not** commit this file to version control).

4. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev`: Runs the server in development mode with hot reload.
- `npm run build`: Builds the TypeScript files.
- `npm start`: Runs the built server.

## Environment Variables

- `JWT_SECRET`: Secret key for JWT token signing. Default is "your_jwt_secret".

## API Endpoints

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login and receive JWT token.

Additional endpoints for users, assignments, announcements, and attendance are available and use Firestore for data storage.

## Notes

- The backend uses Express, TypeScript, and **Firebase Firestore** for all data storage. Previous Prisma/PostgreSQL/SQLite setup has been removed.
- Do **not** share your `service-account.json` file publicly. Add it to `.gitignore`.
- Update Firestore rules and indexes as needed (see `firestore.rules` and `firestore.indexes.json`).
- Make sure to have Node.js and npm installed.
