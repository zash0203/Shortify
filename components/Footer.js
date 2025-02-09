import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='h-20 bg-purple-700 flex justify-center px-3 items-center text-white fixed bottom-0 w-full'>
      <div className='text-sm text-center'>&copy; {new Date().getFullYear()} Shortify. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
