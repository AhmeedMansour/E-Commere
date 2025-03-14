import React, { useContext, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { AuthContext } from '../../Context/AuthContext';

const Layout = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();


  // Hide Navbar & Footer on login, register and other  pages like forgot password 
  const authPages = ['/login', '/register','/forgotpassword','/forgotpassword/resetcode','/forgotpassword/resetpassword'];
  const isAuthPage = authPages.includes(location.pathname);

  return (
    <>
      {!isAuthPage && <Navbar />}
      <Outlet />
      {!isAuthPage && <Footer />}
    </>
  );
};

export default Layout;
