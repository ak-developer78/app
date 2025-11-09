import React from 'react';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary text-white">
      <div className="text-center animate-fade-in-down">
        <svg className="w-24 h-24 mx-auto mb-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v11.494m-9-5.747h18"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v11.494m-9-5.747h18"></path><path d="M12 21a9 9 0 100-18 9 9 0 000 18z"></path></svg>
        <h1 className="text-5xl font-bold tracking-wider">College Portal</h1>
        <p className="text-lg mt-2 opacity-80">Your Gateway to Success</p>
      </div>
      <button
        onClick={onFinish}
        className="mt-12 px-8 py-3 bg-white text-primary font-semibold rounded-lg shadow-lg hover:bg-gray-200 transform hover:scale-105 transition-all duration-300 animate-fade-in-up"
      >
        Enter Portal
      </button>
      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fadeInDown 1s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out 0.5s forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;