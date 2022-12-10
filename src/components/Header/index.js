import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <>
    <header className="shadow-sm py-2 mb-6 bg-white relative">
      <div className="flex items-center w-full justify-between container mx-auto">
        <div className="my-5 text-l sm:text-2xl font-bold text-green-900">
          <Link to="/" className="text-green-900 hover:text-green-900">
            Deveron Platform
          </Link>
        </div>
        <div className="flex text-sm sm:text-base justify-between gap-0 font-bold sm:gap-5">
          <a
            className="p-1 sm:p-3 text-green-900 hover:text-green-900 hover:bg-gray-200 transition duration-150 ease-in-out"
            href="https://www.deveronapp.com/terms.html"
            target="_blank"
            rel="noreferrer"
          >
            Terms
          </a>
          <a
            className="p-1 sm:p-3 text-green-900 hover:text-green-900 hover:bg-gray-200 transition duration-150 ease-in-out"
            href="https://www.deveronapp.com/privacy.html"
            target="_blank"
            rel="noreferrer"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </header>
    </>
  );
};

export default Header;
