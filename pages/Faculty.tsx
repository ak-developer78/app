
import React, { useState, useEffect } from 'react';
import { Faculty as FacultyType } from '../types';
import { getFaculty } from '../api/collegeInfoApi';
import Loader from '../components/Loader';

const Faculty: React.FC = () => {
  const [faculty, setFaculty] = useState<FacultyType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const data = await getFaculty();
        setFaculty(data);
      } catch (error) {
        console.error("Failed to load faculty:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFaculty();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-text-primary mb-6">Faculty Directory</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {faculty.map((member) => (
          <div key={member.id} className="bg-gray-50 p-4 rounded-lg text-center shadow hover:shadow-lg transition-shadow">
            <img src={member.imageUrl} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-secondary" />
            <h2 className="text-xl font-semibold text-primary">{member.name}</h2>
            <p className="text-text-secondary">{member.title}</p>
            <p className="text-sm text-gray-600">{member.department}</p>
            <a href={`mailto:${member.email}`} className="text-sm text-primary hover:underline mt-2 inline-block">{member.email}</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faculty;
