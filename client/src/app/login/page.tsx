"use client";
import { useState } from "react";
import axios from "../../../utils/axiosInstance";
import { useRouter } from "next/navigation";
import RedirectIfAuth from "../../../redirectRoutes";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // for error messages

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // reset error before each login attempt

    try {
      const res = await axios.post("/auth/login", { email, password });
      console.log(res);

      if (res.data.success) {
        alert("login success full");
        router.push("/");
      } else {
        setError(res.data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <RedirectIfAuth>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-semibold mb-4">Login</h2>

          {/* Show error message */}
          {error && (
            <div className="mb-4 text-red-600 font-semibold text-sm">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              Login
            </button>
            <div className="flex flex-row items-center gap-2">
              <p>Don't have an account?</p>
              <a
                href="/signup"
                className="text-blue-700 font-bold hover:underline"
              >
                Signup
              </a>
            </div>
          </form>
        </div>
      </div>
    </RedirectIfAuth>
  );
}
