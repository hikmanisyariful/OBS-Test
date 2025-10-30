# 🚀 OBS Test — Vite + React + TypeScript

A simple React + Vite + TypeScript application built as part of a technical test.  
This project demonstrates a minimal, fast, and well-structured setup using **Vite**, **React**, **TypeScript**, **ESLint**, **Prettier**, and **Vitest** for unit testing.

Live Demo: [https://obs-test-three.vercel.app/](https://obs-test-three.vercel.app/)

---

## 📖 Project Description

This application is a basic **counter app** scaffolded with [Vite](https://vitejs.dev/) and [React](https://react.dev/).  
It features:

- ⚡ Fast dev environment using Vite
- 💅 Code linting and formatting via ESLint + Prettier
- 🧪 Unit testing with Vitest + React Testing Library
- 🧱 Type-safe development using TypeScript

---

## 🛠️ Tech Stack

- **Frontend:** React 19 + TypeScript
- **Build Tool:** Vite 7
- **Linting:** ESLint (Flat Config)
- **Formatting:** Prettier
- **Testing:** Vitest + React Testing Library
- **Deployment:** Vercel

## 🧩 Project Structure

```bash
obs-test/
├── src/
│   ├── components/
│   │   ├── Counter.tsx
│   ├── App.tsx
│   ├── main.tsx
├── tests/
│   ├── Counter.test.tsx
├── .eslintrc.js
├── .prettierrc
├── index.html
├── package.json
├── README.md
├── tsconfig.json
├── vite.config.ts
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
