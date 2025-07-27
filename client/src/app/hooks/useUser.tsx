import { useEffect, useState } from "react";
import axios from "../../../utils/axiosInstance";

const useUser = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/auth/check");
        console.log(res);

        setUserId(res.data.user.id);
        setUserName(res.data.user.name);
      } catch (error) {
        setUserId(null);
        setUserName("");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { userId, loading, userName };
};

export default useUser;
