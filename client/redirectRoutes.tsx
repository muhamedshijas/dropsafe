"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "./utils/axiosInstance";

export default function RedirectIfAuth({
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
        if (res.data.loggedIn) {
          router.push("/"); // redirect to homepage or dashboard
        } else {
          setChecking(false); // allow access to login page
        }
      } catch (err) {
        setChecking(false); // allow access on error (assume not logged in)
      }
    };

    checkAuth();
  }, []);

  if (checking) return <p>Checking login status...</p>;

  return <>{children}</>;
}
