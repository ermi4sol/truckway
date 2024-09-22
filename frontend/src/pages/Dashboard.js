// src/pages/Dashboard.js
import React from 'react';
import CreateTransportRequest from '../components/CreateTransportRequest';
import JobApplicationList from '../components/JobApplicationList';
import TransportRequestList from '../components/TransportRequestList';
import AuthService from '../services/auth';

const Dashboard = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {currentUser.name}!</p>
      {currentUser.role === 'company' && (
        <>
          <CreateTransportRequest onRequestCreated={() => {}} />
          <TransportRequestList />
        </>
      )}
      {currentUser.role === 'driver' && (
        <TransportRequestList />
      )}
      <JobApplicationList />
    </div>
  );
};

export default Dashboard;