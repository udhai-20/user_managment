"use client"; // Ensure this is a client-side component

import { AuthProvider } from "./context/AuthContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
