
import React, { useEffect, useState } from 'react';
import ApiService from '../services/api';

const TransportRequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const data = await ApiService.getTransportRequests();
      setRequests(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch transport requests');
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h3>Transport Requests</h3>
      {requests.map(request => (
        <div key={request.id}>
          <h4>{request.description}</h4>
          <p>From: {request.pickup_location} To: {request.dropoff_location}</p>
          <p>Weight: {request.weight} Price: {request.price}</p>
        </div>
      ))}
    </div>
  );
};

export default TransportRequestList;