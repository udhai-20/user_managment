import { toast } from "react-hot-toast";

const fetchClient = async (url: string, options: RequestInit = {}) => {
    try {
        const res = await fetch(url, {
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            ...options,
        });

        if (res.status === 401) {
            console.log(res,"err");
            toast.error("Session expired. Redirecting to login...");
            window.location.href = "/auth/login";
            localStorage.removeItem("userData");
            return null;
        }

        if (!res.ok) {
            // Extract status code and message properly
            const errorMessage = await res.text();
            throw { status: res.status, message: errorMessage };
        }

        return await res.json();
    } catch (error: any) {
        console.log('error:', error);
        // toast.error(error.message || "Something went wrong");
        // window.location.href = "/auth/login";
        throw error; 
    }
};

export default fetchClient;
