import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/button';
import { Mic, AlertCircle, Pill, Users, Settings } from 'lucide-react';
import { checkForReminders } from '../utils/reminderUtils';

const HomeScreen = () => {
  const navigate = useNavigate();
  const [nextReminder, setNextReminder] = useState(null);

  useEffect(() => {
    // Check for reminders every 30 seconds
    const checkReminders = () => {
      const reminder = checkForReminders();
      if (reminder) {
        navigate('/reminder');
      }
    };

    // Initial check
    checkReminders();

    // Set up interval
    const interval = setInterval(checkReminders, 30000);

    // Get next reminder for display
    const medicines = JSON.parse(localStorage.getItem('medicines') || '[]');
    if (medicines.length > 0) {
      setNextReminder(medicines[0]);
    }

    return () => clearInterval(interval);
  }, [navigate]);

  const handleTalk = () => {
    navigate('/talk');
  };


  const handleEmergency = () => {
    const family = JSON.parse(localStorage.getItem('family') || '[]');
    const emergencyContacts = JSON.parse(localStorage.getItem('emergencyContacts') || '[]');
    
    // Simulate emergency alert
    const allContacts = [...family, ...emergencyContacts];
    if (allContacts.length > 0) {
      const message = `Emergency alert sent to ${allContacts.length} contact(s)!`;
      alert(message);
      
      // Speak the emergency message
      const utterance = new SpeechSynthesisUtterance('Emergency alert has been sent to your family members');
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Please add emergency contacts in setup first');
    }
  };

  const handleMedicine = () => {
    const medicines = JSON.parse(localStorage.getItem('medicines') || '[]');
    if (medicines.length > 0) {
      navigate('/reminder');
    } else {
      alert('Please add medicines in setup first');
      navigate('/setup');
    }
  };

  const handleFamily = () => {
    const family = JSON.parse(localStorage.getItem('family') || '[]');
    if (family.length > 0) {
      navigate('/family');
    } else {
      alert('Please add family members in setup first');
      navigate('/setup');
    }
  };

  return (
    <div className="min-h-screen p-6 flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800">EchoCare</h1>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/setup')}
            className="h-16 px-6 text-lg border-2"
          >
            <Settings className="mr-2 h-6 w-6" />
            Setup
          </Button>
        </div>

        {/* Next Reminder Info */}
        {nextReminder && (
          <div className="mb-8 p-6 bg-blue-50 border-2 border-blue-200 rounded-2xl">
            <p className="text-xl text-blue-800">
              <strong>Next Reminder:</strong> {nextReminder.name} at {nextReminder.time}
            </p>
          </div>
        )}

        {/* Main Buttons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
          {/* Talk Button */}
          <Button
            onClick={handleTalk}
            className="h-64 flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-3xl shadow-xl text-2xl font-semibold"
          >
            <Mic className="h-24 w-24" />
            <span>Talk</span>
          </Button>

          {/* Emergency Button */}
          <Button
            onClick={handleEmergency}
            className="h-64 flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-3xl shadow-xl text-2xl font-semibold"
          >
            <AlertCircle className="h-24 w-24" />
            <span>Emergency</span>
          </Button>

          {/* Medicine Button */}
          <Button
            onClick={handleMedicine}
            className="h-64 flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-3xl shadow-xl text-2xl font-semibold"
          >
            <Pill className="h-24 w-24" />
            <span>Medicine</span>
          </Button>

          {/* Family Button */}
          <Button
            onClick={handleFamily}
            className="h-64 flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-3xl shadow-xl text-2xl font-semibold"
          >
            <Users className="h-24 w-24" />
            <span>Family</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
