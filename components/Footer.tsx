import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RealTimeClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className="text-center md:text-left">
      <p className="font-semibold">{time.toLocaleDateString()}</p>
      <p className="text-sm">{time.toLocaleTimeString()}</p>
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center md:text-left">
          <div>
            <h3 className="text-lg font-bold mb-2">College Portal</h3>
            <p className="text-sm text-gray-300">&copy; {new Date().getFullYear()} All Rights Reserved.</p>
             <div className="mt-4">
               <RealTimeClock />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Quick Links</h3>
            <div className="flex flex-col space-y-2 text-sm">
              <Link to="/about" className="hover:underline text-gray-300">About</Link>
              <Link to="/contact" className="hover:underline text-gray-300">Contact</Link>
              <Link to="/privacy-policy" className="hover:underline text-gray-300">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:underline text-gray-300">Terms of Service</Link>
            </div>
          </div>
          <div>
             <h3 className="text-lg font-bold mb-2">Follow Us</h3>
             <div className="flex justify-center md:justify-start space-x-4 text-2xl">
                <a href="#" aria-label="Facebook" className="text-gray-300 hover:text-white"><i className="fab fa-facebook-f"></i></a>
                <a href="#" aria-label="Twitter" className="text-gray-300 hover:text-white"><i className="fab fa-twitter"></i></a>
                <a href="#" aria-label="Instagram" className="text-gray-300 hover:text-white"><i className="fab fa-instagram"></i></a>
                <a href="#" aria-label="LinkedIn" className="text-gray-300 hover:text-white"><i className="fab fa-linkedin-in"></i></a>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;