"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "../../../utils/axiosInstance";
import { useRouter } from "next/navigation";
import RedirectIfAuth from "../../../redirectRoutes";

interface FormData {
  name: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/signup", formData);
      if (res.data.success) {
        router.push("/login");
      } else {
        setError(res.data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  return (
    <RedirectIfAuth>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-semibold mb-4">Register</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              name="name"
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
            >
              Register
            </button>
            <div className="flex flex-row items-center gap-2">
              <p>Already have an account?</p>
              <a
                href="/login"
                className="text-blue-700 font-bold hover:underline"
              >
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </RedirectIfAuth>
  );
}
