"use client";

import axios from "../../utils/axiosInstance";
import ProtectedRoute from "../../protectedRoute";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.get("/auth/logout", { withCredentials: true });
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 text-white">
        <h1 className="text-4xl font-bold mb-4">✅ Tailwind is Working!</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200"
        >
          Logout
        </button>
      </main>
    </ProtectedRoute>
  );
}
