# Product Comparison Backend

A NestJS-based backend service for managing product comparisons, categories, and user authentication.

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- MongoDB (provided via Docker)

## Environment Setup

1. Create a `.env` file in the root directory with the following variables:

```env
# NestJS
PORT=3000

# MongoDB
MONGO_USERNAME=your_mongo_username
MONGO_PASSWORD=your_mongo_password
MONGO_DATABASE=comparathor
MONGO_HOST=localhost
MONGO_PORT=27017

# JWT
JWT_SECRET=your_jwt_secret

# Admin User
# ONLY NEEDED THE FIRST TIME
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin
```

## Docker Setup

1. Start MongoDB:

```bash
docker-compose up -d
```

2. Stop MongoDB:

```bash
docker-compose down
```

## Installation

1. Install dependencies:

```bash
npm install
```

2. Build the project:

```bash
npm run build
```

3. Run database migrations:

```bash
npm run migrate:up
```

## Running the Application

### Development Mode

```bash
npm run start:dev
```

### Production Mode

```bash
npm run start:prod
```

### Debug Mode

```bash
npm run start:debug
```

## API Documentation

The API documentation is available via Swagger UI at:

```
http://localhost:3000/docs
```

## Initial Admin Setup

The system automatically creates an admin user on first run with the credentials set on the environment:

- Username: `ADMIN_USERNAME`
- Password: `ADMIN_PASSWORD`

**Important**: Delete these credentials immediately after first startup.

## Available Scripts

- `npm run build` - Build the application
- `npm run start:dev` - Start in development mode with hot-reload
- `npm run start:prod` - Start in production mode
- `npm run start:debug` - Start in debug mode
- `npm run lint` - Run ESLint
- `npm run test` - Run unit tests **WIP**
- `npm run test:e2e` - Run end-to-end tests **WIP**
- `npm run migrate:up` - Run database migrations
- `npm run migrate:down` - Rollback database migrations
- `npm run migrate:new` - Create a new migration

## Project Structure

```
src/
├── apps/
│   └── rest/           # REST API implementation
└── context/            # Domain-driven design contexts
    ├── products/       # Products domain
    ├── categories/     # Categories domain
    ├── comparisons/    # Comparisons domain
    ├── users/          # Users domain
    └── shared/         # Shared domain code
```

## Testing

WIP
