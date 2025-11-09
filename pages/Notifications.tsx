
import React, { useState, useEffect } from 'react';
import { Notification } from '../types';
import { getNotifications, markAsRead } from '../api/notificationsApi';
import Loader from '../components/Loader';

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotifications = async () => {
      setIsLoading(true);
      try {
        const data = await getNotifications();
        setNotifications(data);
      } catch (error) {
        console.error("Failed to load notifications:", error);
      } finally {
        setIsLoading(false);
      }
    };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    await markAsRead(id);
    setNotifications(notifications.map(n => n.id === id ? {...n, read: true} : n));
  };


  if (isLoading) return <Loader />;

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-text-primary mb-6">Notifications</h1>
      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <div key={notif.id} className={`p-4 rounded-md flex justify-between items-start ${notif.read ? 'bg-gray-100' : 'bg-blue-50 border-l-4 border-primary'}`}>
              <div>
                <p className={`text-text-secondary ${notif.read ? 'opacity-70' : ''}`}>{notif.message}</p>
                <p className="text-xs text-gray-500 mt-1">{new Date(notif.createdAt).toLocaleString()}</p>
              </div>
              {!notif.read && (
                 <button onClick={() => handleMarkAsRead(notif.id)} className="text-sm text-primary font-semibold ml-4 flex-shrink-0 hover:underline">Mark as read</button>
              )}
            </div>
          ))
        ) : (
          <p className="text-text-secondary text-center py-8">You have no new notifications.</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
