# 🎵 Musical Training PWA (NoteTrainer)

A Progressive Web Application designed for musicians and students to practice ear training, specifically focusing on note recognition and interval identification.

## ✨ Features

- **Customizable Training**: Select specific notes (natural, sharp, flat) and intervals to focus on.
- **Adjustable Timing**: Set the delay (in seconds) between played items to match your skill level.
- **Speech Synthesis**: Optional text-to-speech feedback that announces the played note/interval.
- **Dark/Light Mode**: Seamless theme switching with persistent user preferences.
- **Multilingual Support**: Built-in internationalization (i18n) for Russian and English.
- **Offline Capable**: Functions as a PWA, allowing installation on mobile/desktop and offline use.
- **Persistent Settings**: Your selections and preferences are automatically saved in local storage.

## 🛠 Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **State Management**: React Hooks (Custom hooks for business logic)
- **Styling**: Vanilla CSS with CSS Variables (Theming)
- **Internationalization**: i18next + react-i18next
- **Linting**: Oxlint

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/LoadART/musical-training.git
   cd musical-training
2. Install dependencies:
    npm install
3. Start the development server:
    npm run dev
4. Open your browser and navigate to http://localhost:5173 (or the port shown in your terminal).

### Building
npm run build
npm run preview

### PWA Installation
This app is a Progressive Web App. You can install it on your device:
  **Desktop (Chrome/Edge):** Click the "Install" icon in the address bar.
  **Mobile (iOS):** Tap the "Share" button and select "Add to Home Screen".
  **Mobile (Android):** Tap the menu (⋮) and select "Install app" or "Add to Home screen".

### Project structure
src/

   ├── components/       # Reusable UI components (Selectors, Inputs, Displays)

   ├── constants/        # Static data (Notes, Intervals)

   ├── context/          # Global state providers (Theme)

   ├── hooks/            # Custom React hooks (useTrainer, useSpeech)

   ├── i18n/             # Translation files and i18n configuration

   ├── types/            # TypeScript interfaces and types

   ├── App.tsx           # Main application orchestrator

   └── main.tsx          # Application entry point
