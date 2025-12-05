import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/button';
import { Card, CardContent } from '../components/card';
import { ArrowLeft, Phone, Heart } from 'lucide-react';

const FamilyScreen = () => {
  const navigate = useNavigate();
  const [family, setFamily] = useState([]);

  useEffect(() => {
    const savedFamily = JSON.parse(localStorage.getItem('family') || '[]');
    setFamily(savedFamily);

    // Speak welcome message
    if (savedFamily.length > 0) {
      const message = `Here are your ${savedFamily.length} family member${savedFamily.length > 1 ? 's' : ''}`;
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.rate = 0.8;
      setTimeout(() => window.speechSynthesis.speak(utterance), 500);
    }
  }, []);

  const handleCall = (member) => {
    const message = `Calling ${member.name}`;
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
    alert(`Calling ${member.name} at ${member.phone}`);
  };

  if (family.length === 0) {
    return (
      <div className="min-h-screen p-6 flex flex-col">
        <div className="max-w-6xl mx-auto w-full">
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

          <Card className="mt-20">
            <CardContent className="p-12 text-center">
              <p className="text-3xl text-slate-600 mb-6">No family members added yet</p>
              <Button
                onClick={() => navigate('/setup')}
                className="h-16 px-8 text-xl"
              >
                Add Family Members
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/')}
              className="h-14 px-6 text-lg border-2"
            >
              <ArrowLeft className="mr-2 h-6 w-6" />
              Back
            </Button>
            <h1 className="text-4xl font-bold text-slate-800 ml-6">My Family</h1>
          </div>
        </div>

        {/* Family Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {family.map((member, index) => (
            <Card key={index} className="overflow-hidden shadow-xl border-4 hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-0">
                {/* Image Section */}
                <div className="relative h-80 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center overflow-hidden">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-9xl font-bold text-purple-300">
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  {/* Overlay Badge */}
                  <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-lg">
                    <span className="text-lg font-semibold text-purple-600">{member.relation}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-slate-800">{member.name}</h2>
                    <Heart className="h-8 w-8 text-red-500 fill-red-500" />
                  </div>

                  <div className="flex items-center text-xl text-slate-600">
                    <Phone className="h-5 w-5 mr-2" />
                    <span>{member.phone}</span>
                  </div>

                  {/* Story Section */}
                  {member.story && (
                    <div className="mt-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                      <h3 className="text-xl font-semibold text-purple-800 mb-3 flex items-center">
                        <Heart className="h-5 w-5 mr-2" />
                        Our Story
                      </h3>
                      <p className="text-lg text-slate-700 leading-relaxed">{member.story}</p>
                    </div>
                  )}

                  {/* Call Button */}
                  <Button
                    onClick={() => handleCall(member)}
                    className="w-full h-16 text-xl font-semibold bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 mt-6"
                  >
                    <Phone className="mr-3 h-6 w-6" />
                    Call {member.name}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add More Button */}
        <div className="mt-8 text-center">
          <Button
            onClick={() => navigate('/setup')}
            variant="outline"
            className="h-16 px-8 text-xl border-2"
          >
            Add More Family Members
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FamilyScreen;
