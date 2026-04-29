# Research Connect AI

A full-stack web application that helps students find and connect with university faculty for research opportunities. Search by field of study and university, discover professors' published work, and generate personalized outreach emails — all powered by OpenAI and the OpenAlex academic database.

**Live site:** [researchconnectai.com](https://researchconnectai.com)

---

## Features

- **Smart Faculty Search** — Find professors by field of study and university using fuzzy matching against a curated faculty database, with GPT-powered fallback for broader searches
- **Professor Profiles** — View detailed profiles including research areas, recent publications, citation counts, and abstracts pulled from OpenAlex
- **AI Email Drafting** — Generate personalized cold-outreach emails to professors using OpenAI, tailored to your interests and their research
- **Email Discovery** — Automatically scrapes and caches faculty email addresses from university directories and the web
- **User Accounts** — Sign up, log in, and track your outreach with a personal dashboard
- **Connection Tracker** — Save professors you've contacted and track response status (pending, responded, no response)
- **Visitor Metrics** — Built-in anonymous visit tracking

## Universities Covered

The faculty database currently includes departments across **16 universities**:

| | | |
|---|---|---|
| Caltech | MIT | Stanford |
| Carnegie Mellon | Princeton | UC Florida |
| Columbia | Purdue | U of Florida |
| Florida Atlantic | U of Miami | U of Pennsylvania |
| Florida State | U of Washington | U of Wisconsin–Madison |
| Georgia Tech | | |

Departments span Computer Science, Electrical Engineering, Mechanical Engineering, Chemical Engineering, Biomedical Engineering, Physics, Chemistry, Biology, Mathematics, Psychology, and more.

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for dev server and bundling
- **Tailwind CSS** for styling
- **React Router** for client-side navigation
- **Lucide React** for icons

### Backend
- **Flask** (Python) REST API
- **OpenAI API** for email generation and GPT-powered professor search
- **OpenAlex API** for academic publication data
- **PyAlex** for OpenAlex integration
- **RapidFuzz** for fuzzy string matching
- **BeautifulSoup** for web scraping faculty emails
- **MySQL** (Railway) for user accounts and connections
- **JWT** for authentication
- **bcrypt** for password hashing

## Project Structure

```
research-helper/
├── backend/
│   ├── app.py              # Flask API (all routes and logic)
│   ├── requirements.txt    # Python dependencies
│   ├── .env                # Environment variables (not committed)
│   └── Faculty/            # CSV files of faculty data by university
│       ├── MIT/
│       ├── Stanford/
│       ├── CMU/
│       └── ...
├── frontend/
│   ├── src/
│   │   ├── App.tsx         # Main app with routing
│   │   ├── components/
│   │   │   ├── HomePage.tsx
│   │   │   ├── FacultyFinder.tsx
│   │   │   ├── ProfessorDetailPage.tsx
│   │   │   ├── UserDashboard.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── SignupPage.tsx
│   │   │   └── ...
│   │   └── types/
│   ├── package.json
│   └── ...
└── README.md
```

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- An [OpenAI API key](https://platform.openai.com/api-keys)
- A MySQL database (e.g. [Railway](https://railway.app))

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

The frontend runs on `http://localhost:5173` and proxies API calls to the backend.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/find-professors` | Search faculty by field and university |
| `POST` | `/gptprofessorsearch` | GPT-powered professor discovery |
| `GET` | `/professors/:id` | Get professor profile with publications |
| `POST` | `/draft-email` | Generate a personalized outreach email |
| `GET` | `/options` | Get available universities and departments |
| `POST` | `/auth/signup` | Create a new account |
| `POST` | `/auth/login` | Log in and receive JWT |
| `GET` | `/user/connections` | Get saved connections (auth required) |
| `POST` | `/user/connections` | Save a new connection (auth required) |
| `PATCH` | `/user/connections/:id` | Update connection status (auth required) |
| `DELETE` | `/user/connections/:id` | Remove a connection (auth required) |
| `GET` | `/metrics` | Get visitor metrics |

## License

This project is not currently licensed for redistribution. All rights reserved.
