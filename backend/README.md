# 📋 Task Manager — DevOps Practice Application

A simple 3-tier **Task Manager** application built for learning DevOps concepts including Docker, CI/CD, and cloud databases.

---

## 🏗️ Architecture

This project follows a **3-tier architecture**:

```
┌─────────────────────────────────────────────────────────┐
│                     USERS (Browser)                     │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│  TIER 1: FRONTEND (React + Vite)                        │
│  - Served by nginx in production                        │
│  - Runs on port 3000 (Docker) or 5173 (dev)             │
│  - Makes API calls to backend                           │
└─────────────────────┬───────────────────────────────────┘
                      │ HTTP (REST API)
┌─────────────────────▼───────────────────────────────────┐
│  TIER 2: BACKEND (Node.js + Express)                    │
│  - REST API server                                      │
│  - Runs on port 5000                                    │
│  - Routes → Controllers → Services                     │
└─────────────────────┬───────────────────────────────────┘
                      │ HTTPS (Supabase Client)
┌─────────────────────▼───────────────────────────────────┐
│  TIER 3: DATABASE (Supabase / PostgreSQL)               │
│  - Hosted PostgreSQL database                           │
│  - Managed by Supabase (free tier available)             │
│  - Table: tasks (id, title, created_at)                 │
└─────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
project-root/
├── frontend/                    # React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx     # Form to add tasks
│   │   │   └── TaskList.jsx     # Display task list
│   │   ├── services/
│   │   │   └── api.js           # Axios API calls
│   │   ├── App.jsx              # Main component
│   │   ├── App.css              # Styles
│   │   └── main.jsx             # Entry point
│   ├── .env.example             # Environment template
│   ├── .env.development         # Dev environment
│   ├── .env.production          # Prod environment
│   ├── Dockerfile               # Multi-stage build
│   ├── nginx.conf               # nginx configuration
│   └── package.json
│
├── backend/                     # Node.js API
│   ├── src/
│   │   ├── config/
│   │   │   └── supabaseClient.js  # Supabase connection
│   │   ├── controllers/
│   │   │   └── taskController.js  # Request handlers
│   │   ├── routes/
│   │   │   └── taskRoutes.js      # URL routes
│   │   ├── services/
│   │   │   └── taskService.js     # Business logic
│   │   ├── app.js                 # Express config
│   │   └── server.js              # Entry point
│   ├── tests/
│   │   └── app.test.js            # Basic tests
│   ├── .env.example               # Environment template
│   ├── .env.development           # Dev environment
│   ├── .env.production            # Prod environment
│   ├── Dockerfile                 # Production image
│   └── package.json
│
├── docker-compose.yml           # Run all services
├── Jenkinsfile                  # CI/CD pipeline
├── .env.example                 # Root env template
└── README.md                    # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or later)
- **npm** (comes with Node.js)
- **Docker** and **Docker Compose** (for containerized deployment)
- A **Supabase** account (free tier: [supabase.com](https://supabase.com))

---

### Step 1: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to the **SQL Editor** and run this query to create the tasks table:

```sql
CREATE TABLE tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Allow all operations (for learning purposes)
CREATE POLICY "Allow all" ON tasks FOR ALL USING (true);
```

4. Go to **Settings → API** and copy:
   - **Project URL** → This is your `SUPABASE_URL`
   - **anon public key** → This is your `SUPABASE_KEY`

---

### Step 2: Configure Environment Variables

#### Backend
```bash
cd backend
cp .env.example .env.development
```
Edit `backend/.env.development` and add your Supabase credentials:
```
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=your-anon-key-here
PORT=5000
NODE_ENV=development
```

#### Frontend
The frontend `.env.development` is pre-configured to point to `http://localhost:5000/api`.

---

### Step 3: Run Locally (Without Docker)

#### Start the Backend
```bash
cd backend
npm install
npm run dev
```
The API will be available at `http://localhost:5000/api`

Test the health endpoint:
```bash
curl http://localhost:5000/health
```

#### Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
The app will open at `http://localhost:5173`

---

## 🐳 Running with Docker

### Step 1: Create Root `.env` File
```bash
# From the project root
cp .env.example .env
```
Edit `.env` and add your Supabase credentials:
```
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=your-anon-key-here
```

### Step 2: Build and Run
```bash
docker-compose up --build
```

### Step 3: Access the App
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api/tasks
- **Health Check**: http://localhost:5000/health

### Stop the App
```bash
docker-compose down
```

---

## ⚙️ Environment Variables

| Variable | Location | Description |
|---|---|---|
| `SUPABASE_URL` | Backend | Your Supabase project URL |
| `SUPABASE_KEY` | Backend | Your Supabase anon/public key |
| `PORT` | Backend | Server port (default: 5000) |
| `NODE_ENV` | Backend | Environment: development/production |
| `VITE_API_URL` | Frontend | Backend API URL |

### How Environment Files Work

- **`.env.example`** — Template showing required variables (commit this)
- **`.env.development`** — Used during local development (don't commit)
- **`.env.production`** — Used in production (don't commit)
- **Root `.env`** — Used by `docker-compose` (don't commit)

---

## 🔁 Jenkins Pipeline

The `Jenkinsfile` defines a 7-stage CI/CD pipeline:

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ Checkout │───▶│ Install  │───▶│  Test    │───▶│  Build   │
│          │    │   Deps   │    │          │    │  Docker  │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
                                                     │
┌──────────┐    ┌──────────┐    ┌──────────┐         │
│  Deploy  │◀───│  Push to │◀───│   Tag    │◀────────┘
│          │    │ DockerHub│    │  Images  │
└──────────┘    └──────────┘    └──────────┘
```

### Pipeline Stages

| Stage | Description |
|---|---|
| **1. Checkout** | Pulls latest code from Git |
| **2. Install Dependencies** | Runs `npm ci` for frontend and backend (parallel) |
| **3. Run Tests** | Executes tests for both services (parallel) |
| **4. Build Docker Images** | Builds frontend and backend images (parallel) |
| **5. Tag Images** | Tags images with build number and `latest` |
| **6. Push to Docker Hub** | Pushes images to your Docker Hub registry |
| **7. Deploy** | Runs `docker-compose up -d` on the server |

### Jenkins Setup Required

1. **Docker Hub Credentials**: Add credentials in Jenkins with ID `docker-hub-credentials`
2. **Supabase Credentials**: Add as Jenkins secret text:
   - ID: `supabase-url` → Your Supabase URL
   - ID: `supabase-key` → Your Supabase key
3. Update `DOCKER_HUB_USERNAME` in the Jenkinsfile with your username

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Health check (status + timestamp) |
| `GET` | `/api/tasks` | Get all tasks |
| `POST` | `/api/tasks` | Create a task (`{ "title": "..." }`) |
| `DELETE` | `/api/tasks/:id` | Delete a task by UUID |

### Example API Calls

```bash
# Health check
curl http://localhost:5000/health

# Get all tasks
curl http://localhost:5000/api/tasks

# Create a task
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Docker"}'

# Delete a task
curl -X DELETE http://localhost:5000/api/tasks/<task-uuid>
```

---

## 🧠 Key Concepts for DevOps Learners

### Docker Multi-Stage Builds
The frontend Dockerfile uses **two stages**:
1. **Build stage**: Uses Node.js to compile React
2. **Serve stage**: Uses nginx to serve the built files

This keeps the final image small (~25MB instead of ~1GB).

### Service Communication in Docker
- Frontend nginx **proxies** `/api` requests to the backend
- Services communicate via Docker's internal network using **service names** (e.g., `http://backend:5000`)
- Only exposed ports are accessible from outside

### Environment Variable Flow
```
Jenkins Credentials
    ↓
docker-compose.yml (uses ${VARIABLE} syntax)
    ↓
Container environment
    ↓
process.env.VARIABLE (Node.js reads it)
```

---

## 🛠️ Troubleshooting

| Problem | Solution |
|---|---|
| "Failed to load tasks" | Check if backend is running and Supabase credentials are correct |
| CORS errors | Backend has CORS enabled; make sure API URL is correct |
| Docker build fails | Make sure Docker daemon is running |
| Can't connect to Supabase | Verify URL and key in `.env` files |

---

## 📄 License

This project is for educational purposes. Use it freely for learning DevOps!
