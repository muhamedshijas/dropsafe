import { useEffect, useState } from "react";
import axios from "../../../utils/axiosInstance";

const useUser = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/auth/check");
        console.log(res);

        setUserId(res.data.user.id);
      } catch (error) {
        setUserId(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { userId, loading };
};

export default useUser;
