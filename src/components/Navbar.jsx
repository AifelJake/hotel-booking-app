import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Navbar = () => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation items
  const navItems = [
    { id: 1, text: 'Home', path: '/' },
    { id: 2, text: 'Rooms', path: '/bookrooms' },
    { id: 3, text: 'Activities', path: '/activities' },
    { id: 4, text: 'Dashboard', path: '/dashboard' },
    { id: 5, text: 'Login', path: '/login' },
  ];

  return (
    <div className=' flex justify-between items-center py-4 bg-white fixed top-0 left-0 md-w-full w-[100vw] z-50 mx-auto px-4 border-b-3 '>
      {/* Logo */}
      <h1 className='w-full md-text-3xl text-2xl ml-10 font-bold text-[#00df9a]'>AWH</h1>

      {/* Desktop Navigation */}
      <ul className='hidden md:flex'>
        {navItems.map(item => (
          <li
            key={item.id}
            className='p-4 hover:bg-[#00df9a] rounded-xl cursor-pointer duration-300 hover:text-black'
          >
            <Link to={item.path}>{item.text}</Link> 
          </li>
        ))}
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
        }
      >
        {/* Mobile Logo */}
        <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>REACT.</h1>

        {/* Mobile Navigation Items */}
        {navItems.map(item => (
          <li
            key={item.id}
            className='p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600'
          >
            <Link to={item.path}>{item.text}</Link> {/* Use Link component */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
