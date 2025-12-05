import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/button';
import { Card, CardContent } from '../components/card';
import { Bell, Check, ArrowLeft } from 'lucide-react';

const ReminderScreen = () => {
  const navigate = useNavigate();
  const [currentMedicine, setCurrentMedicine] = useState(null);
  const [allMedicines, setAllMedicines] = useState([]);

  useEffect(() => {
    // Get medicines from localStorage
    const medicines = JSON.parse(localStorage.getItem('medicines') || '[]');
    setAllMedicines(medicines);

    if (medicines.length > 0) {
      // Find current medicine based on time or just show first one
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      const currentMed = medicines.find(med => med.time === currentTime) || medicines[0];
      setCurrentMedicine(currentMed);

      // Speak the reminder
      const message = `It's time to take ${currentMed.name}`;
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      // Speak after a short delay to ensure page is loaded
      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 500);
    }
  }, []);

  const handleTaken = () => {
    if (currentMedicine) {
      const utterance = new SpeechSynthesisUtterance('Great! Medicine marked as taken');
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
    setTimeout(() => navigate('/'), 1500);
  };

  const handleRepeatReminder = () => {
    if (currentMedicine) {
      const message = `It's time to take ${currentMedicine.name}`;
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!currentMedicine) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-12 text-center">
            <p className="text-2xl text-slate-600">No medicines added yet.</p>
            <Button
              onClick={() => navigate('/setup')}
              className="mt-6 h-14 px-8 text-lg"
            >
              Go to Setup
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 flex flex-col">
      <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/')}
            className="h-14 px-6 text-lg border-2"
          >
            <ArrowLeft className="mr-2 h-6 w-6" />
            Back
          </Button>
        </div>

        {/* Main Reminder Card */}
        <div className="flex-1 flex items-center justify-center">
          <Card className="w-full shadow-2xl border-4 border-blue-300 bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="p-12">
              <div className="text-center space-y-8">
                {/* Bell Icon */}
                <div className="flex justify-center">
                  <div className="bg-blue-500 rounded-full p-8 animate-pulse">
                    <Bell className="h-24 w-24 text-white" />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold text-slate-800">
                    It's time to take
                  </h1>
                  <p className="text-6xl font-bold text-blue-600">
                    {currentMedicine.name}
                  </p>
                  <p className="text-3xl text-slate-600">
                    Scheduled for {currentMedicine.time}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4 mt-12">
                  <Button
                    onClick={handleTaken}
                    className="w-full h-20 text-2xl font-semibold bg-green-600 hover:bg-green-700"
                  >
                    <Check className="mr-3 h-8 w-8" />
                    I've Taken It
                  </Button>
                  
                  <Button
                    onClick={handleRepeatReminder}
                    variant="outline"
                    className="w-full h-16 text-xl border-2"
                  >
                    <Bell className="mr-3 h-6 w-6" />
                    Repeat Reminder
                  </Button>
                </div>

                {/* All Medicines Today */}
                {allMedicines.length > 1 && (
                  <div className="mt-12 pt-8 border-t-2">
                    <h3 className="text-2xl font-semibold text-slate-700 mb-4">
                      Today's Medicines
                    </h3>
                    <div className="space-y-2">
                      {allMedicines.map((med, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-xl text-lg ${
                            med.name === currentMedicine.name
                              ? 'bg-blue-100 border-2 border-blue-400 font-semibold'
                              : 'bg-slate-50'
                          }`}
                        >
                          {med.name} - {med.time}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReminderScreen;
