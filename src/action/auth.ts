import fetchClient from "@/utils/http";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
interface AuthProps {
    userName?
    : string;
    email: string;
    password: string;
    router: AppRouterInstance; 
    setError: React.Dispatch<React.SetStateAction<string>>; 
    setLoading: React.Dispatch<React.SetStateAction<boolean>>; 
  }
export const Login = async ({ email, password, router, setError, setLoading }: AuthProps) => {
    try {
        const method = "POST";
        const body = JSON.stringify({ email, password });
        const res = await fetchClient("/api/auth/login", { method, body });
        const data = res
        // console.log('Data received:', data);
        if (!res) {
            throw new Error(data.error || "Something went wrong");
        }

        localStorage.setItem("userData", JSON.stringify(data.data));
        alert("Login Successful!");
        router.push("/dashboard");
    } catch (error: unknown) {
        console.error("Error in login:", error); // Log the complete error object
        if (error instanceof Error) {
            setError(error.message || "Some Technical Issue");
        } else {
            setError("Some Technical Issue");
        }
    } finally {
        setLoading(false);
    }
};

export const Register = async ({ userName, email, password, router, setError, setLoading }: AuthProps) => {
    // console.log('username:', userName, email, password);
    try {
        const method = "POST";
        const body = JSON.stringify({ userName, email, password });
        const res = await fetchClient("/api/auth/register", { method, body });
        const data = res;

        if (!res) {
            throw new Error(data.error || "Something went wrong");
        }
        alert("Registered Successful!");
        router.push("/auth/login");
    } catch (error: unknown) {
        console.error("Error in login:", error); // Log the complete error object
        if (error instanceof Error) {
            setError(error.message || "Some Technical Issue");
        } else {
            setError("Some Technical Issue");
        }
    } finally {
        setLoading(false);
    }
};