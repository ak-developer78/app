// Fix: Create the Profile component to resolve module import error.
import React, { useState, FormEvent, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateUser as apiUpdateUser } from '../api/userApi';
import { getEnrolledCourses } from '../api/courseApi';
import Loader from '../components/Loader';
import { User, Course } from '../types';

const Profile: React.FC = () => {
  const { user, updateUser, isLoading: isAuthLoading } = useAuth();
  const [formData, setFormData] = useState<Partial<User>>({});
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setFormData({ ...user });
      const fetchCourses = async () => {
        const courses = await getEnrolledCourses(user.id);
        setEnrolledCourses(courses);
      };
      fetchCourses();
    }
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData(prev => ({ ...prev, profilePhotoUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handlePhotoClick = () => {
    if (isEditing) {
        fileInputRef.current?.click();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleCancel = () => {
      if(user) setFormData({ ...user });
      setIsEditing(false);
      setImagePreview(null);
      setError(null);
      setSuccess(null);
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsUpdating(true);
    setError(null);
    setSuccess(null);
    try {
      const updatedUserData = await apiUpdateUser(user.id, formData);
      updateUser(updatedUserData);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      setImagePreview(null);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile.');
    } finally {
      setIsUpdating(false);
    }
  };

  if (isAuthLoading || !user) {
    return <div className="flex justify-center items-center h-96"><Loader /></div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* --- HEADER --- */}
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="relative">
            <img
              className="h-28 w-28 rounded-full object-cover border-4 border-primary shadow-md"
              src={imagePreview || formData.profilePhotoUrl}
              alt={formData.name}
            />
            {isEditing && (
                <button onClick={handlePhotoClick} className="absolute bottom-0 right-0 bg-secondary text-primary rounded-full p-2 hover:bg-yellow-500 transition-colors" title="Change profile photo">
                    <i className="fas fa-camera"></i>
                </button>
            )}
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-text-primary text-center sm:text-left">{formData.name}</h1>
          <p className="text-text-secondary text-center sm:text-left">{formData.email}</p>
          <p className="text-sm text-gray-600 capitalize text-center sm:text-left">{user.role} Account</p>
        </div>
      </div>
      
      {error && <p className="bg-red-100 text-red-700 p-3 rounded text-center">{error}</p>}
      {success && <p className="bg-green-100 text-green-700 p-3 rounded text-center">{success}</p>}

      {/* --- FORM & CONTENT --- */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          {/* --- ACADEMIC SNAPSHOT --- */}
          <div className="border-b pb-4 mb-6">
            <h2 className="text-xl font-semibold text-primary mb-4">Academic Snapshot</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p><strong className="text-gray-600">Major:</strong> {formData.major || 'Not specified'}</p>
                <p><strong className="text-gray-600">GPA:</strong> {formData.gpa || 'N/A'}</p>
                <p><strong className="text-gray-600">Advisor:</strong> {formData.advisor || 'Not assigned'}</p>
                <p><strong className="text-gray-600">Expected Graduation:</strong> {formData.expectedGraduation || 'N/A'}</p>
            </div>
          </div>
          
          {/* --- ABOUT ME --- */}
           <div className="border-b pb-4 mb-6">
             <h2 className="text-xl font-semibold text-primary mb-2">About Me</h2>
             {isEditing ? (
                 <textarea name="bio" value={formData.bio || ''} onChange={handleChange} rows={4} className="w-full p-2 border rounded-md"></textarea>
             ) : (
                 <p className="text-text-secondary italic">{formData.bio || 'No bio provided.'}</p>
             )}
          </div>
          
          {/* --- CONTACT & PERSONAL INFO --- */}
          <div className="border-b pb-4 mb-6">
            <h2 className="text-xl font-semibold text-primary mb-4">Contact & Personal Information</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone || ''} onChange={handleChange} disabled={!isEditing} className="mt-1 block w-full input-field" />
                 </div>
                 <div>
                     <label className="block text-sm font-medium text-gray-700">Address</label>
                     <input type="text" name="address" value={formData.address || ''} onChange={handleChange} disabled={!isEditing} className="mt-1 block w-full input-field" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Department</label>
                    <input type="text" name="department" value={formData.department || ''} onChange={handleChange} disabled={!isEditing} className="mt-1 block w-full input-field" />
                 </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Year</label>
                    <input type="number" name="year" value={formData.year || ''} onChange={handleChange} disabled={!isEditing} className="mt-1 block w-full input-field" />
                 </div>
            </div>
          </div>

        {/* --- ENROLLED COURSES --- */}
        <div>
             <h2 className="text-xl font-semibold text-primary mb-4">Current Courses</h2>
             <ul className="space-y-2">
                 {enrolledCourses.map(course => (
                     <li key={course.id} className="p-3 bg-gray-50 rounded-md">{course.name}</li>
                 ))}
             </ul>
        </div>
        
        {/* --- ACTION BUTTONS --- */}
        <div className="flex justify-end space-x-4 pt-8">
          {isEditing ? (
            <>
              <button type="button" onClick={handleCancel} className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" disabled={isUpdating} className="px-6 py-2 bg-primary text-white font-semibold rounded-md hover:bg-red-800 disabled:bg-gray-400">
                {isUpdating ? 'Saving...' : 'Save Changes'}
              </button>
            </>
          ) : (
            <button type="button" onClick={() => setIsEditing(true)} className="px-6 py-2 bg-secondary text-primary font-semibold rounded-md hover:bg-yellow-500">
              Edit Profile
            </button>
          )}
        </div>
      </form>
       <style>{`
        .input-field {
          padding: 0.5rem;
          border: 1px solid #D1D5DB;
          border-radius: 0.375rem;
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }
        .input-field:disabled {
          background-color: #F3F4F6;
          cursor: not-allowed;
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

export default Profile;