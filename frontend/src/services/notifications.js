
import ApiService from './api';

const NotificationService = {
  startPolling: (callback, interval = 30000) => {
    const pollForUpdates = async () => {
      try {
        const transportRequests = await ApiService.getTransportRequests();
        const jobApplications = await ApiService.getJobApplications();
        callback({ transportRequests, jobApplications });
      } catch (error) {
        console.error('Error polling for updates:', error);
      }
    };

    pollForUpdates(); // Initial call
    return setInterval(pollForUpdates, interval);
  },

  stopPolling: (intervalId) => {
    clearInterval(intervalId);
  }
};

export default NotificationService;