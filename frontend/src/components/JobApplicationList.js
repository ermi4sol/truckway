
import React, { useEffect, useState } from 'react';
import ApiService from '../services/api';
import AuthService from '../services/auth';

const JobApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const data = await ApiService.getJobApplications();
      setApplications(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch job applications');
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await ApiService.updateJobApplicationStatus(id, newStatus);
      fetchApplications();
    } catch (error) {
      console.error('Failed to update application status:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h3>Job Applications</h3>
      {applications.map(application => (
        <div key={application.id}>
          <h4>Request: {application.description}</h4>
          <p>Driver: {application.driver_name}</p>
          <p>Status: {application.status}</p>
          {currentUser.role === 'company' && (
            <div>
              <button onClick={() => handleStatusUpdate(application.id, 'accepted')}>Accept</button>
              <button onClick={() => handleStatusUpdate(application.id, 'rejected')}>Reject</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default JobApplicationList;