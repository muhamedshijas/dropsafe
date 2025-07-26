"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "./utils/axiosInstance";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/auth/check");
        if (!res.data.loggedIn) {
          router.push("/login");
        } else {
          setChecking(false);
        }
      } catch (err) {
        console.log("llog hiiii");
        
        router.push("/login");
      }
    };

    checkAuth();
  }, []);

  if (checking) return <p>Loading...</p>;

  return <>{children}</>;
}
