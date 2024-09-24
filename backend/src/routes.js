const express = require('express');
const { registerUser, loginUser } = require('./auth');
const {
  createTransportRequest,
  getTransportRequests,
  getTransportRequestById,
  updateTransportRequest,
  deleteTransportRequest
} = require('./transportRequests');
const {
  createJobApplication,
  getJobApplications,
  getJobApplicationById,
  updateJobApplicationStatus
} = require('./jobApplications');
// const authMiddleware = require('./middleware/auth');

const router = express.Router();

// Authentication routes
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const userId = await registerUser(name, email, password, role);
    res.status(201).json({ message: 'User registered successfully', userId });
  } catch (error) {
    res.status(400).json({ message: 'Registration failed', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed', error: error.message });
  }
});

// Transport request routes
router.post('/transport-requests', /** authMiddleware **/ async (req, res) => {
  try {
    if (req.user.role !== 'company') {
      return res.status(403).json({ message: 'Only companies can create transport requests' });
    }
    const { description, pickupLocation, dropoffLocation, weight, price, timing } = req.body;
    const requestId = await createTransportRequest(req.user.id, description, pickupLocation, dropoffLocation, weight, price, timing);
    res.status(201).json({ message: 'Transport request created successfully', requestId });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create transport request', error: error.message });
  }
});

router.get('/transport-requests', /** authMiddleware,**/ async (req, res) => {
  try {
    const filters = req.user.role === 'company' ? { companyId: req.user.id } : {};
    const requests = await getTransportRequests(filters);
    res.json(requests);
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch transport requests', error: error.message });
  }
});

router.get('/transport-requests/:id', /** authMiddleware,**/ async (req, res) => {
  try {
    const request = await getTransportRequestById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Transport request not found' });
    }
    if (req.user.role === 'company' && request.company_id !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    res.json(request);
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch transport request', error: error.message });
  }
});

router.put('/transport-requests/:id', /** authMiddleware,**/ async (req, res) => {
  try {
    if (req.user.role !== 'company') {
      return res.status(403).json({ message: 'Only companies can update transport requests' });
    }
    const changes = await updateTransportRequest(req.params.id, req.user.id, req.body);
    if (changes === 0) {
      return res.status(404).json({ message: 'Transport request not found or you do not have permission to update it' });
    }
    res.json({ message: 'Transport request updated successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to update transport request', error: error.message });
  }
});

router.delete('/transport-requests/:id', /** authMiddleware,**/ async (req, res) => {
  try {
    if (req.user.role !== 'company') {
      return res.status(403).json({ message: 'Only companies can delete transport requests' });
    }
    const changes = await deleteTransportRequest(req.params.id, req.user.id);
    if (changes === 0) {
      return res.status(404).json({ message: 'Transport request not found or you do not have permission to delete it' });
    }
    res.json({ message: 'Transport request deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete transport request', error: error.message });
  }
});

// Job application routes
router.post('/job-applications', /** authMiddleware,**/ async (req, res) => {
    try {
      if (req.user.role !== 'driver') {
        return res.status(403).json({ message: 'Only drivers can apply for jobs' });
      }
      const { requestId } = req.body;
      const applicationId = await createJobApplication(req.user.id, requestId);
      res.status(201).json({ message: 'Job application submitted successfully', applicationId });
    } catch (error) {
      res.status(400).json({ message: 'Failed to submit job application', error: error.message });
    }
  });
  
  router.get('/job-applications', /** authMiddleware,**/ async (req, res) => {
    try {
      const filters = req.user.role === 'driver' ? { driverId: req.user.id } : { companyId: req.user.id };
      const applications = await getJobApplications(filters);
      res.json(applications);
    } catch (error) {
      res.status(400).json({ message: 'Failed to fetch job applications', error: error.message });
    }
  });
  
  router.get('/job-applications/:id', /** authMiddleware,**/ async (req, res) => {
    try {
      const application = await getJobApplicationById(req.params.id);
      if (!application) {
        return res.status(404).json({ message: 'Job application not found' });
      }
      if (req.user.role === 'driver' && application.driver_id !== req.user.id) {
        return res.status(403).json({ message: 'Access denied' });
      }
      if (req.user.role === 'company' && application.company_id !== req.user.id) {
        return res.status(403).json({ message: 'Access denied' });
      }
      res.json(application);
    } catch (error) {
      res.status(400).json({ message: 'Failed to fetch job application', error: error.message });
    }
  });
  
  router.put('/job-applications/:id/status', /** authMiddleware,**/ async (req, res) => {
    try {
      if (req.user.role !== 'company') {
        return res.status(403).json({ message: 'Only companies can update job application status' });
      }
      const { status } = req.body;
      const changes = await updateJobApplicationStatus(req.params.id, req.user.id, status);
      if (changes === 0) {
        return res.status(404).json({ message: 'Job application not found or you do not have permission to update it' });
      }
      res.json({ message: 'Job application status updated successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Failed to update job application status', error: error.message });
    }
  });

module.exports = router;