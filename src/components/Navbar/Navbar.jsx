import React, { useContext, useEffect, useState } from 'react';
import logo from '../../assets/Images/freshcart-logo.svg';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlistContext';
import { FaShoppingCart, FaHeart, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const { token, logout } = useContext(AuthContext);
  const { numCartItems, getCartItems, clearCart } = useContext(CartContext);
  const { wishlistCount, displayWishlist } = useContext(WishlistContext);
  const [menuOpen, setMenuOpen] = useState(false);

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
    setMenuOpen(false); // close mobile menu if open
  };

  // Desktop center links (unchanged)
  const desktopLinks = token && (
    <div className="Links flex-grow hidden lg:flex justify-center">
      <ul className="flex space-x-3">
        <li>
          <NavLink className='text-[16px] font-semibold' to="/" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className="relative flex items-center gap-2 text-[16px] font-semibold" to="/cart">
            <div className="relative">
              <FaShoppingCart className="text-2xl text-green-500" />
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
              `relative flex items-center gap-2 text-[16px] font-semibold ${isActive ? "text-red-600" : "text-gray-700"}`
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <FaHeart
                    className={`text-2xl transition-colors ${isActive ? "text-red-600" : "text-gray-700 dark:text-gray-300"}`}
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
          <NavLink className='text-[16px] font-semibold' to="/categories">
            Categories
          </NavLink>
        </li>
        <li>
          <NavLink className='text-[16px] font-semibold' to="/brands">
            Brands
          </NavLink>
        </li>
        <li>
          <NavLink className='text-[16px] font-semibold' to="/orders">
            Orders
          </NavLink>
        </li>
      </ul>
    </div>
  );

  // Mobile menu (visible only below md)
  const mobileMenuLinks = token && (
    <div className={`lg:hidden absolute top-full left-0 w-full bg-[#F8F9FA] p-5 transition-all ${menuOpen ? 'block' : 'hidden'}`}>
      <ul className="flex flex-col space-y-3">
        <li>
          <NavLink className='text-[16px] font-semibold' to="/" end onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className="relative flex items-center gap-2 text-[16px] font-semibold" to="/cart" onClick={() => setMenuOpen(false)}>
            <div className="relative">
              <FaShoppingCart className="text-2xl text-green-500" />
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
              `relative flex items-center gap-2 text-[16px] font-semibold ${isActive ? "text-red-600" : "text-gray-700"}`
            }
            onClick={() => setMenuOpen(false)}
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <FaHeart
                    className={`text-2xl transition-colors ${isActive ? "text-red-600" : "text-gray-700 dark:text-gray-300"}`}
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
          <NavLink className='text-[16px] font-semibold' to="/categories" onClick={() => setMenuOpen(false)}>
            Categories
          </NavLink>
        </li>
        <li>
          <NavLink className='text-[16px] font-semibold' to="/brands" onClick={() => setMenuOpen(false)}>
            Brands
          </NavLink>
        </li>
        <li>
          <NavLink className='text-[16px] font-semibold' to="/orders" onClick={() => setMenuOpen(false)}>
            Orders
          </NavLink>
        </li>
        {/* Logout button inside mobile menu */} 
        <li>
          <button onClick={handleLogout} className='text-[16px] font-semibold text-red-600 hover:text-red-800'>
            Log Out
          </button>
        </li>
      </ul>
    </div>
  );

  return (
    <>
      <nav className="bg-[#F8F9FA] p-5 z-50 relative">
        <div className="container mx-auto flex items-center justify-between px-3 relative">
          {/* Logo */}
          <div className="logo">
            <Link to="/">
              <img
                src={logo}
                alt="FreshCart"
                onError={(e) => {
                  e.target.src = 'path/to/fallback-logo.png';
                }}
              />
            </Link>
          </div>

          {/* Desktop Center Links */}
          {desktopLinks}

          {/* Right Section: Social Icons, Entry Buttons & Mobile Hamburger */}
          <div className="flex items-center space-x-6">
            {/* Social Icons */}
            <div className="social hidden md:block">
              <ul className="flex space-x-3">
                <li>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-instagram instagram-icon"></i>
                  </a>
                </li>
                <li>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook-f social-icon facebook-icon"></i>
                  </a>
                </li>
                <li>
                  <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-tiktok social-icon tiktok-icon"></i>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter social-icon twitter-icon"></i>
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin social-icon linkedin-icon"></i>
                  </a>
                </li>
                <li>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-youtube social-icon youtube-icon"></i>
                  </a>
                </li>
              </ul>
            </div>

            {/* Entry Buttons (Desktop only) */}
            <div className="entry hidden lg:flex gap-3">
              {!token && (
                <>
                  <Link className="text-gray-600 cursor-pointer hover:text-black font-medium text-sm transition duration-200" to="/login">
                    Login
                  </Link>
                  <Link className="text-gray-600 cursor-pointer hover:text-black font-medium text-sm transition duration-200" to="/register">
                    Register
                  </Link>
                </>
              )}

              {token && (
                <button onClick={handleLogout} className="text-gray-600 cursor-pointer hover:text-black font-medium text-sm transition duration-200">
                  <i className="fas fa-sign-out-alt"></i> Log Out
                </button>
              )}
            </div>

            {/* Hamburger Menu Icon (Mobile only) */}
            <button className="lg:hidden text-2xl ml-3" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Links */}
        {mobileMenuLinks}
      </nav>
    </>
  );
};

export default Navbar;
