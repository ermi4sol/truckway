// src/components/Notifications.js
import React, { useEffect, useState } from 'react';
import AuthService from '../services/auth';
import NotificationService from '../services/notifications';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    const intervalId = NotificationService.startPolling((data) => {
      // Process updates and create notifications
      const newNotifications = [];
      
      if (currentUser.role === 'company') {
        data.jobApplications.forEach(app => {
          if (app.status === 'pending') {
            newNotifications.push(`New application for request: ${app.description}`);
          }
        });
      } else if (currentUser.role === 'driver') {
        data.transportRequests.forEach(req => {
          newNotifications.push(`New transport request: ${req.description}`);
        });
      }

      setNotifications(prevNotifications => [...newNotifications, ...prevNotifications]);
    });

    return () => NotificationService.stopPolling(intervalId);
  }, [currentUser.role]);

  return (
    <div>
      <h3>Notifications</h3>
      {notifications.length === 0 ? (
        <p>No new notifications</p>
      ) : (
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>{notification}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;