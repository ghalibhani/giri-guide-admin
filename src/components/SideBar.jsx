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
    { name: "Rute", link: "/route" },
    { name: "Daftar Transaction", link: "/transaction" },
    { name: "Widraw", link: "/widraw" },
  ];

  const navigate = useNavigate();
  const [navbarActive, setNavbarActive] = useState(active || "/dashboard");
  const [searchMountain, setSearchMountain] = useState("");
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

  const handleSearch = (e) => {
    setSearchMountain(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchMountain({ search: searchMountain, page: 1, limit: 12 }));
  };

  useEffect(() => {
    if (active) {
      setNavbarActive(active);
    }
  }, [active]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <nav className="bg-gray-100 h-screen flex flex-col shadow-lg w-[300px] fixed">
        <header className="p-6 bg-white flex-shrink-0 shadow-md">
          <h1 className="text-2xl font-bold text-mainGreen">GiriGuide</h1>
        </header>
        <section className="flex flex-col flex-grow mt-4">
          {links.map((link) => (
            <button
              key={link.name}
              className={`hover:bg-mainGreen hover:text-white transition-colors w-full px-4 ${
                navbarActive === link.link ? "bg-mainSoil text-white" : ""
              }`}
              onClick={() => setNavbarActive(link.link)}>
              <Link to={link.link} className="block py-4 text-start">
                {link.name}
              </Link>
            </button>
          ))}
          <li className="p-4 hover:text-white transition-colors">
            <form onSubmit={handleSearchSubmit}>
              {navbarActive === "/mountain" && (
                <input
                  type="search"
                  className="w-full p-2 rounded-md text-zinc-950"
                  placeholder="Search Mountain Name"
                  value={searchMountain}
                  onChange={handleSearch}
                />
              )}
            </form>
          </li>
          <li className="p-4 hover:text-white transition-colors">
            <Button
              className="w-full bg-error text-white"
              onClick={handleLogout}>
              Logout
            </Button>
          </li>
        </section>
      </nav>
      {/* Main Content */}
      <section className="ml-[300px] flex-grow p-6 h-screen overflow-y-scroll">
        {children}
      </section>
    </div>
  );
};

export default SideBar;
