"use client";
import { redirect, useRouter } from "next/navigation";
import { useAuth } from "./context/AuthContext";

export default function LandingPage() {
  const router = useRouter();
   const {user}=useAuth();
      if(user) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      {/* Hero Section */}
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl font-bold text-gray-800">
          Welcome to TaskMaster 🚀
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          A secure and efficient Task Management system with user authentication.
        </p>
        <button
          className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
          onClick={() => router.push("/auth/login")}
        >
          Get Started
        </button>
      </div>

      {/* Features Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800">🔐 Secure Authentication</h3>
          <p className="text-gray-600 mt-2">Sign up, log in, and manage tasks with a protected user system.</p>
        </div>
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800">✅ Task Management</h3>
          <p className="text-gray-600 mt-2">Create, edit, complete and delete tasks with a simple and intuitive interface.</p>
        </div>
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800">🛡️ Protected Routes</h3>
          <p className="text-gray-600 mt-2">Only logged-in users can access and manage tasks.</p>
        </div>
      </div>

      {/* How It Works */}
      <div className="mt-16 max-w-3xl">
        <h2 className="text-3xl font-bold text-gray-800 text-center">How It Works</h2>
        <div className="mt-6 space-y-6">
          <div className="flex items-start space-x-4">
            <span className="text-2xl font-bold text-blue-600">1️⃣</span>
            <p className="text-lg text-gray-700">Sign up or log in using secure authentication.</p>
          </div>
          <div className="flex items-start space-x-4">
            <span className="text-2xl font-bold text-blue-600">2️⃣</span>
            <p className="text-lg text-gray-700">Create, edit, complete and delete tasks effortlessly.</p>
          </div>
          <div className="flex items-start space-x-4">
            <span className="text-2xl font-bold text-blue-600">3️⃣</span>
            <p className="text-lg text-gray-700">All data is securely stored and accessible only to user.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
