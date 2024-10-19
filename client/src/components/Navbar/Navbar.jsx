
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { FaPowerOff } from 'react-icons/fa';
import logo from "../../assets/logo.jpg"

const Navbar = ({setToken}) => {
  const { user, logout } = useContext(UserContext); 
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    setToken(null); 
    navigate('/login'); 
  };

  return (
    <nav className="flex items-center justify-between p-4 text-gray-800">
      <div className="flex items-center">
        <Link to="/" className="text-xl font-bold">
          <img src={logo} alt="Logo" className="h-10 mr-2" />
        </Link>
      </div>
      <div className="flex items-center">
        {user ? (
          <>
            <div className='flex flex row justify-center items-center mr-4 p-2 gap-4' style={{border:"1px solid gray",borderRadius:"20px"}}>
              <div className='px-2 bg-gray-300' style={{border:"1px solid gray",borderRadius:"50%"}}>{user.companyEmail.charAt(0).toUpperCase()}</div>
            <span className='hidden md:flex lg:flex 2xl:flex sm:hidden 3xl:flex'>{user.companyEmail}</span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded  text-red-400 hover:text-red-600"
            >
              <FaPowerOff/>
            </button>
          </>
        ) : (
          <Link to="/contact" className="text-gray hover:underline">
            Contact
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
