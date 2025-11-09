
import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-text-primary mb-6">Terms of Service</h1>
      <div className="space-y-4 text-text-secondary">
        <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-semibold text-primary pt-4">1. Acceptance of Terms</h2>
        <p>By accessing or using the College Portal, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the portal.</p>

        <h2 className="text-2xl font-semibold text-primary pt-4">2. Use of the Portal</h2>
        <p>You agree to use the portal only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the portal. Prohibited behavior includes harassing or causing distress or inconvenience to any other user, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within the portal.</p>

        <h2 className="text-2xl font-semibold text-primary pt-4">3. Intellectual Property</h2>
        <p>All content included on the portal, such as text, graphics, logos, and software, is the property of the college or its content suppliers and protected by international copyright laws.</p>

        <h2 className="text-2xl font-semibold text-primary pt-4">4. Limitation of Liability</h2>
        <p>The College Portal and its content are provided "as is." We will not be liable for any damages arising from the use of this portal.</p>

        <h2 className="text-2xl font-semibold text-primary pt-4">5. Changes to the Terms</h2>
        <p>We reserve the right to make changes to these Terms of Service at any time. Your continued use of the portal following the posting of changes will mean you accept those changes.</p>
      </div>
    </div>
  );
};

export default TermsOfService;
