
import React, { useState, useEffect } from 'react';
import { Exam } from '../types';
import { getExams } from '../api/collegeInfoApi';
import Loader from '../components/Loader';

const Exams: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const data = await getExams();
        setExams(data);
      } catch (error) {
        console.error("Failed to load exams:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExams();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-text-primary mb-6">Exam Schedule</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {exams.map((exam) => (
              <tr key={exam.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{exam.courseName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(exam.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.time}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Exams;
