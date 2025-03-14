import React, { useContext, useEffect, useState } from 'react';
import logo from '../../assets/Images/freshcart-logo.svg';
import logo2 from '../../assets/Images/favicon.png';
import sun from '../../assets/Images/sun.png';
import moon from '../../assets/Images/full-moon.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlistContext';
import { FaShoppingCart, FaHeart, FaBars, FaTimes } from 'react-icons/fa';
import { BsSun, BsMoon } from 'react-icons/bs';
import { ThemeContext } from '../../Context/ThemeContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { token, logout } = useContext(AuthContext);
  const { numCartItems, getCartItems, clearCart } = useContext(CartContext);
  const { wishlistCount, displayWishlist } = useContext(WishlistContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    if (token) {
      getCartItems();
      displayWishlist();
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    logout();
    clearCart();
    navigate('/login', { replace: true });
    setMenuOpen(false);
  };

  // Desktop center links
  const desktopLinks = token && (
    <div className="Links flex-grow hidden lg:flex justify-center">
      <ul className="flex space-x-5">
        <li>
          <NavLink className="text-[16px] font-semibold text-gray-700 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400" to="/" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className="relative flex items-center gap-2 text-[16px] font-semibold text-gray-700 dark:text-gray-200" to="/cart">
            <div className="relative">
              <FaShoppingCart className="text-2xl text-green-500 dark:text-green-400" />
              {numCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {numCartItems}
                </span>
              )}
            </div>
            <span>Cart</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              `relative flex items-center gap-2 text-[16px] font-semibold ${isActive ? "text-red-600 dark:text-red-500" : "text-gray-700 dark:text-gray-200"}`
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <FaHeart
                    className={`text-2xl transition-colors ${isActive ? "text-red-600 dark:text-red-500" : "text-gray-700 dark:text-gray-300"}`}
                  />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {wishlistCount}
                    </span>
                  )}
                </div>
                <span>Wishlist</span>
              </>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink className="text-[16px] font-semibold text-gray-700 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400" to="/categories">
            Categories
          </NavLink>
        </li>
        <li>
          <NavLink className="text-[16px] font-semibold text-gray-700 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400" to="/brands">
            Brands
          </NavLink>
        </li>
        <li>
          <NavLink className="text-[16px] font-semibold text-gray-700 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400" to="/orders">
            Orders
          </NavLink>
        </li>
        <li>
          <NavLink className="text-[16px] font-semibold text-gray-700 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400" to="/userdetails">
            User Details
          </NavLink>
        </li>
      </ul>
    </div>
  );

  // Mobile menu
  const mobileMenuLinks = token && (
    <div className={`lg:hidden absolute top-full left-0 w-full bg-[#F8F9FA] dark:bg-gray-800 p-5 transition-all ${menuOpen ? 'block' : 'hidden'}`}>
      <ul className="flex flex-col space-y-3">
        <li>
          <NavLink
            className="text-[16px] font-semibold text-gray-700 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400"
            to="/"
            end
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className="relative flex items-center gap-2 text-[16px] font-semibold text-gray-700 dark:text-gray-200"
            to="/cart"
            onClick={() => setMenuOpen(false)}
          >
            <div className="relative">
              <FaShoppingCart className="text-2xl text-green-500 dark:text-green-400" />
              {numCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {numCartItems}
                </span>
              )}
            </div>
            <span>Cart</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              `relative flex items-center gap-2 text-[16px] font-semibold ${isActive ? "text-red-600 dark:text-red-500" : "text-gray-700 dark:text-gray-200"}`
            }
            onClick={() => setMenuOpen(false)}
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <FaHeart
                    className={`text-2xl transition-colors ${isActive ? "text-red-600 dark:text-red-500" : "text-gray-700 dark:text-gray-300"}`}
                  />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {wishlistCount}
                    </span>
                  )}
                </div>
                <span>Wishlist</span>
              </>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink
            className="text-[16px] font-semibold text-gray-700 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400"
            to="/categories"
            onClick={() => setMenuOpen(false)}
          >
            Categories
          </NavLink>
        </li>
        <li>
          <NavLink
            className="text-[16px] font-semibold text-gray-700 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400"
            to="/brands"
            onClick={() => setMenuOpen(false)}
          >
            Brands
          </NavLink>
        </li>
        <li>
          <NavLink
            className="text-[16px] font-semibold text-gray-700 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400"
            to="/orders"
            onClick={() => setMenuOpen(false)}
          >
            Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            className="text-[16px] font-semibold text-gray-700 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400"
            to="/userdetails"
            onClick={() => setMenuOpen(false)}
          >
            User Details
          </NavLink>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="text-[16px] font-semibold text-red-600 dark:text-red-500 hover:text-red-800 dark:hover:text-red-600"
          >
            Log Out
          </button>
        </li>
      </ul>
    </div>
  );

  return (
    <nav className="bg-[#F8F9FA] dark:bg-gray-700 p-5 z-50 relative shadow-md">
      <div className="container mx-auto flex items-center justify-between px-3 relative">
        {/* Logo & Dark Mode Toggle */}
        <div className="logo flex items-center space-x-4">
          <Link to="/">
            <div className="logo flex items-center space-x-2">
              <img src={logo2} alt="FreshCart" className="h-6 md:h-8 lg:h-10 transition-all" />
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700 dark:text-gray-300 hidden sm:block">
                FreshCart
              </h2>
            </div>
          </Link>
          <button
            onClick={toggleDarkMode}
            className="text-xl text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors focus:outline-none flex items-center border-transparent p-2 rounded-2xl ms-3 "
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <img src={isDarkMode ? moon : sun} alt={isDarkMode ? "Moon" : "Sun"} className=" h-6 w-full" />
          </button>
        </div>

        {/* Desktop Center Links */}
        {desktopLinks}

        {/* Right Section: Social Icons, Entry Buttons & Mobile Hamburger */}
        <div className="flex items-center space-x-6">
          {/* Social Icons */}
          <div className="social hidden md:block">
            <ul className="flex space-x-3">
              <li>
                <Link to="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-instagram text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors"></i>
                </Link>
              </li>
              <li>
                <Link to="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"></i>
                </Link>
              </li>
              <li>
                <Link to="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-tiktok text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-gray-100 transition-colors"></i>
                </Link>
              </li>
              <li>
                <Link to="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter text-gray-600 dark:text-gray-300 hover:text-blue-400 dark:hover:text-blue-300 transition-colors"></i>
                </Link>
              </li>
              <li>
                <Link to="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-600 transition-colors"></i>
                </Link>
              </li>
              <li>
                <Link to="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-youtube text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 transition-colors"></i>
                </Link>
              </li>
            </ul>
          </div>

          {/* Entry Buttons (Desktop only) */}
          <div className="entry hidden lg:flex gap-3">
            {!token && (
              <>
                <Link
                  className="text-gray-600 dark:text-gray-300 cursor-pointer hover:text-black dark:hover:text-white font-medium text-sm transition duration-200"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="text-gray-600 dark:text-gray-300 cursor-pointer hover:text-black dark:hover:text-white font-medium text-sm transition duration-200"
                  to="/register"
                >
                  Register
                </Link>
              </>
            )}
            {token && (
              <button
                onClick={handleLogout}
                className="text-gray-600 dark:text-gray-300 cursor-pointer hover:text-black dark:hover:text-white font-medium text-sm transition duration-200"
              >
                <i className="fas fa-sign-out-alt"></i> Log Out
              </button>
            )}
          </div>

          {/* Hamburger Menu Icon (Mobile only) */}
          <button className="lg:hidden text-2xl ml-3 text-gray-700 dark:text-gray-200" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Links */}
      {mobileMenuLinks}
    </nav>
  );
};

export default Navbar;