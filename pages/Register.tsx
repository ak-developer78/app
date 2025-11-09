import React, { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { RegisterData } from '../api/authApi';

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterData>({
    name: '',
    email: '',
    password: '',
    department: '',
    year: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      await register(formData);
      navigate('/login', { 
        state: { 
          message: 'Registration successful! Please log in.',
          email: formData.email
        } 
      });
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
       {/* Left side with image */}
      <div className="hidden lg:block w-1/2 bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-primary bg-opacity-70 flex flex-col items-center justify-center text-white p-12 text-center">
            <h1 className="text-4xl font-bold tracking-wider">Join Our Community</h1>
            <p className="mt-4 text-lg max-w-sm">Create your account to connect with peers, access course materials, and stay updated with campus life.</p>
        </div>
      </div>

      {/* Right side with form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="max-w-md w-full">
            <h2 className="text-3xl font-bold text-center text-text-primary mb-8">Create an Account</h2>
            
            {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">{error}</p>}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required className="input-field" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required className="input-field" />
              <div className="relative">
                <input type={isPasswordVisible ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder="Password" required className="input-field" />
                <button type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-primary">
                  <i className={`fas ${isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              <div className="relative">
                <input type={isConfirmPasswordVisible ? 'text' : 'password'} name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required className="input-field" />
                <button type="button" onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-primary">
                  <i className={`fas ${isConfirmPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              <input type="text" name="department" value={formData.department} onChange={handleChange} placeholder="Department (e.g., Computer Science)" required className="input-field" />
              <input type="number" name="year" value={formData.year} onChange={handleChange} placeholder="Year (e.g., 2)" required className="input-field" />
              
              <button 
                type="submit" 
                disabled={isLoading} 
                className="w-full bg-primary hover:bg-red-800 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300 disabled:bg-gray-400"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <p className="text-center text-gray-500 text-sm mt-8">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-primary hover:underline">
                Login here
              </Link>
            </p>
        </div>
      </div>
       <style>{`
        .input-field {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid #D1D5DB;
          border-radius: 0.5rem;
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
        }
        .input-field:focus {
          outline: none;
          border-color: #8C1D40;
          box-shadow: 0 0 0 2px rgba(140, 29, 64, 0.25);
        }
      `}</style>
    </div>
  );
};

export default Register;