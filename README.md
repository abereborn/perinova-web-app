# PERINOVA

Digital Perineal Care & Postpartum Recovery

PERINOVA is a functional React/Vite prototype for postpartum mothers and midwives. It uses local browser storage for demo persistence and is intended for local development and demonstration only.

## Requirements

- Node.js 20.19 or newer
- npm
- VS Code recommended

## Run on Windows

Open PowerShell or Command Prompt in the project folder:

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite, usually `http://localhost:5173`.

## Useful commands

```bash
npm run typecheck
npm run build
npm run preview
```

## Project structure

The frontend is intentionally organized by responsibility so each page, role, component, and data source is easy to locate.

```text
src/
├── App.tsx                    # app providers + router mounting
├── routes/                    # route-level composition
│   ├── AppRouter.tsx
│   ├── MotherRoutes.tsx
│   └── ProviderRoutes.tsx
│
├── pages/                     # one file per logical page
│   ├── auth/
│   │   ├── AuthPage.tsx
│   │   └── SplashPage.tsx
│   ├── ibu/
│   │   ├── HomePage.tsx
│   │   ├── WoundPage.tsx
│   │   ├── ProgressPage.tsx
│   │   ├── EducationPage.tsx
│   │   ├── ConsultationPage.tsx
│   │   ├── ConsultationDetailPage.tsx
│   │   ├── ProfilePage.tsx
│   │   └── DangerPage.tsx
│   └── bidan/
│       ├── DashboardPage.tsx
│       ├── PatientsPage.tsx
│       ├── PatientDetailPage.tsx
│       ├── ConsultationsPage.tsx
│       └── ConsultationDetailPage.tsx
│
├── components/                # reusable UI and role-specific building blocks
│   ├── common/
│   ├── layout/
│   ├── mother/
│   │   ├── education/
│   │   └── modals/
│   ├── bidan/
│   ├── perinova-ui.tsx        # shared PERINOVA UI primitives
│   └── ui/                    # reusable Radix/shadcn primitives
│
├── context/                   # shared React contexts
├── data/                      # static navigation + demo data
├── services/                  # storage/service layer for future API replacement
├── lib/                       # domain persistence + utility functions
├── hooks/                     # reusable React hooks
└── index.css                  # global/theme styles
```

### Asset structure

- `public/assets/` — PERINOVA icons, illustrations, logo, and media
- `public/assets/logo-perinova-removebg.png` — primary PERINOVA logo
- `public/assets/yoga/` — local MP4 media used by Yoga & Relaksasi

## Architecture notes

- Mother and Bidan pages are separated into different folders.
- Each major screen has its own page file.
- Shared layout/navigation components live under `components/layout/`.
- Static navigation and provider demo data live under `data/`.
- Browser persistence is centralized under `lib/` with the low-level JSON storage helper in `services/storage.ts`.
- `services/index.ts` keeps a small compatibility facade for the current store API and future backend replacement.
- Business/data logic should be extended through the service/store layer rather than placed directly into `App.tsx`.

## Demo

- Choose **Saya ibu** or **Saya bidan** on the demo login screen.
- The demo password can be any value.
- Demo data is stored in browser `localStorage`.
- Do not enter real patient or health information into this prototype.

## Medical safety

PERINOVA is an educational and monitoring prototype. It is not a diagnostic system, emergency service, or replacement for direct examination by a midwife or doctor. If danger signs are present, contact a healthcare professional or healthcare facility directly and do not wait for an AI response.
