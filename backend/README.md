# Fastify + TypeScript Backend

A Node.js backend using **Fastify**, **TypeScript**, **PostgreSQL**, **AWS S3**, **AssemblyAI**, and **OpenAI** for transcription and form extraction.

---

## **Environment Variables**

### Local development

Create a `.env.local` file:

```env
NODE_ENV=local
PORT=3000
ORIGIN=<local frontend server or prod url>

# AssemblyAI API key
ASSEMBLYAI_API_KEY=

# PostgreSQL
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
POSTGRES_HOST=localhost
POSTGRES_PORT=5432

# AWS S3
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_BUCKET_NAME=

# OpenAI
OPENAI_API_KEY=
```

### Docker

Create a `.env.docker` file:

```env
NODE_ENV=docker
PORT=3000
ORIGIN=<local frontend server or prod url>

# AssemblyAI API key
ASSEMBLYAI_API_KEY=

# PostgreSQL
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
POSTGRES_HOST=postgres
POSTGRES_PORT=5432

# AWS S3
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_BUCKET_NAME=

# OpenAI
OPENAI_API_KEY=
```

---

## **Running Locally**

### **1. Install dependencies**

```bash
npm install
```

### **2. Run container for database**
```
docker compose -f docker-compose.local.yml up
```

### **3. Development server**

```bash
npm run dev
```

* Uses `.env.local` automatically.
* Server runs on `http://localhost:3000`.

## **Running in Docker**

### **1. Build & run services**

```bash
docker compose up --build
```

* Uses `.env.docker` for environment variables.
* Services:

  * **backend**: Fastify app on port `3000`.
  * **postgres**: Database.

### **2. Stop services**

```bash
docker compose down
```

---

## **Project Structure**

```
├─ src/                # TypeScript source files
    ├─ config/         # Configuration files
    ├─ controllers/    # Route handlers
    ├─ models/         # Database models
    ├─ routes/         # API routes
    ├─ services/       # Business logic
    └─ server.ts        # App entry point
├─ db/                 # SQL initialization scripts
├─ Dockerfile
├─ docker-compose.yml
├─ package.json
├─ .env.local
├─ .env.docker
└─ README.md
```

---

## **Scripts**

| Script               | Description                                                |
| -------------------- | ---------------------------------------------------------- |
| `npm run dev` | Start dev server using `.env.local`                        |
| `npm run lint`       | Lint TypeScript files                                      |

---

## **Environment Services**

* **PostgreSQL**: Stores patients, notes, and forms.
* **AWS S3**: Stores uploaded audio files.
* **AssemblyAI**: Transcribes audio files.
* **OpenAI**: Summarizes transcriptions and extracts form codes.
