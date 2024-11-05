import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SecureLink = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn) ?? false;
  const token = useSelector((state) => state.auth?.token) ?? null;
  const role = useSelector((state) => state.auth?.role) ?? null;
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      console.log("SecureLink", isLoggedIn, token, role);
      if (!isLoggedIn) {
        navigate("/");
      }
      console.log(isLoggedIn, token, role);
      setIsLoading(false);
    } catch (error) {
      console.error("SecureLink error", error);
    }
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return children;
};

export default SecureLink;
