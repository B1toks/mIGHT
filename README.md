# mIGHT — Learning Management System

A full-featured LMS built from scratch with **Next.js 15 + React 19** — three role experiences (Admin / Teacher / Student), dynamic auto-save grade journal, dark-themed adaptive calendar, and a polished UI built on ShadCN/Radix primitives.

🎓 **Live demo:** **[project-g-b1toks-projects.vercel.app](https://project-g-b1toks-projects.vercel.app/)**

---

## What it does

- **Role-based access** — Admin, Teacher, Student each see a tailored dashboard
- **Grade journal** with auto-save and per-cell editing for teachers
- **Adaptive calendar** — weekly view with class blocks, dark theme, smooth transitions
- **Course management**, assignments, schedule
- **Full UI kit** built on ShadCN — accordions, dialogs, tabs, progress, switches, scroll-areas, etc.
- Animated transitions powered by Framer Motion

## Tech

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Redux Toolkit** — predictable role/state management
- **ShadCN UI** + **Radix primitives** — 15+ headless components
- **FullCalendar** (`@fullcalendar/react` + `daygrid`) — calendar widget
- **Framer Motion** — animated transitions
- **Tailwind CSS** + `class-variance-authority` + `clsx` — utility-first styling
- **date-fns** for date arithmetic
- **lucide-react** for icons
- Custom **`server.js`** for production runtime

## Run locally

```bash
git clone https://github.com/B1toks/mIGHT.git
cd mIGHT
npm install
npm run dev
```

Open <http://localhost:3000>.

## What I focused on

mIGHT was my biggest solo project — a real LMS, not a CRUD demo. The core challenge was managing three role experiences without code duplication: Admin/Teacher/Student each need different navigation, permissions, and views, but share the same data model. I solved this with a single Redux slice keyed by role plus role-aware route groups in the App Router.

The auto-save grade journal taught me about debouncing, optimistic updates, and rollback patterns — when a teacher edits a cell, it persists locally instantly, then reconciles with the server on a 1s debounce.

---

Built by **Oleksandr Honchar** · [honchar.dev](https://www.honchar.dev) · [LinkedIn](https://www.linkedin.com/in/honchar-oleksandr/)
