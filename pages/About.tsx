
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-text-primary mb-6 text-center">About Our College Portal</h1>
      <div className="space-y-6 text-text-secondary">
        <p>
          Welcome to the College Portal, your centralized hub for academic information and campus life. Our mission is to provide students, faculty, and staff with a seamless, intuitive, and efficient digital environment that supports learning, teaching, and administration.
        </p>
        <p>
          This portal is designed to be your go-to resource for everything you need. From checking your course schedule and grades to staying updated with the latest campus announcements, we've brought all essential services into one accessible place.
        </p>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-primary mb-4">Key Features</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Dashboard:</strong> A personalized overview of your most important information.</li>
            <li><strong>Courses:</strong> Access course details, materials, and schedules.</li>
            <li><strong>Announcements:</strong> Stay informed about important news and events across campus.</li>
            <li><strong>Profile Management:</strong> Keep your personal and academic information up to date.</li>
            <li><strong>AI-Powered Summaries:</strong> Leverage Gemini to get quick, intelligent summaries of course descriptions to help you make informed decisions.</li>
          </ul>
        </div>
        <p className="pt-4 border-t border-gray-200">
          We are committed to continuously improving the portal to better serve the needs of our college community. If you have any feedback or suggestions, please don't hesitate to reach out through our Contact page.
        </p>
      </div>
    </div>
  );
};

export default About;
