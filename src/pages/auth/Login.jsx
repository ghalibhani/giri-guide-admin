import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { keepLogin, login } from "../../redux/feature/authSlice";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const token = useSelector((state) => state.auth.token);
  let status = useSelector((state) => state.auth.status);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  useEffect(() => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setIsEmailValid(email ? emailRegex.test(email) : true);
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setIsPasswordValid(password ? passwordRegex.test(password) : true);
  }, [email, password]);

  const handleLogin = async () => {
    if (!email || !password) {
      // sementara
      navigate("/");
      // sementara
      alert("Email dan Password harus di isi");
      return;
    }
    if (!isEmailValid || !isPasswordValid) {
      return;
    }
    dispatch(login({ email, password }));
  };
  useEffect(() => {
    const getKeepLogin = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        dispatch(keepLogin(token));
        navigate("/dashboard");
      }
    };
    getKeepLogin();
  }, []);
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("token", token);
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    }
  }, [isLoggedIn, navigate, token]);
  useEffect(() => {
    if (status === "failed") {
      alert("Email atau Password anda salah");
    }
  }, [status]);
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <div className="flex flex-col gap-4 justify-center items-center h-[400px] px-4 py-2 rounded-2xl bg-[#fefefe] w-96">
        <h3 className="text-3xl font-bold">Login as a admin</h3>
        <section className="w-full">
          <Input
            key="bordered"
            type="email"
            label="Email"
            color="successSecondary"
            variant="bordered"
            onChange={(e) => setEmail(e.target.value)}
          />
          {isEmailValid ? "" : <p className="text-error">Email Invalid</p>}
        </section>
        <section className="w-full">
          <Input
            key="bordered"
            type="password"
            label="Password"
            color="successSecondary"
            variant="bordered"
            onChange={(e) => setPassword(e.target.value)}
          />
          {isPasswordValid ? (
            ""
          ) : (
            <p className="text-error">
              Password Invalid ( minimal 8 character , uppercase , lowercase ,
              number , special character)
            </p>
          )}
        </section>
        <Button
          className={` px-5 py-2 rounded-md text-bgLight font-bold w-full ${
            !isEmailValid || !isPasswordValid
              ? "bg-successfulSecondary text-neutral-900"
              : "bg-successful hover:bg-successfulHover"
          }`}
          onClick={handleLogin}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
