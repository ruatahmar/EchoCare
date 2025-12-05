import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/button';
import { Input } from '../components/input';
import { Label } from '../components/label';
import { Textarea } from '../components/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/tabs';
import { ArrowLeft, Plus, Trash2, Upload, Image as ImageIcon } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const SetupScreen = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Medicine State
  const [medicines, setMedicines] = useState([]);
  const [medicineName, setMedicineName] = useState('');
  const [medicineTime, setMedicineTime] = useState('');

  // Family State
  const [family, setFamily] = useState([]);
  const [familyName, setFamilyName] = useState('');
  const [familyRelation, setFamilyRelation] = useState('');
  const [familyPhone, setFamilyPhone] = useState('');
  const [familyStory, setFamilyStory] = useState('');
  const [familyImage, setFamilyImage] = useState('');

  // Emergency Contacts State
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');

  // Load data from localStorage on mount
  useEffect(() => {
    const savedMedicines = JSON.parse(localStorage.getItem('medicines') || '[]');
    const savedFamily = JSON.parse(localStorage.getItem('family') || '[]');
    const savedEmergencyContacts = JSON.parse(localStorage.getItem('emergencyContacts') || '[]');
    
    setMedicines(savedMedicines);
    setFamily(savedFamily);
    setEmergencyContacts(savedEmergencyContacts);
  }, []);

  // Medicine Functions
  const addMedicine = () => {
    if (medicineName && medicineTime) {
      const newMedicines = [...medicines, { name: medicineName, time: medicineTime }];
      setMedicines(newMedicines);
      localStorage.setItem('medicines', JSON.stringify(newMedicines));
      setMedicineName('');
      setMedicineTime('');
      toast({ title: 'Medicine added successfully!' });
    }
  };

  const deleteMedicine = (index) => {
    const newMedicines = medicines.filter((_, i) => i !== index);
    setMedicines(newMedicines);
    localStorage.setItem('medicines', JSON.stringify(newMedicines));
    toast({ title: 'Medicine removed' });
  };

  // Image upload handler
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFamilyImage(reader.result);
        toast({ title: 'Image uploaded successfully!' });
      };
      reader.readAsDataURL(file);
    }
  };

  // Family Functions
  const addFamily = () => {
    if (familyName && familyRelation && familyPhone) {
      const newFamily = [...family, { 
        name: familyName, 
        relation: familyRelation, 
        phone: familyPhone,
        story: familyStory,
        image: familyImage
      }];
      setFamily(newFamily);
      localStorage.setItem('family', JSON.stringify(newFamily));
      setFamilyName('');
      setFamilyRelation('');
      setFamilyPhone('');
      setFamilyStory('');
      setFamilyImage('');
      toast({ title: 'Family member added successfully!' });
    }
  };

  const deleteFamily = (index) => {
    const newFamily = family.filter((_, i) => i !== index);
    setFamily(newFamily);
    localStorage.setItem('family', JSON.stringify(newFamily));
    toast({ title: 'Family member removed' });
  };

  // Emergency Contact Functions
  const addEmergencyContact = () => {
    if (emergencyName && emergencyPhone) {
      const newContacts = [...emergencyContacts, { name: emergencyName, phone: emergencyPhone }];
      setEmergencyContacts(newContacts);
      localStorage.setItem('emergencyContacts', JSON.stringify(newContacts));
      setEmergencyName('');
      setEmergencyPhone('');
      toast({ title: 'Emergency contact added successfully!' });
    }
  };

  const deleteEmergencyContact = (index) => {
    const newContacts = emergencyContacts.filter((_, i) => i !== index);
    setEmergencyContacts(newContacts);
    localStorage.setItem('emergencyContacts', JSON.stringify(newContacts));
    toast({ title: 'Emergency contact removed' });
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
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
          <h1 className="text-4xl font-bold text-slate-800 ml-6">Setup</h1>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="medicines" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-16 text-lg">
            <TabsTrigger value="medicines" className="text-lg">Medicines</TabsTrigger>
            <TabsTrigger value="family" className="text-lg">Family</TabsTrigger>
            <TabsTrigger value="emergency" className="text-lg">Emergency</TabsTrigger>
          </TabsList>

          {/* Medicines Tab */}
          <TabsContent value="medicines" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Add Medicine Reminders</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="medicineName" className="text-lg">Medicine Name</Label>
                    <Input
                      id="medicineName"
                      value={medicineName}
                      onChange={(e) => setMedicineName(e.target.value)}
                      placeholder="e.g., Paracetamol"
                      className="h-14 text-lg mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="medicineTime" className="text-lg">Time</Label>
                    <Input
                      id="medicineTime"
                      type="time"
                      value={medicineTime}
                      onChange={(e) => setMedicineTime(e.target.value)}
                      className="h-14 text-lg mt-2"
                    />
                  </div>
                  <Button
                    onClick={addMedicine}
                    className="w-full h-14 text-lg bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="mr-2 h-6 w-6" />
                    Add Medicine
                  </Button>
                </div>

                {/* Medicine List */}
                <div className="space-y-3 mt-6">
                  {medicines.map((med, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border-2">
                      <div>
                        <p className="text-xl font-semibold">{med.name}</p>
                        <p className="text-lg text-slate-600">{med.time}</p>
                      </div>
                      <Button
                        variant="destructive"
                        size="lg"
                        onClick={() => deleteMedicine(index)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Family Tab */}
          <TabsContent value="family" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Add Family Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="familyName" className="text-lg">Name</Label>
                    <Input
                      id="familyName"
                      value={familyName}
                      onChange={(e) => setFamilyName(e.target.value)}
                      placeholder="e.g., John Doe"
                      className="h-14 text-lg mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="familyRelation" className="text-lg">Relation</Label>
                    <Input
                      id="familyRelation"
                      value={familyRelation}
                      onChange={(e) => setFamilyRelation(e.target.value)}
                      placeholder="e.g., Son, Daughter"
                      className="h-14 text-lg mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="familyPhone" className="text-lg">Phone Number</Label>
                    <Input
                      id="familyPhone"
                      value={familyPhone}
                      onChange={(e) => setFamilyPhone(e.target.value)}
                      placeholder="e.g., +1234567890"
                      className="h-14 text-lg mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="familyStory" className="text-lg">Story/Memory (Optional)</Label>
                    <Textarea
                      id="familyStory"
                      value={familyStory}
                      onChange={(e) => setFamilyStory(e.target.value)}
                      placeholder="Share a special memory or story about your loved one..."
                      className="min-h-32 text-lg mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="familyImage" className="text-lg">Upload Photo (Optional)</Label>
                    <div className="mt-2">
                      {familyImage && (
                        <div className="mb-4 relative">
                          <img src={familyImage} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => setFamilyImage('')}
                            className="absolute top-2 right-2"
                          >
                            Remove
                          </Button>
                        </div>
                      )}
                      <label htmlFor="familyImage" className="cursor-pointer">
                        <div className="h-14 border-2 border-dashed rounded-lg flex items-center justify-center hover:bg-slate-50 transition-colors">
                          {familyImage ? (
                            <span className="text-lg flex items-center text-green-600">
                              <ImageIcon className="mr-2 h-5 w-5" />
                              Image Uploaded
                            </span>
                          ) : (
                            <span className="text-lg flex items-center text-slate-500">
                              <Upload className="mr-2 h-5 w-5" />
                              Click to upload photo
                            </span>
                          )}
                        </div>
                      </label>
                      <Input
                        id="familyImage"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  </div>
                  <Button
                    onClick={addFamily}
                    className="w-full h-14 text-lg bg-purple-600 hover:bg-purple-700"
                  >
                    <Plus className="mr-2 h-6 w-6" />
                    Add Family Member
                  </Button>
                </div>

                {/* Family List */}
                <div className="space-y-3 mt-6">
                  {family.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border-2">
                      <div className="flex items-center gap-4">
                        {member.image && (
                          <img src={member.image} alt={member.name} className="w-16 h-16 rounded-full object-cover" />
                        )}
                        <div>
                          <p className="text-xl font-semibold">{member.name}</p>
                          <p className="text-lg text-slate-600">{member.relation}</p>
                          <p className="text-lg text-slate-600">{member.phone}</p>
                        </div>
                      </div>
                      <Button
                        variant="destructive"
                        size="lg"
                        onClick={() => deleteFamily(index)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Emergency Tab */}
          <TabsContent value="emergency" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Add Emergency Contacts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="emergencyName" className="text-lg">Name</Label>
                    <Input
                      id="emergencyName"
                      value={emergencyName}
                      onChange={(e) => setEmergencyName(e.target.value)}
                      placeholder="e.g., Dr. Smith"
                      className="h-14 text-lg mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergencyPhone" className="text-lg">Phone Number</Label>
                    <Input
                      id="emergencyPhone"
                      value={emergencyPhone}
                      onChange={(e) => setEmergencyPhone(e.target.value)}
                      placeholder="e.g., 911"
                      className="h-14 text-lg mt-2"
                    />
                  </div>
                  <Button
                    onClick={addEmergencyContact}
                    className="w-full h-14 text-lg bg-red-600 hover:bg-red-700"
                  >
                    <Plus className="mr-2 h-6 w-6" />
                    Add Emergency Contact
                  </Button>
                </div>

                {/* Emergency Contact List */}
                <div className="space-y-3 mt-6">
                  {emergencyContacts.map((contact, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border-2">
                      <div>
                        <p className="text-xl font-semibold">{contact.name}</p>
                        <p className="text-lg text-slate-600">{contact.phone}</p>
                      </div>
                      <Button
                        variant="destructive"
                        size="lg"
                        onClick={() => deleteEmergencyContact(index)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SetupScreen;
