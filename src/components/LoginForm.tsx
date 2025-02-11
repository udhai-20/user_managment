"use client";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import { Login, Register } from "@/action/auth";
import { useAuth } from "@/app/context/AuthContext";
export default function LoginForm({ isLogin }: { isLogin: boolean }) {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const {user}=useAuth();
    if(user) redirect("/dashboard");
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");
        if (isLogin) {
            await Login({ email, password, router, setError, setLoading });
        } else {
            await Register({ userName, email, password, router, setError, setLoading });
        }
    };

    return (
        <div className="w-[400px] mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-center text-xl font-semibold text-black">{!isLogin?"User Register":"User Login"}</h2>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <form onSubmit={handleSubmit} className="mt-4">
                {!isLogin && <input
                    type="string"
                    placeholder="Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="block w-full p-2 border rounded-md mb-2 text-black"
                    required
                />}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full p-2 border rounded-md mb-2 text-black"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full p-2 border rounded-md mb-2 text-black"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded-md w-full"
                    disabled={loading}
                >
                    {isLogin ? "Login" : "Register"}
                </button>
            </form>
            <div>
                <p className="text-black">{isLogin ? "Don't have account?" : "Already have account?"} <Link href={isLogin ? "/auth/register" : "/auth/login"}>{isLogin ? "Register" : "Login"}</Link></p>
            </div>
        </div>
    );
}
