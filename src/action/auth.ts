import fetchClient from "@/utils/http";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import toast from "react-hot-toast";
interface AuthProps {
    userName?
    : string;
    email: string;
    password: string;
    router: AppRouterInstance;
    setError: React.Dispatch<React.SetStateAction<string>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    toast: typeof toast;
}
export const Login = async ({ email, password, router, setError, setLoading, toast }: AuthProps) => {
    try {
        const method = "POST";
        const body = JSON.stringify({ email, password });
        const res = await fetchClient("/api/auth/login", { method, body });
        const data = res
        // console.log('Data received:', data);
        if (!res) {
            console.log('res:', res);
            throw new Error(data.error || "Something went wrong");
        }

        localStorage.setItem("userData", JSON.stringify(data.data));
        toast.success("Login Successful!");
        router.push("/dashboard");
    } catch (error: unknown) {
        setError((error as { message: string }).message || "Some Technical Issue");

    } finally {
        setLoading(false);
    }
};

export const Register = async ({ userName, email, password, router, setError, setLoading, toast }: AuthProps) => {
    // console.log('username:', userName, email, password);
    try {
        const method = "POST";
        const body = JSON.stringify({ userName, email, password });
        const res = await fetchClient("/api/auth/register", { method, body });
        const data = res;

        if (!res) {
            throw new Error(data.error || "Something went wrong");
        }
        toast.success("Registered Successful!");
        router.push("/auth/login");
    } catch (error: unknown) {
        console.log('error:', error);

        setError((error as { message: string }).message || "Some Technical Issue");
    } finally {
        setLoading(false);
    }
};