# Project Title: Full-Stack Application

## Overview

This is a full-stack application demonstrating a basic setup with a Node.js/Express backend and a React frontend. The backend provides an API and WebSocket communication, while the frontend consumes these services to provide a user interface.

## Features

- **Backend**:
  - RESTful API endpoints (e.g., for project management, as suggested by `ProjectModels.ts` and `ProjectController.ts` in the frontend).
  - WebSocket communication for real-time features (e.g., chat, as suggested by `websocket.ts` and `ChatPage.tsx`).
  - Uses Express.js for routing and middleware.
  - TypeScript for type safety.
- **Frontend**:
  - Built with React for a dynamic user interface.
  - Components for navigation (`Sidebar.tsx`, `TopNavbar.tsx`), project display (`ProjectCard.tsx`), and chat (`ChatPage.tsx`).
  - Uses Vite for fast development.
  - Tailwind CSS for styling.
  - TypeScript for type safety.

## Technologies Used

### Backend

- **Node.js**: JavaScript runtime.
- **Express.js**: Web application framework.
- **TypeScript**: Superset of JavaScript for type-safe development.
- **ws**: WebSocket library.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing.

### Frontend

- **React**: JavaScript library for building user interfaces.
- **Vite**: Next-generation frontend tooling.
- **TypeScript**: Superset of JavaScript for type-safe development.
- **Tailwind CSS**: Utility-first CSS framework.

## Setup and Installation

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- Node.js (LTS version recommended)
- npm (Node Package Manager) or Yarn

### 1. Clone the Repository

```bash
git clone https://github.com/Aswin432/Errgo-assesment
cd your-repository-name
```

### 2. Backend Setup

Navigate to the `Backend` directory and install dependencies:

```bash
cd interview-code-main/Backend
npm install
# or
yarn install
```

### 3. Frontend Setup

Open a new terminal, navigate to the `Frontend` directory, and install dependencies:

```bash
cd interview-code-main/Frontend
npm install
# or
yarn install
```

## Running the Application

### 1. Start the Backend Server

From the `interview-code-main/Backend` directory, run:

```bash
npm start
# or
npm run dev
```

The backend server will typically run on `http://localhost:3000` (or the port specified in `process.env.PORT`). You should see a message like `Server is running on port 3000`.

### 2. Start the Frontend Development Server

From the `interview-code-main/Frontend` directory, run:

```bash
npm run dev
# or
yarn dev
```

The frontend development server will typically open in your browser at `http://localhost:5173` (or another available port).

## Project Structure

```
.
├── interview-code-main/
│   ├── Backend/
│   │   ├── src/
│   │   │   ├── app.ts             # Main Express application setup
│   │   │   ├── websocket.ts       # WebSocket handling
│   │   │   └── models/            # Backend data models
│   │   │   └── schemas/           # Backend data schemas
│   │   ├── package.json           # Backend dependencies and scripts
│   │   └── tsconfig.json          # TypeScript configuration for backend
│   ├── Frontend/
│   │   ├── public/                # Static assets
│   │   ├── src/
│   │   │   ├── App.tsx            # Main React component
│   │   │   ├── main.tsx           # React entry point
│   │   │   ├── index.css          # Global styles
│   │   │   ├── assets/            # Frontend assets
│   │   │   ├── components/        # Reusable React components
│   │   │   ├── controller/        # Frontend logic/controllers
│   │   │   ├── models/            # Frontend data models
│   │   │   └── pages/             # Page-level React components
│   │   ├── package.json           # Frontend dependencies and scripts
│   │   ├── tsconfig.json          # TypeScript configuration for frontend
│   │   ├── vite.config.ts         # Vite configuration
│   │   └── tailwind.config.js     # Tailwind CSS configuration
│   └── README.md                  # This file
```

## Usage

Once both the backend and frontend servers are running, open your browser to the frontend URL (e.g., `http://localhost:5173`). You can then interact with the application's UI, which will communicate with the backend API and WebSocket services.

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeature`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/YourFeature`).
6.  Open a Pull Request.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details (if applicable, otherwise specify your chosen license).
