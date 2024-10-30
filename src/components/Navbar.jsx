import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const WithNavbar = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  return (
    <section className="w-screen min-h-screen flex justify-center items-center flex-col">
      <Navbar>
        <IoMdArrowRoundBack
          className="text-3xl"
          onClick={() => navigate("/")}
        />

        <NavbarBrand>
          <p>
            Giri
            <span className="text-mainGreen">Guide</span>
          </p>
        </NavbarBrand>
        {isLoggedIn ? (
          <NavbarContent justify="end">
            <NavbarItem className="hidden lg:flex bg-successful rounded-xl px-8 py-2 hover:bg-successfulHover">
              <p
                href="#"
                className="text-neutral-50 font-bold"
                onClick={() => navigate("/login")}>
                Logout
              </p>
            </NavbarItem>
          </NavbarContent>
        ) : (
          <NavbarContent justify="end">
            <NavbarItem className="hidden lg:flex bg-successful rounded-xl px-8 py-2 hover:bg-successfulHover">
              <p
                href="#"
                className="text-neutral-50 font-bold"
                onClick={() => navigate("/login")}>
                Login
              </p>
            </NavbarItem>
          </NavbarContent>
        )}
      </Navbar>
      <main className="">{children}</main>
    </section>
  );
};

export default WithNavbar;
