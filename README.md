# Research Connect AI

A full-stack web application that helps students discover and connect with university professors for research opportunities. Search any university and field of study — GPT identifies relevant professors, OpenAlex enriches their profiles with real publications, and an AI email drafter helps you craft personalized outreach.

**Live site:** [researchconnectai.com](https://researchconnectai.org)

---

## Features

- **GPT-Powered Professor Search** — Enter any university and field of study. GPT-4.1 identifies up to 15 relevant professors, then each result is enriched with real academic data from [OpenAlex](https://openalex.org)
- **Professor Profiles** — View detailed profiles including research areas, recent publications with citation counts, abstracts, and journal info — all pulled live from OpenAlex
- **AI Email Drafting** — Generate personalized cold-outreach emails using GPT-4o, tailored to the professor's actual research and publications
- **Email Discovery** — Automatically scrapes and caches faculty email addresses from university websites using DuckDuckGo search and BeautifulSoup
- **User Accounts** — JWT-based authentication with sign up, login, and a personal dashboard
- **Connection Tracker** — Save professors you've contacted and track their response status (pending, responded, no response)
- **Visitor Metrics** — Built-in anonymous visit tracking with cookie-based deduplication

## How It Works

1. **Student searches** for a field (e.g. "Machine Learning") at a university (e.g. "Stanford")
2. **GPT-4.1** returns a list of professors matching that criteria
3. **OpenAlex** enriches each professor with a verified academic ID, research topics, recent papers, and citation data
4. **Email scraper** attempts to find each professor's contact email from the web
5. Student can view a professor's full profile and **generate a personalized outreach email** with one click

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for dev server and bundling
- **Tailwind CSS** for styling
- **React Router** for client-side navigation
- **Lucide React** for icons

### Backend
- **Flask** (Python) REST API
- **OpenAI API** — GPT-4.1 for professor search, GPT-4o for email generation
- **OpenAlex API** via **PyAlex** — academic publication data, author profiles, research topics
- **DuckDuckGo Search** (ddgs) + **BeautifulSoup** — faculty email scraping
- **RapidFuzz** — fuzzy string matching for name/topic resolution
- **MySQL** on Railway — user accounts and saved connections
- **JWT** + **bcrypt** — authentication and password hashing

## Project Structure

```
research-helper/
├── backend/
│   ├── app.py              # Flask API — all routes and logic
│   ├── requirements.txt    # Python dependencies
│   ├── .env                # Environment variables (not committed)
│   └── Faculty/            # Legacy CSV data (not used in primary search)
├── frontend/
│   ├── src/
│   │   ├── App.tsx         # Main app with routing
│   │   └── components/
│   │       ├── HomePage.tsx
│   │       ├── FacultyFinder.tsx
│   │       ├── ProfessorDetailPage.tsx
│   │       ├── UserDashboard.tsx
│   │       ├── LoginPage.tsx
│   │       ├── SignupPage.tsx
│   │       └── ...
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- [OpenAI API key](https://platform.openai.com/api-keys)
- MySQL database (e.g. [Railway](https://railway.app))

### Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

pip install -r requirements.txt
```

Create a `.env` file in the `backend/` directory:

```env
SECRET_KEY=your-flask-secret-key
OPENAI_API_KEY=your-openai-api-key
DB_HOST=your-db-host
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=your-db-name
DB_PORT=3306
PYALEX_EMAIL=your-email@example.com
```

Start the server:

```bash
python app.py
```

The API runs on `http://localhost:5050` by default.

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/gptprofessorsearch` | GPT-powered professor discovery + OpenAlex enrichment |
| `GET` | `/professors/:id` | Full professor profile with publications |
| `POST` | `/draft-email` | Generate a personalized outreach email |
| `GET` | `/options` | Available universities and departments |
| `POST` | `/auth/signup` | Create a new account |
| `POST` | `/auth/login` | Log in and receive JWT |
| `GET` | `/user/connections` | Get saved connections (auth required) |
| `POST` | `/user/connections` | Save a new connection (auth required) |
| `PATCH` | `/user/connections/:id` | Update connection status (auth required) |
| `DELETE` | `/user/connections/:id` | Remove a connection (auth required) |
| `GET` | `/metrics` | Visitor metrics |

## License

This project is not currently licensed for redistribution. All rights reserved.
