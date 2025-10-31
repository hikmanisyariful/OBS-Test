# 🚀 OBS Test — Vite + React + TypeScript

A simple React + Vite + TypeScript application built as part of a technical test.  
This project demonstrates a minimal, fast, and well-structured setup using **Vite**, **React**, **TypeScript**, **ESLint**, **Prettier**, **Vitest** for unit testing, and **Redux Toolkit** for state management.

Live Demo: [https://obs-test-three.vercel.app/](https://obs-test-three.vercel.app/)

---

## 📖 Project Description

This project implements a User Management System that allows users to view, add, edit, and delete user records through a responsive and accessible interface.
It is designed to highlight scalable frontend structure, state management with Redux Toolkit, form handling with React Hook Form, and component testing using Vitest.

---

## 🛠️ Tech Stack

- **Frontend:** React 19 + TypeScript
- **Build Tool:** Vite 7
- **Linting:** ESLint (Flat Config)
- **Formatting:** Prettier
- **Testing:** Vitest + React Testing Library
- **State Management:** Redux Toolkit & React Context
- **Deployment:** Vercel

## 🧩 Project Structure

```bash
obs-test/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── components/
│   │   ├── user-list/
│   │   ├── common/
│   │   ├── user-form/
│   │   └── modal/
│   ├── interface/
│   ├── network/
│   ├── redux/
│   └── tests/
│       ├── mockUsers.ts
│       └── renderWithAllProviders.tsx
├── .eslintrc.js
├── .prettierrc
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

## ⚙️ Installation & Running Locally

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Run the Development Server

```bash
npm run dev
```

---

## 🧪 Running Tests

### Run all unit tests

```bash
npm run test
```

### Run tests in watch mode

```bash
npm run test:watch
```

### Generate coverage report

```bash
npm run test:cov
```

---

## 🧹 Linting & Formatting

### Check linting issues

```bash
npm run lint
```

### Format all files

```bash
npm run format
```

### Check format only

```bash
npm run format:check
```
