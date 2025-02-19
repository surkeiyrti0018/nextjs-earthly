// components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-200 text-gray-700 py-4">
      <div className="container mx-auto text-center">
        <p className="text-xs sm:text-sm mb-2">&copy; 2025 Earthly Nature Sounds. All rights reserved.</p>
        <ul className="flex justify-center space-x-4">
          <li>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 text-xs sm:text-sm">
              Facebook
            </a>
          </li>
          <li>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600 text-xs sm:text-sm">
              Twitter
            </a>
          </li>
          <li>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700 text-xs sm:text-sm">
              Instagram
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
