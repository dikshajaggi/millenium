import React, { useContext } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { MainContext } from '../context/MainContext';
import Search from './Search';
import logo from '../assests/dwarkaorthologo.png';
import { ShoppingCart, LogIn, LogOut, Gift, User } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const { token, setToken } = useContext(MainContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const routes = ["brackets", "bands_and_tubes", "wires_and_springs", "miscellaneous", "orthodontic_pliers", "elastomerics"];
  const showSearch = !(
    routes.includes(params.category) ||
    ["/contact", "/terms_conditions", "/about", "/blog", "/cart", "/place-order"].includes(location.pathname)
  );

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Left: Logo + Search */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-2/3">
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="Logo" className="h-14 md:h-16 object-contain" />
          </Link>

          {showSearch && (
            <div className="w-full">
              <Search />
            </div>
          )}
        </div>

        {/* Right: Navigation */}
        <div className="flex flex-wrap gap-4 justify-center md:justify-end items-center w-full md:w-1/3 text-gray-700 text-sm sm:text-base">
          <Link to="/offers" className="flex items-center gap-1 hover:text-primary transition">
            <Gift size={18} /> <span>Offers</span>
          </Link>

          <Link to="/cart" className="flex items-center gap-1 hover:text-primary transition">
            <ShoppingCart size={18} /> <span>Cart</span>
          </Link>

          {!token ? (
            <Link to="/login" className="flex items-center gap-1 hover:text-primary transition">
              <LogIn size={18} /> <span>Login</span>
            </Link>
          ) : (
            <>
              <span className="flex items-center gap-1">
                <User size={18} /> <span>Welcome</span>
              </span>
              <button onClick={handleLogout} className="flex items-center gap-1 text-red-600 hover:underline">
                <LogOut size={18} /> <span>Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;