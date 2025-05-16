# Product Comparison Frontend

A React-based frontend application for managing product comparisons, built with TypeScript, Vite, and Material-UI.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

## Environment Setup

1. Create a `.env` file in the root directory with the following variables:

```env
# API Configuration
VITE_API_URL=http://localhost:3000
```

## Installation

1. Install dependencies:

```bash
npm install
```

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server with hot-reload
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint for code quality checks

## Project Structure

```
src/
├── lib/              # Core application code
│   ├── assets/       # Static assets (images, fonts, etc.)
│   ├── components/   # Reusable React components
│   ├── config/       # Configuration files
│   ├── entities/     # Type definitions and interfaces
│   ├── guards/       # Route guards and protection
│   ├── hooks/        # Custom React hooks
│   ├── providers/    # Context providers
│   └── utils.ts      # Utility functions
├── pages/            # Page components
├── main.tsx          # Application entry point
└── index.css         # Global styles
```
