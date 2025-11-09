import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

const Logo = () => (
    <svg className="h-8 w-auto text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L1 9l11 7 11-7L12 2z" />
        <path d="M1 9v6l11 7v-6L1 9z" />
        <path d="M23 9v6l-11 7v-6l11-9z" />
    </svg>
);


const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const profileMenuRef = useRef<HTMLDivElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        logout();
        setIsProfileMenuOpen(false);
        setIsMobileMenuOpen(false);
        navigate('/login');
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
                setIsProfileMenuOpen(false);
            }
             if (isMobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
                // A bit more complex logic to check if the click was on the hamburger button
                 const button = document.getElementById('mobile-menu-button');
                 if (button && !button.contains(event.target as Node)) {
                    setIsMobileMenuOpen(false);
                 }
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMobileMenuOpen]);

    const navLinks = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Courses', path: '/courses' },
        { name: 'Announcements', path: '/announcements' },
        { name: 'Exams', path: '/exams' },
        { name: 'Faculty', path: '/faculty' },
    ];

    const activeClassName = "bg-red-800 text-white";
    const inactiveClassName = "text-gray-200 hover:bg-red-700 hover:text-white";
    const linkClasses = "px-3 py-2 rounded-md text-sm font-medium transition-colors";

    return (
        <nav className="bg-primary shadow-lg sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    {/* --- DESKTOP LEFT --- */}
                    <div className="flex-1 flex items-center justify-start">
                        <Link to="/dashboard" className="flex-shrink-0 flex items-center space-x-3">
                            <Logo />
                            <span className="text-white text-xl font-bold hidden md:block">College Portal</span>
                        </Link>
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                {navLinks.map((link) => (
                                    <NavLink key={link.name} to={link.path} className={({ isActive }) => `${linkClasses} ${isActive ? activeClassName : inactiveClassName}`}>
                                        {link.name}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT SIDE ICONS & PROFILE (DESKTOP) --- */}
                    <div className="hidden sm:flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <Link to="/notifications" className="flex items-center space-x-2 p-1 rounded-md text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-white">
                            <i className="far fa-bell h-6 w-6"></i>
                            <span className="hidden lg:block text-sm font-medium">Notifications</span>
                        </Link>
                        
                        <div className="ml-3 relative" ref={profileMenuRef}>
                            <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} type="button" className="bg-primary flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                <span className="sr-only">Open user menu</span>
                                <img className="h-8 w-8 rounded-full object-cover" src={user?.profilePhotoUrl || 'https://i.pravatar.cc/150'} alt={user?.name} />
                            </button>
                            {isProfileMenuOpen && (
                                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
                                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                                        <p className="font-semibold">{user?.name}</p>
                                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                                    </div>
                                    <Link to="/profile" onClick={() => setIsProfileMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Your Profile</Link>
                                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* --- MOBILE MENU BUTTON --- */}
                    <div className="flex items-center sm:hidden">
                        <button id="mobile-menu-button" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded={isMobileMenuOpen}>
                            <span className="sr-only">Open main menu</span>
                            {isMobileMenuOpen ? (<i className="fas fa-times block h-6 w-6"></i>) : (<i className="fas fa-bars block h-6 w-6"></i>)}
                        </button>
                    </div>
                </div>
            </div>

            {/* --- MOBILE SLIDEOUT MENU --- */}
            <div className={`sm:hidden fixed inset-0 z-30 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
                {/* Overlay */}
                <div className="absolute inset-0 bg-black opacity-50" onClick={() => setIsMobileMenuOpen(false)}></div>
                
                {/* Menu Content */}
                <div ref={mobileMenuRef} className={`absolute top-0 right-0 h-full w-64 bg-primary shadow-xl transition-transform duration-300 ease-in-out transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="px-2 pt-16 pb-3 space-y-1">
                        {/* Profile Info in Mobile Menu */}
                         <div className="px-4 py-3 mb-3 border-b border-red-700">
                             <div className="flex items-center space-x-3">
                                 <img className="h-10 w-10 rounded-full object-cover" src={user?.profilePhotoUrl || 'https://i.pravatar.cc/150'} alt={user?.name} />
                                 <div>
                                     <p className="font-semibold text-white">{user?.name}</p>
                                     <p className="text-xs text-gray-300 truncate">{user?.email}</p>
                                 </div>
                             </div>
                         </div>
                        
                         {/* Nav Links */}
                         {navLinks.map((link) => (
                            <NavLink key={link.name} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => `block ${linkClasses} ${isActive ? activeClassName : inactiveClassName}`}>
                                {link.name}
                            </NavLink>
                        ))}
                        
                        {/* Action Links */}
                        <div className="pt-4 mt-4 border-t border-red-700 space-y-1">
                            <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className={`block ${linkClasses} ${inactiveClassName}`}>Your Profile</Link>
                             <Link to="/notifications" onClick={() => setIsMobileMenuOpen(false)} className={`block ${linkClasses} ${inactiveClassName}`}>Notifications</Link>
                            <button onClick={handleLogout} className={`block w-full text-left ${linkClasses} ${inactiveClassName}`}>Sign out</button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;