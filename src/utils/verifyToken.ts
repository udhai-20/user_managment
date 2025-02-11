import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const verifyToken = async (): Promise<jwt.JwtPayload | null> => {
  try {
    // Extract token from cookies
    const token =  (await cookies()).get("accessToken")?.value;
    if (!token) throw new Error("Unauthorized: No token provided");

    // Verify and decode token
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return decoded; // ✅ Returns { id, email, etc. }
  } catch (error: unknown) {
    console.error("Token Verification Error:", error instanceof Error ? error.message : "Unknown error occurred");
    return null; 
}
};
