// src/components/CreateTransportRequest.js
import React, { useState } from 'react';
import ApiService from '../services/api';

const CreateTransportRequest = ({ onRequestCreated }) => {
  const [formData, setFormData] = useState({
    description: '',
    pickupLocation: '',
    dropoffLocation: '',
    weight: '',
    price: '',
    timing: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ApiService.createTransportRequest(formData);
      onRequestCreated();
      setFormData({
        description: '',
        pickupLocation: '',
        dropoffLocation: '',
        weight: '',
        price: '',
        timing: ''
      });
    } catch (error) {
      console.error('Failed to create transport request:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Transport Request</h3>
      <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
      <input name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} placeholder="Pickup Location" required />
      <input name="dropoffLocation" value={formData.dropoffLocation} onChange={handleChange} placeholder="Dropoff Location" required />
      <input name="weight" type="number" value={formData.weight} onChange={handleChange} placeholder="Weight" required />
      <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" required />
      <input name="timing" type="datetime-local" value={formData.timing} onChange={handleChange} required />
      <button type="submit">Create Request</button>
    </form>
  );
};

export default CreateTransportRequest;