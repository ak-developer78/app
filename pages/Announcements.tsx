import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Announcement, UserRole } from '../types';
import { getAnnouncements, createAnnouncement } from '../api/announcementApi';
import { generateWithSearchGrounding } from '../api/geminiApi';
import Loader from '../components/Loader';

const Announcements: React.FC = () => {
    const { user } = useAuth();
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [newAnnouncement, setNewAnnouncement] = useState({ title: '', message: '' });

    const [geminiResult, setGeminiResult] = useState<{ text: string; sources: any[] } | null>(null);
    const [isChecking, setIsChecking] = useState(false);
    const [checkError, setCheckError] = useState('');

    const loadAnnouncements = async () => {
        setIsLoading(true);
        try {
            const data = await getAnnouncements();
            setAnnouncements(data);
        } catch (error) {
            console.error("Failed to load announcements:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        loadAnnouncements();
    }, []);

    const handleCreateAnnouncement = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createAnnouncement(newAnnouncement);
            setNewAnnouncement({ title: '', message: '' });
            setShowForm(false);
            setGeminiResult(null);
            loadAnnouncements();
        } catch (error) {
            console.error("Failed to create announcement:", error);
        }
    };

    const handleGeminiCheck = async () => {
        const content = `${newAnnouncement.title}\n\n${newAnnouncement.message}`;
        if (content.trim().length < 20) {
            setCheckError("Please provide more content for a useful check.");
            return;
        }
        setIsChecking(true);
        setCheckError('');
        setGeminiResult(null);
        try {
            const result = await generateWithSearchGrounding(`Fact-check and briefly summarize the following announcement content:\n\n${content}`);
            setGeminiResult(result);
        } catch(err: any) {
            setCheckError(err.message || "Failed to check with Gemini.");
        } finally {
            setIsChecking(false);
        }
    };


    if (isLoading) return <Loader />;

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-text-primary">Announcements</h1>
                {user?.role === UserRole.ADMIN && (
                    <button onClick={() => setShowForm(!showForm)} className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-800">
                        {showForm ? 'Cancel' : 'Create Announcement'}
                    </button>
                )}
            </div>

            {showForm && user?.role === UserRole.ADMIN && (
                <div className="mb-8 p-6 bg-gray-50 border rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">New Announcement</h2>
                    <form onSubmit={handleCreateAnnouncement} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Title"
                            value={newAnnouncement.title}
                            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                            required
                            className="w-full p-2 border rounded"
                        />
                        <textarea
                            placeholder="Message"
                            value={newAnnouncement.message}
                            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, message: e.target.value })}
                            required
                            rows={4}
                            className="w-full p-2 border rounded"
                        />
                        <div className="flex items-center space-x-4">
                            <button type="submit" className="px-4 py-2 bg-accent text-white rounded hover:bg-orange-700">Post Announcement</button>
                            <button type="button" onClick={handleGeminiCheck} disabled={isChecking} className="px-4 py-2 bg-secondary text-primary font-semibold rounded hover:bg-yellow-500 disabled:bg-gray-400">
                                {isChecking ? 'Checking...' : 'Check with Gemini'}
                            </button>
                        </div>
                    </form>
                    {checkError && <p className="text-red-500 mt-4">{checkError}</p>}
                    {geminiResult && (
                        <div className="mt-4 p-4 bg-blue-50 border-l-4 border-primary rounded-r-lg">
                            <h4 className="font-semibold text-primary">Gemini Check Result:</h4>
                            <p className="whitespace-pre-wrap mt-2">{geminiResult.text}</p>
                            {geminiResult.sources && geminiResult.sources.length > 0 && (
                                <div className="mt-2">
                                    <h5 className="font-semibold text-sm">Sources:</h5>
                                    <ul className="list-disc list-inside text-sm">
                                        {geminiResult.sources.map((source, index) => (
                                            <li key={index}>
                                                <a href={source.web.uri} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                                    {source.web.title}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            <div className="space-y-6">
                {announcements.map(announcement => (
                    <div key={announcement.id} className="border-l-4 border-secondary p-4 bg-yellow-50 rounded-r-lg">
                        <h3 className="text-xl font-semibold text-accent">{announcement.title}</h3>
                        <p className="text-text-secondary mt-2">{announcement.message}</p>
                        <p className="text-xs text-gray-500 text-right mt-3">
                            Posted on {new Date(announcement.createdAt).toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Announcements;
