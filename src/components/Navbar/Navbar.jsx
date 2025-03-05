import React, { useContext, useEffect } from 'react';
import logo from '../../assets/Images/freshcart-logo.svg'; // Verify this path
import { Link, NavLink, useNavigate } from 'react-router-dom'; // Ensure react-router-dom is installed
import { AuthContext } from '../../Context/AuthContext';
import { CartContext } from '../../Context/CartContext';
import { FaShoppingCart } from "react-icons/fa"; // Import shopping cart icon
import { FaHeart } from "react-icons/fa"; // Import heart icon for wishlist
import { WishlistContext } from '../../Context/WishlistContext';
const Navbar = () => {
  const navigate = useNavigate();
  const { token,logout } = useContext(AuthContext)
  const {numCartItems,getCartItems,clearCart} = useContext(CartContext);
    const { wishlistCount, displayWishlist } = useContext(WishlistContext);
  // Add useEffect to refresh cart when token changes
  useEffect(() => {
    if (token) {
      getCartItems();
      displayWishlist();
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    logout();
    clearCart(); // Use the context method
    navigate('/login', { replace: true });
  };
  return (
    <>
      <nav className="bg-[#F8F9FA] p-5 z-50">
        <div className="container mx-auto flex items-center justify-between px-3">
          {/* Logo */}
          <div className="logo">
            <Link to="/">
              <img
                src={logo}
                alt="FreshCart"
                onError={(e) => {
                  e.target.src = 'path/to/fallback-logo.png'; // Provide a fallback logo path
                }}
              />
            </Link>
          </div>
          {/* Links - Centered  ---- if you want to always render home => remove it from token and guard in app*/}
          {token ? <div className="Links flex-grow flex justify-center">
            <ul className="flex space-x-3">
              <li>
                <NavLink className='text-[16px] font-semibold' to="/">Home</NavLink>
              </li>
              <li>


                <NavLink className="relative flex items-center gap-2 text-[16px] font-semibold" to="/cart">
                  <div className="relative">
                    <FaShoppingCart className="text-2xl text-green-500 " />
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
                    `relative flex items-center gap-2 text-[16px] font-semibold ${isActive ? "text-red-600" : "text-gray-700"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="relative">
                        <FaHeart
                          className={`text-2xl transition-colors ${isActive ? "text-red-600" : "text-gray-700 dark:text-gray-300"
                            }`}
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
                <NavLink className='text-[16px] font-semibold' to="/categories">Categories</NavLink>
              </li>

              <li>
                <NavLink className='text-[16px] font-semibold' to="/brands">Brands</NavLink>
              </li>
              <li>
                <NavLink className='text-[16px] font-semibold' to="/orders">Orders</NavLink>
              </li>
            </ul>
          </div> : null}


          {/* Social Icons */}
          {/* Right-Aligned Social Icons & Entry Buttons */}
          <div className="flex items-center space-x-6">
            {/* Social Icons (Always on Right) */}
            <div className="social">
              <ul className="flex space-x-3">
                <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram instagram-icon "></i>
                </a></li>

                <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f social-icon facebook-icon"></i></a></li>
                <li><a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-tiktok social-icon tiktok-icon"></i></a></li>
                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter social-icon twitter-icon"></i></a></li>
                <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin social-icon linkedin-icon"></i></a></li>
                <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube social-icon youtube-icon"></i></a></li>



              </ul>
            </div>

            {/* Entry Buttons */}
            <div className="entry flex gap-3">
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
                  <i className="fas fa-sign-out-alt"></i>  Log Out
                </button>
              )}
            </div>

          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
