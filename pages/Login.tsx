import React, { useState, FormEvent, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(location.state?.message) {
      setSuccessMessage(location.state.message);
      if(location.state.email) {
        setEmail(location.state.email);
      }
      window.history.replaceState({}, document.title)
    }
  }, [location]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);
    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to log in. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left side with image */}
      <div className="hidden lg:block w-1/2 bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-primary bg-opacity-70 flex flex-col items-center justify-center text-white p-12 text-center">
            <h1 className="text-4xl font-bold tracking-wider">College Portal</h1>
            <p className="mt-4 text-lg max-w-sm">Welcome back! Access your courses, announcements, and campus resources all in one place.</p>
        </div>
      </div>

      {/* Right side with form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="max-w-md w-full">
            <h2 className="text-3xl font-bold text-center text-text-primary mb-8">Login to Your Account</h2>
            
            {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">{error}</p>}
            {successMessage && <p className="bg-green-100 text-green-700 p-3 rounded mb-4 text-center">{successMessage}</p>}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-text-secondary text-sm font-bold mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-text-secondary text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                    <input
                      id="password"
                      type={isPasswordVisible ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                      placeholder="******************"
                    />
                    <button 
                        type="button" 
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)} 
                        className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-primary"
                        aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                    >
                        <i className={`fas ${isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-red-800 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300 disabled:bg-gray-400"
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </button>
              </div>
            </form>

            <p className="text-center text-gray-500 text-sm mt-8">
              Don't have an account?{' '}
              <Link to="/register" className="font-bold text-primary hover:underline">
                Register here
              </Link>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Login;