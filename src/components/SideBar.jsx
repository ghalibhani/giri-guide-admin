import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/feature/authSlice";
const SideBar = ({ children }) => {
  const links = [
    { name: "Dashboard", link: "/mountain" },
    { name: "Mountain", link: "/mountain" },
    { name: "Tour Guide", link: "/tour-guide" },
  ];

  const navigate = useNavigate();
  const [navbarActive, setNavbarActive] = useState("/mountain");
  const [searchMountain, setSearchMountain] = useState("");
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userId");
      localStorage.removeItem("role");
      localStorage.removeItem("email");
      dispatch(logout());
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleSearch = (e) => {
    setSearchMountain(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/mountain?name=${searchMountain}`);
  };

  return (
    <div className="flex h-screen">
      <nav className="w-64 bg-gray-100 h-screen flex flex-col shadow-lg">
        <header className="p-6 bg-white flex-shrink-0 shadow-md">
          <h1 className="text-2xl font-bold text-mainGreen">GiriGuide</h1>
        </header>
        <ul className="list-none flex-grow overflow-y-auto">
          {links.map((link) => (
            <li
              key={link.name}
              className={`p-4 hover:bg-mainGreen hover:text-white transition-colors ${
                navbarActive == link.name.toLowerCase()
                  ? "bg-mainGreen text-white"
                  : ""
              }`}
              onClick={() => setNavbarActive(link.name.toLowerCase())}>
              <a href={link.link} className="block">
                {link.name}
              </a>
            </li>
          ))}
          <li className="p-4 hover:bg-red-600 hover:text-white transition-colors">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="search"
                className="w-full p-2 rounded-md"
                placeholder="Search Mountain Name"
                value={searchMountain}
                onChange={handleSearch}
              />
            </form>
          </li>
          <li className="p-4 hover:bg-red-600 hover:text-white transition-colors">
            <Button
              className="w-full bg-red-500 text-white hover:bg-red-600"
              onClick={handleLogout}>
              Logout
            </Button>
          </li>
        </ul>
      </nav>
      <section className="flex-grow p-6">{children}</section>
    </div>
  );
};

export default SideBar;
