# Task Management with Authentication

This is a **Task Management** web application built with **Next.js**, featuring **user authentication** and **protected routes** for managing tasks. Users can **register, log in, create, update, and delete tasks** with a secure and modern UI.

## Features

- 🔐 **User Authentication** (Login, Register, Logout) with JWT-based access tokens.
- 🔄 **Protected Routes**: Only authenticated users can manage tasks.
- 📌 **Task Management**: Users can **add, edit, delete, and mark tasks as completed**.
- 🎨 **Modern UI**: Built using **Next.js (App Router)** with **responsive design**.
- 🚀 **Session Handling**: Automatic session expiration handling with redirects.

## Tech Stack

- **Next.js** (App Router)
- **MongoDB** (Database for storing user and task data)
- **Mongoose** (ODM for MongoDB)
- **NextAuth.js** (or Custom JWT Authentication)
- **Tailwind CSS** (UI Styling)
- **Framer Motion** (Smooth Animations)
- **React Hot Toast** (Notifications)

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/task-manager.git
cd task-manager
```

### 2. Install Dependencies
```bash
npm install  # or yarn install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add the following variables:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NEXTAUTH_SECRET=your_nextauth_secret
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 4. Start the Development Server
```bash
npm run dev  # or yarn dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

### **Authentication**
- `POST /api/auth/register` → Register a new user
- `POST /api/auth/login` → Authenticate and receive an access token
- `GET /api/auth/logout` → Logout user and clear session

### **Tasks** (Protected Routes)
- `GET /api/task` → Fetch user tasks
- `POST /api/task` → Create a new task
- `PUT /api/task/:id` → Update a task
- `DELETE /api/task/:id` → Delete a task

## Protected Routes Handling
- Users **must be authenticated** to access `/dashboard`, `/tasks`, etc.
- `fetchClient.ts` ensures unauthorized users are **redirected to login** if the session expires.
- `useEffect` in `_app.tsx` watches for authentication state and clears local storage on logout.

## Task List UI
- Users can **scroll through tasks** when they exceed the visible area.
- Tasks are **color-coded** based on completion status.
- **Framer Motion** provides smooth animations for task updates.

## Deployment

### Deploy on Vercel
```bash
vercel
```
Follow the setup instructions and update environment variables in the **Vercel Dashboard**.

## Contributions
Pull requests are welcome! For major changes, please open an issue first.

## License
[MIT License](LICENSE)

