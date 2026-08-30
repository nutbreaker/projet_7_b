# Abricot.co

![Abricot.co logo](/frontend/public/assets/logo-orange.svg)

Abricot.co is an innovative SaaS project management tool to optimize freelancers' workflows.

## Tech Stack

- **Frontend:** Next.js 16, React 19, TypeScript, CSS
- **Backend:** Node.js, Express, TypeScript, Prisma ORM, SQLite, JWT Authentication, Swagger / OpenAPI
- **DevOps & Tooling:** Docker, Docker Compose, Git Submodules

## Prerequisites

Before running the project locally, ensure you have the following installed:

- **Node.js** (v20+ or v24 recommended)
- **npm** (or yarn / pnpm)
- **Git**
- **Docker & Docker Compose** (optional, for containerized execution)

## Quick Start

### 1. Clone the repository

Clone the repository along with its backend submodule:

```bash
git clone --recurse-submodules git@github.com:nutbreaker/projet_7_b.git
cd projet_7_b
```

> If you have already cloned the repository without the `--recurse-submodules` flag, initialize submodules with:
>
> ```bash
> git submodule update --init --recursive
> ```

---

### 2. Running with Docker Compose

You can build and run the entire stack (both frontend and backend) in a single container using Docker Compose:

```bash
docker compose up --build
```

- Access the application at: `http://localhost:8081`
- To stop the containers:
  
  ```bash
  docker compose down
  ```

---

### 3. Demo Credentials

After running the seed script (automatically executed in Docker or via `npm run seed` locally), you can log in with any of the seeded accounts:

- **Email:** `alice@example.com` (Owner / Admin) or `bob@example.com`
- **Password:** `P@ssword123`

---

### 4. Local Development Setup

#### A. Backend Setup

1. Open the backend directory:

   ```bash
   cd backend
   ```

2. Copy the environment configuration file:

   ```bash
   cp .env.example .env
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Initialize the Prisma database and run migrations / seed:

   ```bash
   npm run db:generate
   npm run db:push
   npm run seed
   ```

5. Start the backend development server:

   ```bash
   npm run dev
   ```

   The backend API will run at `http://localhost:8000` (interactive documentation at `http://localhost:8000/api-docs`).

#### B. Frontend Setup

1. Open a new terminal and open the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm run dev
   ```

   The frontend application will be available at `http://localhost:3000`.

## Project Architecture

```text
projet_7_b/
├── backend/                  # Node.js + Express REST API (Git submodule)
│   ├── prisma/               # Prisma schema & SQLite database
│   ├── scripts/              # Database seed script
│   └── src/                  # API controllers, routes, and middlewares
├── frontend/                 # Next.js frontend application
│   ├── app/                  # Next.js App Router pages, layouts, and proxy
│   ├── components/           # Reusable React UI components
│   ├── contexts/             # React contexts
│   ├── hooks/                # Custom React hooks
│   ├── services/             # API client & HTTP service functions
│   ├── types/                # TypeScript type definitions
│   └── utils/                # Utility and formatting functions
├── docker-compose.yml        # Docker Compose configuration
└── Dockerfile                # Multi-service Docker
```

## Useful Commands

### Database Management (Prisma Studio)

To inspect and manage the database via Prisma Studio:

```bash
cd backend
npx prisma studio
```

Prisma Studio will be accessible at `http://localhost:5555`.

### Clean up Docker Images

To remove the project's Docker images and volumes:

```bash
docker compose down -v # stop the container and remove the volume
docker rmi abricot:latest # remove the image
```
