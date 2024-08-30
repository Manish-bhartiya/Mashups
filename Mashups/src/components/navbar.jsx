import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoSearchOutline } from "react-icons/io5";
import Logout from './logout';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthUser } from '../features/authSlice';
import { fetchResults, togglePage } from '../features/searchSlice';
import SearchResults from '../components/searchResulst';
import SearchBar from './searchbar';
const Navbar = () => {
  const authUser = useSelector(selectAuthUser);
  const [sticky, setSticky] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [term, setTerm] = useState("");
  const [changePage,setChangePage] = useState(false);

  const dispatch = useDispatch();
  const searchStatus = useSelector((state) => state.search.status);

  const submitHandler = (e) => {
    e.preventDefault();
    if (term.trim()) {
      dispatch(fetchResults(term));
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleInputChange = (e) => {
    setTerm(e.target.value);
    if (e.target.value.trim()) {
        dispatch(fetchResults(e.target.value));
        dispatch(togglePage(true));
    } else {
        dispatch(togglePage(false));
    }
};
  const navItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/explore">Explore</Link>
      </li>
      <li>
        <Link to="/favorites">Favorites</Link>
      </li>
      <li>
        <Link to="/about">About Us</Link>
      </li>
    </>
  );

  return (
    <div className={`navbar bg-black border-b-2 border-white text-white ${sticky ? 'sticky' : ''}`}>
      <nav className="container mx-auto p-4 flex items-center justify-between">
        <div className="navbar-start flex items-center">
          <div className="dropdown lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost"
              onClick={toggleDropdown}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            {dropdownVisible && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {navItems}
              </ul>
            )}
          </div>
          <Link to="/" className="bold font-extrabold">
            <img
              src="https://res.cloudinary.com/dhfjy459o/image/upload/v1722677369/logo_2-removebg-preview_nwfo5w.png"
              alt="Logo"
              className="h-16"
            />
          </Link>
        </div>
        <div className="    ">
         <SearchBar/>
        </div>
        <div className="navbar-end flex items-center">
          <div className="navbar-center hidden lg:flex mr-3">
            <ul className="menu flex felx-col gap-10">{navItems}</ul>
          </div>
          {authUser ? (
            <Logout />
          ) : (
            <div className="p-2">
              <Link
                to="/signin"
                className="bg-black text-white p-2 rounded-md hover:bg-slate-800 duration-150 cursor-pointer"
              >
                Signin
              </Link>
            </div>
          )}
        </div>
      </nav>
      {/* {term && searchStatus !== 'idle' && <SearchResults term={term} />} */}
    </div>
  );
};

export default Navbar;
