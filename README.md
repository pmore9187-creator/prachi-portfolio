# Full-Stack Personal Portfolio

A professional, responsive, database-driven portfolio built with:

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js + Express.js
- Database: MongoDB + Mongoose
- Authentication: JWT-based admin login
- Email: Nodemailer
- Architecture: MVC / layered architecture
- Security: Helmet, CORS, rate limiting, environment variables
- Deployment-ready structure

## 1. Requirements

Install:
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

## 2. Setup

Open this folder in VS Code and run:

```bash
npm install
```

Create `.env` from `.env.example`:

```bash
copy .env.example .env
```

On macOS/Linux:

```bash
cp .env.example .env
```

Edit `.env` with your MongoDB URI and admin credentials.

## 3. Run

```bash
npm run dev
```

Then open:

http://localhost:5000

Admin panel:

http://localhost:5000/admin.html

## 4. Default profile

The site contains placeholder/professional profile content for Prachi M. More. Replace any information you do not want to publish before deployment.

## 5. Admin login

The admin account is configured through `.env`.

ADMIN_EMAIL=your email
ADMIN_PASSWORD=your password

Do not commit `.env` to GitHub.

## 6. API examples

GET /api/profile
GET /api/projects
GET /api/skills
GET /api/education
GET /api/certifications
GET /api/achievements
POST /api/contact
POST /api/auth/login

Protected admin APIs:
POST /api/projects
PUT /api/projects/:id
DELETE /api/projects/:id
POST /api/skills
DELETE /api/skills/:id
GET /api/contact

## 7. Deployment

The Express server serves the frontend from `/public`, so it can be deployed as one Node.js service.

Set the same environment variables in your hosting provider's environment settings.

## 8. Important

Before public deployment:
- Change the admin password.
- Add your real resume PDF to `public/assets/resume.pdf`.
- Replace placeholder social links.
- Add your real projects and certificates.
- Never upload `.env`.

## Personalized content included
- Prachi More — Full-Stack Developer
- CSE (AI), 3rd semester, G H Raisoni College of Engineering and Management, Pune
- CGPA 9.65; Sem 1 9.35; Sem 2 9.95
- SSC 91.4%; HSC 70%
- WorkNest SIH 2026 and Expense Tracker projects
- GitHub and LinkedIn links

A placeholder resume file is not included as a real PDF. Add your own `public/assets/resume.pdf` before publishing.
