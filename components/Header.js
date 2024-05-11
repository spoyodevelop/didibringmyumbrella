import React from "react";

const Header = () => {
  return (
    <header class="container mx-auto px-6 py-5">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-white">아 맞다 우산</h1>
        <div class="flex items-center space-x-4">
          <a
            href="#"
            class="text-white text-sm font-semibold hover:text-gray-200"
          >
            Home
          </a>
          <a
            href="#"
            class="text-white text-sm font-semibold hover:text-gray-200"
          >
            About
          </a>
          <a
            href="#"
            class="text-white text-sm font-semibold hover:text-gray-200"
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
