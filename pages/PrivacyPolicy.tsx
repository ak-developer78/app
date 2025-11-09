
import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-text-primary mb-6">Privacy Policy</h1>
      <div className="space-y-4 text-text-secondary">
        <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-semibold text-primary pt-4">1. Introduction</h2>
        <p>This Privacy Policy explains how College Portal ("we," "us," or "our") collects, uses, and discloses your personal information when you use our services.</p>

        <h2 className="text-2xl font-semibold text-primary pt-4">2. Information We Collect</h2>
        <p>We collect information you provide directly to us, such as when you create an account, update your profile, or communicate with us. This may include your name, email address, student ID, and other academic information.</p>

        <h2 className="text-2xl font-semibold text-primary pt-4">3. How We Use Your Information</h2>
        <p>We use the information we collect to operate, maintain, and provide you with the features and functionality of the College Portal, including to authenticate you, communicate with you, and personalize your experience.</p>
        
        <h2 className="text-2xl font-semibold text-primary pt-4">4. Sharing Your Information</h2>
        <p>We do not share your personal information with third parties except as necessary to provide our services, comply with the law, or protect our rights.</p>

        <h2 className="text-2xl font-semibold text-primary pt-4">5. Data Security</h2>
        <p>We use reasonable administrative, technical, and physical safeguards to protect your personal information from unauthorized access, use, or disclosure.</p>

        <h2 className="text-2xl font-semibold text-primary pt-4">6. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
