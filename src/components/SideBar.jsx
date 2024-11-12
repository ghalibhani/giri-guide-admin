import { Link, useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/feature/authSlice";
import { fetchMountain } from "../redux/feature/mountainSlice";

const SideBar = ({ children, active }) => {
  const links = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Mountain", link: "/mountain" },
    { name: "Tour Guide", link: "/tour-guide" },
    { name: "Route", link: "/route" },
    { name: "List Transaction", link: "/transaction" },
    { name: "Withdraw", link: "/withdraw" },
  ];

  const navigate = useNavigate();
  const [navbarActive, setNavbarActive] = useState(active || "/dashboard");
  // const [searchMountain, setSearchMountain] = useState("");
  const dispatch = useDispatch();

  const handleLogout = () => {
    try {
      localStorage.clear();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    if (active) {
      setNavbarActive(active);
    }
  }, [active]);

  return (
    <div className='flex h-screen'>
      <nav className='bg-gray-100 h-screen flex flex-col shadow-lg w-[300px] fixed'>
        <header className='p-6 bg-white flex-shrink-0 shadow-md'>
          <h1 className='text-2xl font-bold text-mainGreen'>
            <span className='text-mainSoil'>Giri</span>Guide
          </h1>
        </header>
        <section className='flex flex-col flex-grow mt-4'>
          {links.map((link) => (
            <button
              key={link.name}
              className={`hover:bg-mainGreen hover:text-white transition-colors w-full px-4 ${
                navbarActive === link.link ? "bg-mainSoil text-white" : ""
              }`}
              onClick={() => setNavbarActive(link.link)}
            >
              <Link to={link.link} className='block py-4 text-start'>
                {link.name}
              </Link>
            </button>
          ))}
          <Button className='w-full bg-error text-white' onClick={handleLogout}>
            Logout
          </Button>
        </section>
      </nav>
      <section className='ml-[300px] flex-grow p-6 h-screen overflow-y-scroll'>
        {children}
      </section>
    </div>
  );
};

export default SideBar;
