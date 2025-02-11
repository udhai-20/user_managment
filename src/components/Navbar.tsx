"use client";

import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
interface User {
    name: string;
    email: string;
    id: string;
}
export default function Navbar() {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
            const parsedUser = JSON.parse(storedUserData) as User;
            setUser(parsedUser);
        } else {
            handleLogout();
            redirect("/auth/login");
        }
        //eslint-disable-next-line
    }, []);
    const router = useRouter();
    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "GET" }); // Call API to remove cookie
            router.push("/auth/login"); // Redirect to login page
            localStorage.removeItem("userData");
        } catch (error) {
            alert(error || "Some technical issue in logout try again later");
        }
    };

    return (
        <nav className="bg-blue-600 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">MyApp</h1>
                <ul className="flex space-x-4">
                    {user ? (
                        <>
                            <li>
                                <Link href="/dashboard" className="hover:underline">
                                    Dashboard
                                </Link>
                            </li>
                            <li className="text-yellow-300">Welcome, {user?.name || "No Name"}!</li>
                            <li>
                                <button onClick={handleLogout} className="hover:underline">
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link href="/auth/login" className="hover:underline">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link href="/auth/register" className="hover:underline">
                                    Register
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}
