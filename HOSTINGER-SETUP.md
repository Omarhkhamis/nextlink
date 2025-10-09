# Hostinger PostgreSQL Database Setup

This application has been successfully migrated from Supabase to your Hostinger PostgreSQL database.

## Database Connection Details

The application is configured to connect to your Hostinger PostgreSQL database with the following settings:

- **Host:** 77.37.125.44
- **Port:** 5432
- **Database:** nextlink
- **User:** nextlink_user
- **Password:** W4mFF)u.z8r4&

These credentials are stored in the `.env` file.

## Required Database Table

Before using the application, you need to create the `admin_users` table in your Hostinger PostgreSQL database. Run the SQL script in `database-setup.sql`:

```sql
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
```

## Existing Tables

The following tables should already exist in your Hostinger database:

- `projects` - Portfolio projects
- `services` - Service offerings
- `team_members` - Team member information

## Authentication System

The application now uses **NextAuth.js** for authentication instead of Supabase Auth.

### How to Create Your First Admin Account

1. Visit `http://localhost:3000/admin/signup`
2. Enter your email and password
3. Click "Create Admin Account"
4. You'll be redirected to the login page
5. Log in with your credentials

### Login

- Visit `http://localhost:3000/admin`
- Enter your email and password
- Access the admin dashboard

## Environment Variables

The `.env` file contains all necessary configuration:

```
DATABASE_HOST=77.37.125.44
DATABASE_PORT=5432
DATABASE_NAME=nextlink
DATABASE_USER=nextlink_user
DATABASE_PASSWORD=W4mFF)u.z8r4&
DATABASE_URL=postgresql://nextlink_user:W4mFF)u.z8r4&@77.37.125.44:5432/nextlink

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-change-this-in-production
```

**Important:** Change `NEXTAUTH_SECRET` to a secure random string in production. You can generate one with:

```bash
openssl rand -base64 32
```

## What Changed

1. **Removed Supabase:** All Supabase dependencies and files have been removed
2. **Added PostgreSQL:** Direct PostgreSQL connection using the `pg` library
3. **NextAuth.js:** Replaced Supabase Auth with NextAuth.js for authentication
4. **API Routes:** All API routes now use direct PostgreSQL queries
5. **No Edge Functions:** Edge Functions are specific to Supabase and have been removed

## Running the Application

1. Make sure the `admin_users` table is created in your database
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Visit `http://localhost:3000`

## Admin Dashboard Features

- **Projects Management:** Create, edit, and delete portfolio projects
- **Services Management:** Manage service offerings
- **Team Management:** Add and manage team members
- All data is stored in your Hostinger PostgreSQL database

## Security Notes

- Passwords are hashed using bcryptjs before storing
- Session management is handled by NextAuth.js with JWT tokens
- All API routes are accessible only through the application
- Remember to use HTTPS in production

## Troubleshooting

If you encounter connection issues:

1. Verify the database credentials in `.env`
2. Ensure your Hostinger database allows connections from your IP
3. Check that all required tables exist in the database
4. Verify the `admin_users` table has been created

## Support

For any issues with the database connection or setup, contact your database administrator or Hostinger support.
