import React from "react";

const Header = () => {
  return (
    <header className="container px-6 py-5 mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">아 맞다 우산</h1>
        <div className="flex items-center space-x-4">
          <a
            href="#"
            className="text-sm font-semibold text-white hover:text-gray-200"
          >
            Home
          </a>
          <a
            href="#"
            className="text-sm font-semibold text-white hover:text-gray-200"
          >
            About
          </a>
          <a
            href="#"
            className="text-sm font-semibold text-white hover:text-gray-200"
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
