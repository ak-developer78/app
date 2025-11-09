import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import DashboardBanner from '../components/DashboardBanner';
import { UserRole, User, Grade, CampusEvent, PortalActivity } from '../types';
import { getAllUsers } from '../api/userApi';
import { getRecentGrades } from '../api/gradesApi';
import { getCampusEvents, getFaculty } from '../api/collegeInfoApi';
import { getPortalActivity } from '../api/activityApi';
import { getCourses } from '../api/courseApi';
import { getAnnouncements } from '../api/announcementApi';
import { generateWithMapsGrounding } from '../api/geminiApi';
import Loader from '../components/Loader';

// --- STUDENT DASHBOARD COMPONENTS ---

const CampusEvents: React.FC = () => {
    const [events, setEvents] = useState<CampusEvent[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getCampusEvents();
                setEvents(data);
            } finally {
                setIsLoading(false);
            }
        };
        fetchEvents();
    }, []);

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="font-semibold text-xl text-text-primary mb-4">Upcoming Campus Events</h3>
            {isLoading ? <Loader /> : (
                 <ul className="space-y-4">
                    {events.map(event => (
                        <li key={event.id} className="border-l-4 border-secondary pl-4 py-2">
                            <p className="font-bold text-primary">{event.title}</p>
                            <p className="text-sm text-gray-600">{event.description}</p>
                            <p className="text-xs text-gray-500 mt-1">{new Date(event.date).toLocaleDateString()} | {event.location}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const GradesOverview: React.FC = () => {
    const [grades, setGrades] = useState<Grade[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const fetchGrades = async () => {
            try {
                const data = await getRecentGrades();
                setGrades(data);
            } finally {
                setIsLoading(false);
            }
        };
        fetchGrades();
    }, []);
    
    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="font-semibold text-xl text-text-primary mb-4">Recent Grades</h3>
            {isLoading ? <Loader /> : (
                 <ul className="divide-y divide-gray-200">
                    {grades.map(grade => (
                        <li key={grade.courseName} className="py-3 flex justify-between items-center">
                            <span className="text-gray-700">{grade.courseName}</span>
                            <span className="font-bold text-lg text-primary">{grade.grade}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const CampusAssistant: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ text: string; sources: any[] } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setIsLoading(true);
    setError('');
    setResult(null);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const apiResult = await generateWithMapsGrounding(prompt, latitude, longitude);
          setResult(apiResult);
        } catch (err: any) {
          setError(err.message || 'Failed to get response.');
        } finally {
          setIsLoading(false);
        }
      },
      (geoError) => {
        setError(`Geolocation error: ${geoError.message}`);
        setIsLoading(false);
      }
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="font-semibold text-xl text-text-primary mb-4">Campus Assistant</h3>
      <p className="text-sm text-gray-600 mb-4">Ask anything about the campus or nearby places, like "Where can I get coffee?" or "Find study spots."</p>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask a question..."
          className="flex-grow p-2 border rounded-md focus:ring-primary focus:border-primary"
        />
        <button type="submit" disabled={isLoading} className="px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-red-800 disabled:bg-gray-400">
          {isLoading ? '...' : 'Ask'}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {result && (
        <div className="mt-4 p-4 bg-gray-50 border-l-4 border-primary rounded-r-lg">
          <p className="whitespace-pre-wrap">{result.text}</p>
          {result.sources && result.sources.length > 0 && (
            <div className="mt-2">
              <h5 className="font-semibold text-sm">Relevant Places:</h5>
              <ul className="list-disc list-inside text-sm">
                {result.sources.map((source, index) => (
                  <li key={index}>
                    <a href={source.maps.uri} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {source.maps.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// --- ADMIN DASHBOARD COMPONENTS ---

const AdminStats: React.FC = () => {
    const [stats, setStats] = useState({ students: 0, faculty: 0, courses: 0, announcements: 0 });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [users, faculty, courses, announcements] = await Promise.all([
                    getAllUsers(),
                    getFaculty(),
                    getCourses(),
                    getAnnouncements(),
                ]);
                setStats({
                    students: users.filter(u => u.role === UserRole.STUDENT).length,
                    faculty: faculty.length,
                    courses: courses.length,
                    announcements: announcements.length,
                });
            } finally {
                setIsLoading(false);
            }
        };
        fetchStats();
    }, []);

    const statItems = [
        { label: 'Total Students', value: stats.students, icon: 'fas fa-user-graduate' },
        { label: 'Faculty Members', value: stats.faculty, icon: 'fas fa-chalkboard-teacher' },
        { label: 'Courses Offered', value: stats.courses, icon: 'fas fa-book' },
        { label: 'Announcements', value: stats.announcements, icon: 'fas fa-bullhorn' },
    ];

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="font-semibold text-xl text-text-primary mb-4">Portal Statistics</h3>
            {isLoading ? <Loader /> : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {statItems.map(item => (
                        <div key={item.label} className="p-4 bg-gray-50 rounded-lg text-center">
                            <i className={`${item.icon} text-3xl text-primary mb-2`}></i>
                            <p className="text-3xl font-bold text-text-primary">{item.value}</p>
                            <p className="text-sm text-gray-600">{item.label}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const PortalActivityFeed: React.FC = () => {
    const [activities, setActivities] = useState<PortalActivity[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const data = await getPortalActivity();
                setActivities(data);
            } finally {
                setIsLoading(false);
            }
        };
        fetchActivities();
    }, []);

    const iconMap = {
        'NEW_STUDENT': 'fas fa-user-plus text-green-500',
        'NEW_COURSE': 'fas fa-book-medical text-blue-500',
        'NEW_ANNOUNCEMENT': 'fas fa-bullhorn text-yellow-500',
    };

    return (
         <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="font-semibold text-xl text-text-primary mb-4">Portal Activity Feed</h3>
            {isLoading ? <Loader /> : (
                <ul className="space-y-4 max-h-96 overflow-y-auto">
                    {activities.map(activity => (
                        <li key={activity.id} className="flex items-start space-x-4">
                            <i className={`${iconMap[activity.type]} text-xl mt-1`}></i>
                            <div>
                                <p className="text-gray-800">{activity.description}</p>
                                <p className="text-xs text-gray-500">{new Date(activity.timestamp).toLocaleString()}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const AdminQuickActions: React.FC = () => (
    <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="font-semibold text-xl text-text-primary mb-4">Quick Actions</h3>
        <div className="flex flex-col space-y-3">
            <Link to="/announcements" className="block w-full text-center p-3 bg-primary text-white rounded-lg hover:bg-red-800 transition-colors">Create Announcement</Link>
            <Link to="/courses" className="block w-full text-center p-3 bg-secondary text-primary font-semibold rounded-lg hover:bg-yellow-500 transition-colors">Manage Courses</Link>
            <Link to="/faculty" className="block w-full text-center p-3 bg-gray-200 text-text-primary rounded-lg hover:bg-gray-300 transition-colors">Manage Faculty</Link>
        </div>
    </div>
);


const RecentRegistrations: React.FC = () => {
    const [recentStudents, setRecentStudents] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

     useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await getAllUsers();
                const students = users.filter(u => u.role === UserRole.STUDENT);
                setRecentStudents(students.reverse().slice(0, 5));
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="font-semibold text-xl text-text-primary mb-4">Recent Student Registrations</h3>
            {isLoading ? <Loader /> : (
                <ul className="divide-y divide-gray-200">
                    {recentStudents.length > 0 ? recentStudents.map(student => (
                        <li key={student.id} className="py-3 flex items-center space-x-4">
                            <img className="h-10 w-10 rounded-full object-cover" src={student.profilePhotoUrl} alt={student.name} />
                            <div>
                                <p className="text-sm font-medium text-gray-900">{student.name}</p>
                                <p className="text-sm text-gray-500">{student.email}</p>
                            </div>
                        </li>
                    )) : <p className="text-gray-500 py-4">No recent registrations.</p>}
                </ul>
            )}
        </div>
    );
};


// --- MAIN DASHBOARD RENDER ---

const AdminDashboard: React.FC = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <AdminStats />
                <PortalActivityFeed />
            </div>
            <div className="lg:col-span-1 space-y-8">
                <AdminQuickActions />
                <RecentRegistrations />
            </div>
        </div>
    );
};


const StudentDashboard: React.FC = () => {
  const quickLinks = [
    { name: 'My Courses', path: '/courses', icon: 'fas fa-book-open' },
    { name: 'Announcements', path: '/announcements', icon: 'fas fa-bullhorn' },
    { name: 'Exam Schedule', path: '/exams', icon: 'fas fa-calendar-alt' },
    { name: 'My Profile', path: '/profile', icon: 'fas fa-user-circle' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickLinks.map((link) => (
          <Link to={link.path} key={link.name} className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 text-center">
            <i className={`${link.icon} text-4xl text-primary mb-3`}></i>
            <h3 className="font-semibold text-xl text-text-primary">{link.name}</h3>
          </Link>
        ))}
      </div>
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
             <CampusEvents />
             <CampusAssistant />
        </div>
        <div className="lg:col-span-1 space-y-8">
             <GradesOverview />
             <div className="p-6 bg-white rounded-lg shadow-md">
                 <h3 className="font-semibold text-xl text-text-primary mb-4">Upcoming Deadlines</h3>
                 <ul className="list-disc list-inside text-gray-600 space-y-2">
                     <li>Course registration for next semester: <strong>Oct 25th</strong></li>
                     <li>Project submission for CS101: <strong>Nov 10th</strong></li>
                     <li>Final fee payment for Fall semester: <strong>Nov 30th</strong></li>
                     <li>Scholarship application deadline: <strong>Dec 5th</strong></li>
                 </ul>
             </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <DashboardBanner />
      
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary">Welcome, {user?.name}!</h1>
        <p className="mt-2 text-lg text-text-secondary">
          {user?.role === UserRole.ADMIN ? 'Here is the administrative overview of the portal.' : "Here's everything you need for your day on campus."}
        </p>
      </div>

      {user?.role === UserRole.ADMIN ? <AdminDashboard /> : <StudentDashboard />}
    </div>
  );
};

export default Dashboard;
