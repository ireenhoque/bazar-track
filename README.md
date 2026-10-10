
# Bazar Track

Bazar Track is a modern, responsive web application designed to make browsing products and managing user accounts simple and convenient. It provides a clean shopping experience with secure authentication and profile management.

## Technologies Used

- **Next.js 16** — React framework with App Router
- **TypeScript** — Type-safe application development
- **Tailwind CSS** — Responsive styling and UI design
- **Better Auth** — Authentication and account management
- **MongoDB Atlas** — Cloud database
- **Google OAuth** — Sign in with Google
- **GitHub OAuth** — Sign in with GitHub

## Key Features

1. **Product Browsing** — Browse product information through a clean, user-friendly interface.
2. **User Authentication** — Sign up and sign in using email and password.
3. **Social Login** — Authenticate with Google or GitHub.
4. **My Profile** — View your account information and registered name.
5. **Profile Update** — Update your name through a dedicated profile editing page.

## Getting Started

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd bazar-track
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root and configure your MongoDB connection, Better Auth secret, application URL, and OAuth credentials.

Never commit environment files containing secrets.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Status

Developed as a full-stack web development project using Next.js, TypeScript, MongoDB, and Better Auth.
