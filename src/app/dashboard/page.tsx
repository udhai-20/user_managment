"use client";
import Layout from "@/components/Layout";
import TaskManager from "@/components/TaskManager";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

// Define the structure of the user object
interface User {
  name: string;
  email: string;
  id: string;
}

export default function DashboardPage() {
  // Use the User type to define the state
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUser = JSON.parse(storedUserData) as User;
      setUser(parsedUser);
    } else {
      async ()=>await fetch("/api/auth/logout", { method: "GET" });
      redirect("/auth/login");
    }
  }, []);

  return (
    <div>
      <Layout>
        <h1>Welcome to your Dashboard</h1>
        {user ? (
          <>
            <p>Hello, {user.name}!</p>
            <>
              <TaskManager />
            </>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </Layout>
    </div>
  );
}
