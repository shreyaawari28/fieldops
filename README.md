# FieldOps

FieldOps — Construction Field Management App

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- React Router v6
- Framer Motion
- react-hot-toast
- lucide-react
- Axios

## Setup

```bash
git clone <your-repository-url>
cd Construction_Field_Manager
npm install
npm run dev
```

## Features Implemented

- [x] Vite + React app scaffold
- [x] Tailwind CSS setup with custom industrial color palette
- [x] React Router v6 route structure
- [x] Protected routes backed by `AuthContext`
- [x] Theme persistence with `ThemeContext` and `localStorage`
- [x] Dark mode support across Login, Project List, and DPR Form
- [x] Animated page transitions using Framer Motion
- [x] Split-screen login page with credential validation
- [x] Project list filtering and real-time search
- [x] Responsive project cards with status badges and progress bars
- [x] DPR form validation with inline errors
- [x] Photo upload previews, removal, and upload limit handling
- [x] Success and error feedback using react-hot-toast

## Known Limitations

- Authentication is mocked and accepts only the demo credentials shown on the login page.
- Project and DPR data are hardcoded and not connected to a backend API.
- Screenshots uploaded in the DPR form are previewed locally and are not persisted after refresh.

## Screenshots

- Login page: placeholder
- Project list page: placeholder
- DPR form page: placeholder
