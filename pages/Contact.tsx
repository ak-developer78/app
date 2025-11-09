// Fix: Create the Contact component to resolve module import error.
import React, { useState } from 'react';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the form data to a server
        console.log('Form submitted:', formData);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto text-center">
                <h1 className="text-3xl font-bold text-text-primary mb-4">Thank You!</h1>
                <p className="text-text-secondary">Your message has been sent. We will get back to you shortly.</p>
            </div>
        );
    }
    
  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-4">Contact Us</h1>
        <p className="text-text-secondary mb-6">
          Have questions or feedback? We'd love to hear from you. Fill out the form, and our team will get back to you as soon as possible.
        </p>
        <div className="space-y-4">
            <div className="flex items-start space-x-3">
                <i className="fas fa-map-marker-alt mt-1 text-primary"></i>
                <div>
                    <h3 className="font-semibold">Our Address</h3>
                    <p className="text-gray-600">123 University Ave, Learnington, ST 45678</p>
                </div>
            </div>
            <div className="flex items-start space-x-3">
                <i className="fas fa-envelope mt-1 text-primary"></i>
                <div>
                    <h3 className="font-semibold">Email Us</h3>
                    <p className="text-gray-600">contact@collegeportal.edu</p>
                </div>
            </div>
            <div className="flex items-start space-x-3">
                <i className="fas fa-phone mt-1 text-primary"></i>
                <div>
                    <h3 className="font-semibold">Call Us</h3>
                    <p className="text-gray-600">(123) 456-7890</p>
                </div>
            </div>
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" name="name" id="name" required onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input type="email" name="email" id="email" required onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
            </div>
            <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                <input type="text" name="subject" id="subject" required onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea name="message" id="message" rows={4} required onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"></textarea>
            </div>
            <div>
                <button type="submit" className="w-full bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-red-800 transition-colors">
                    Send Message
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
