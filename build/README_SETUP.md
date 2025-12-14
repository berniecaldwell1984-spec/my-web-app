# Gilchrist QC App - Setup & Running Instructions

## Quick Start

### Prerequisites
- **Node.js** 18.x or higher (download from [nodejs.org](https://nodejs.org/))
- **npm** (comes with Node.js)

### Running Locally

```bash
# Navigate to the build folder
cd build

# Install dependencies (first time only)
npm install

# Start the development server
npm run dev
```

The app will start and display a local URL (usually `http://localhost:5173/`). Open this URL in your browser.

---

## Features

### Dashboard
- Quick stats overview (inspections, tests, pass rate)
- Quick action buttons for frequent tasks

### Material Calculations
- **Soil Cement/Lime Calculator**: Calculate material requirements for soil stabilization
- **Asphalt Yield Calculator**: Estimate tonnage for asphalt paving projects

### Quality Control
- **Material Tests**: Record and track lab and field test results
- **Inspections**: Document quality inspections with photos and notes
- **LADOTD Resources**: Quick links to Louisiana DOTD manuals and procedures

### Field Tools
- **AI Assistant**: Real-time guidance (powered by Google Generative AI)
- Photo capture and attachment to reports
- Print-ready reports with Gilchrist Construction branding

---

## File Structure

```
build/
├── src/
│   ├── App.jsx                 # Main application
│   ├── main.jsx                # React entry point
│   ├── index.css               # Global styles (Gilchrist theme)
│   ├── views/                  # Individual page components
│   ├── components/             # Reusable UI components
│   ├── data/                   # Data storage and utilities
│   ├── modals/                 # Modal dialogs
│   └── utils/                  # Calculation utilities
├── package.json                # Dependencies
├── vite.config.js              # Vite configuration
└── index.html                  # HTML entry point
```

---

## Styling

The app uses the **Gilchrist Construction theme**:
- **Primary Color**: Black (`#000`)
- **Accent Color**: Green (`#16a34a`)
- **Secondary**: Dark panels (`#0f1720`)

CSS utility classes are defined in `src/index.css` to support the Tailwind-like structure used in components.

---

## Storing Data

All user data (tests, inspections, etc.) is stored in **browser local storage**. This means:
- Data persists across browser sessions on the same device
- Clear browser storage to reset the app
- No server/cloud sync (local device only)

---

## Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder, ready for deployment.

---

## Troubleshooting

### Port 5173 already in use?
Kill the process and restart:
```bash
Get-Process node | Stop-Process -Force
npm run dev
```

### Module not found errors?
Ensure all dependencies are installed:
```bash
npm install
```

### Changes not reflecting?
- Clear browser cache (Ctrl+Shift+Delete)
- Restart dev server (Ctrl+C, then `npm run dev`)

---

## API Key Configuration

The AI Assistant requires a Google Generative AI API key. Update the `API_KEY` variable in `src/App.jsx` with your key from [Google AI Studio](https://aistudio.google.com/app/apikey).

---

## Support

For LADOTD testing procedures and resources, visit: **https://www.ladotd.la.gov**

---

**Developed for Gilchrist Construction**  
v1.0.0
