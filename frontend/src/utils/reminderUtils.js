export const checkForReminders = () => {
  const medicines = JSON.parse(localStorage.getItem('medicines') || '[]');
  
  if (medicines.length === 0) return null;

  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  // Check if any medicine time matches current time
  const dueReminder = medicines.find(med => med.time === currentTime);
  
  return dueReminder || null;
};

export const scheduleNotification = (medicineName, time) => {
  // Request notification permission
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }

  // Create notification if permission granted
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('Medicine Reminder', {
      body: `Time to take ${medicineName}`,
      icon: '/medicine-icon.png',
      badge: '/medicine-icon.png'
    });
  }
};
