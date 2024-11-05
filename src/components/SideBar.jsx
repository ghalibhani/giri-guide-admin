import { Link, useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/feature/authSlice";

const SideBar = ({ children, active }) => {
  const links = [
    { name: "Dashboard", link: "/mountain" },
    { name: "Mountain", link: "/mountain" },
    { name: "Tour Guide", link: "/tour-guide" },
  ];

  const navigate = useNavigate();
  const [navbarActive, setNavbarActive] = useState(active || "/mountain");
  const [searchMountain, setSearchMountain] = useState("");
  const dispatch = useDispatch();

  const handleLogout = () => {
    try {
      localStorage.clear();
      dispatch(logout());
      navigate("/login"); // Redirect to login after logout
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchMountain(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/mountain?name=${searchMountain}`);
  };

  useEffect(() => {
    if (active) {
      setNavbarActive(active);
    }
  }, [active]);

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
                navbarActive === link.link ? "bg-mainGreen text-white" : ""
              }`}
              onClick={() => setNavbarActive(link.link)}>
              <Link to={link.link} className="block">
                {link.name}
              </Link>
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
