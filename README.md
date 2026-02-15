# <img src="screenshots/logo.png" alt="Reptile Zoo logo" width="120"> <span style="color: #2F6F3E;">THE REPTILE ZOO</span>

A full-stack web app for Reptile Zoo visitors and staff to browse animals and events, book visits, and manage schedules and content.  
Built for guests seeking planning info and admins who maintain the zoo's daily operations.

## 🚀 Live Demo

- **Frontend Live Site:** https://k-group-practicum-team5.onrender.com/  
- **Frontend Repo:** /frontend  
- **Backend Repo:** /backend

## 🧠 Problem Statement

It solves the problem of scattered or outdated zoo information by centralizing animals, events, hours, and bookings.

- **Who is this application for?** Reptile Zoo visitors planning a trip and staff who manage daily content, schedules, and inquiries.
- **What pain point does it address?** Guests struggle to find reliable visit details, while staff waste time updating multiple channels.
- **Why does this solution matter?** It improves the visitor experience and reduces operational overhead with a single source of truth.

## 🎯 Features

- User authentication with admin roles and password reset
- Enhanced homepage with hero media and clear call-to-action
- Animals and education catalog with search and filters
- Interactive calendar for hours, closures, and events
- Online booking and visit management
- Admin dashboard for content, schedule, and gallery updates
- Contact form and inquiry management
- Multi-language UI with language selector
- Photo gallery with albums, lightbox, and admin uploads
- Volunteer applications and scheduling tools
- Responsive UI (mobile & desktop)

## 📸 Screenshots

<a href="screenshots/HomePage.jpg">
  <img src="screenshots/HomePage.jpg" alt="Homepage" width="450">
</a>
<a href="screenshots/FeaturedAttractionsSection.jpg">
  <img src="screenshots/FeaturedAttractionsSection.jpg" alt="FeaturedAttractions" width="450">
</a>
<a href="screenshots/CustomerHighlights.jpg">
  <img src="screenshots/CustomerHighlights.jpg" alt="FeaturedAttractions" width="450">
</a>
<a href="screenshots/Media.jpg">
  <img src="screenshots/Media.jpg" alt="FeaturedAttractions" width="450">
</a>
<a href="screenshots/Gallery.jpg">
  <img src="screenshots/Gallery.jpg" alt="FeaturedAttractions" width="450">
</a>

## 🛠 Tech Stack

### Frontend
- React 19 + TypeScript
- Vite
- React Router
- MUI (Material UI, MUI X Date Pickers)
- Day.js
- Axios
- i18next (internationalization)
- Leaflet (maps)
- Tailwind CSS

### Backend
- Node.js + Express.js (REST API)
- Stripe (payments)
- JWT authentication
- Multer + Cloudinary (uploads)
- Nodemailer

### Database
- MongoDB + Mongoose

### Tooling
- Git & GitHub & Actions GitHub
- dotenv (environment variables)
- ESLint / Prettier

## 🎨 Design System

### Color Palette
- **Primary Green**: <span style="color: #2F6F3E;">**#2F6F3E**</span> (Zoo Green)
- **Dark Green**: <span style="color: #1F3D2B;">**#1F3D2B**</span> (Zoo Dark)
- **Secondary Orange**: <span style="color: #E67E22;">**#E67E22**</span> (Zoo Orange)
- **Light Background**: <span style="color: #EAF4ED; background: #333; padding: 2px 4px;">**#EAF4ED**</span> (Zoo Light)
- **White**: <span style="background: #ddd; padding: 2px 4px;">**#FFFFFF**</span>
- **Black**: <span style="color: #000000;">**#000000**</span>

## 📁 Project Structure

#### Backend Structure
<a href="screenshots/ProjectStructureBackend.jpg">
  <img src="screenshots/ProjectStructureBackend.jpg" alt="Backend Project Structure" width="600">
</a>

#### Frontend Structure
<a href="screenshots/ProjectStructureFrontend.jpg">
  <img src="screenshots/ProjectStructureFrontend.jpg" alt="Frontend Project Structure" width="600">
</a>

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB or PostgreSQL (local or cloud)

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
```

Backend runs on:  
http://localhost:8080

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:  
http://localhost:5173

## 🧪 Available Scripts

### Frontend
```bash
npm run dev
npm run build
npm run preview
```

### Backend
```bash
npm run dev
npm start
```

## 🔐 API Overview

### Endpoints

```text
# Public
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/forgot-password
POST   /api/v1/auth/reset-password/:token
GET    /api/v1/user/profile
PUT    /api/v1/user/profile
GET    /api/v1/calendar/opening-days
GET    /api/v1/calendar/events
GET    /api/v1/calendar/month-data
GET    /api/v1/business-hours
GET    /api/v1/business-hours/status
PUT    /api/v1/business-hours
GET    /api/v1/contact-info
POST   /api/v1/contact-messages
GET    /api/v1/contact-messages
GET    /api/v1/contact-messages/:id
DELETE /api/v1/contact-messages/:id
GET    /api/v1/images
POST   /api/v1/images/upload
PUT    /api/v1/images
DELETE /api/v1/images
GET    /api/v1/staff
GET    /api/v1/staff/:id
POST   /api/v1/staff
PUT    /api/v1/staff/:id
DELETE /api/v1/staff/:id
GET    /api/v1/checkout/ticket-types
POST   /api/v1/checkout/quote
GET    /api/v1/volunteering/enums/categories
GET    /api/v1/volunteering/opportunities
GET    /api/v1/volunteering/opportunities/full
GET    /api/v1/volunteering/opportunities/applied
GET    /api/v1/volunteering/opportunities/:opportunityId/applicants
POST   /api/v1/volunteering/new
POST   /api/v1/volunteering/opportunity/addApplicant
PATCH  /api/v1/volunteering/opportunity/applicant/status

# Admin
GET    /api/v1/admin/events
POST   /api/v1/admin/events
PUT    /api/v1/admin/events/:id
DELETE /api/v1/admin/events/:id
POST   /api/v1/admin/opening-days
PUT    /api/v1/admin/opening-days/:id
DELETE /api/v1/admin/opening-days/:id
GET    /api/v1/admin/users
PUT    /api/v1/admin/users/:id
DELETE /api/v1/admin/users/:id
```

## 🤝 Team & Collaboration

### Team Members
- Tracy Cano — Full Stack Developer [GitHub](https://github.com/trca831)
- Tetiana Klitna — Full Stack Developer [GitHub](https://github.com/TetianaKlitna/)
- Masouma Ahmadi — Full Stack Developer [GitHub](https://github.com/MASOUMA2023)
- Uma Sekar — Full Stack Developer [GitHub](https://github.com/umavenki)
- Maher Algepha — Full Stack Developer [GitHub](https://github.com/Maher-Algepah)

### Workflow
- GitHub Issues for task tracking
- Feature branches for development
- Pull Requests required for all merges
- Code reviews before merging to `dev`


## 🧩 Development Process

- Sprint planning with scoped MVP goals
- Backend-first API design and validation
- Parallel frontend integration with staged endpoints
- Incremental delivery with frequent demos and feedback

## 📌 Known Issues / Limitations

- No automated tests yet
- Performance optimizations pending

## 🛣 Future Improvements
- Add automated testing (Jest, Supertest)
- Improve security and validation
- Add caching and performance improvements
- Dockerize the application
- Add monitoring/logging (Sentry, structured logs)
- Accessibility audit and improvements

### Planned Features

- Event booking system
- Founder story page
- Virtual zoo tour

## 🙌 Acknowledgments

- Mentors
- Instructors
- Open-source libraries and tools

## 📄 License

This project is for educational purposes only.