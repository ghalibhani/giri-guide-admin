import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SecureLink = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && role == "admin") {
      navigate("/");
    }
    console.log(isLoggedIn, token, role);
    setIsLoading(false);
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return children;
};

export default SecureLink;
