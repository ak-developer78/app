import React, { useState, useEffect } from 'react';
import { getCourses } from '../api/courseApi';
import { Course } from '../types';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import { generateContent } from '../api/geminiApi';

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [summary, setSummary] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (error) {
        console.error("Failed to load courses:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleSummarize = async (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
    setIsGenerating(true);
    setError('');
    setSummary('');
    try {
      const prompt = `Provide a concise, easy-to-understand summary for a prospective student about the following college course:\n\nName: ${course.name}\nDescription: ${course.description}\n\nFocus on the key topics and what a student will learn.`;
      const result = await generateContent(prompt);
      setSummary(result);
    } catch (err: any) {
      setError(err.message || "Failed to generate summary.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-text-primary mb-6">Available Courses</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="border p-4 rounded-lg hover:shadow-lg transition-shadow flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold text-primary">{course.name}</h2>
              <p className="text-text-secondary mt-2">{course.description}</p>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <p className="text-sm font-medium text-gray-600">Credits: {course.credits}</p>
              <button
                onClick={() => handleSummarize(course)}
                className="text-sm bg-secondary text-primary font-semibold px-3 py-1 rounded-md hover:bg-yellow-500 transition-colors"
                title="Summarize with Gemini"
              >
                Summarize
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedCourse && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`Summary for ${selectedCourse.name}`}
        >
          {isGenerating && <Loader />}
          {error && <p className="text-red-500">{error}</p>}
          {summary && <p className="whitespace-pre-wrap">{summary}</p>}
        </Modal>
      )}
    </div>
  );
};

export default Courses;