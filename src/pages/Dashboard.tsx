
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Plane, Settings, CreditCard } from 'lucide-react';
import Header from '@/components/Header';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  name: string;
  email: string;
  nationality: string;
  passportNumber: string;
  frequentFlyerId: string;
  preferredSeat: string;
  preferredClass: string;
  paymentMode: string;
}

const Dashboard = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    nationality: '',
    passportNumber: '',
    frequentFlyerId: '',
    preferredSeat: 'window',
    preferredClass: 'economy',
    paymentMode: 'credit-card'
  });
  const { toast } = useToast();

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      setProfile(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        ...JSON.parse(localStorage.getItem('userProfile') || '{}')
      }));
    }
  }, []);

  const handleSaveProfile = () => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
    
    // Update main user data
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    userData.name = profile.name;
    userData.email = profile.email;
    localStorage.setItem('userData', JSON.stringify(userData));
    
    toast({
      title: "Profile updated ✅",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Dashboard</h1>
            <p className="text-slate-600 dark:text-slate-400">Manage your profile and travel preferences</p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </TabsTrigger>
              <TabsTrigger value="bookings" className="flex items-center space-x-2">
                <Plane className="h-4 w-4" />
                <span>Bookings</span>
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Preferences</span>
              </TabsTrigger>
              <TabsTrigger value="payment" className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4" />
                <span>Payment</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details and travel information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nationality">Nationality</Label>
                      <Input
                        id="nationality"
                        value={profile.nationality}
                        onChange={(e) => handleInputChange('nationality', e.target.value)}
                        placeholder="Enter your nationality"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="passport">Passport Number</Label>
                      <Input
                        id="passport"
                        value={profile.passportNumber}
                        onChange={(e) => handleInputChange('passportNumber', e.target.value)}
                        placeholder="Enter passport number (optional)"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="flyerId">Frequent Flyer ID</Label>
                      <Input
                        id="flyerId"
                        value={profile.frequentFlyerId}
                        onChange={(e) => handleInputChange('frequentFlyerId', e.target.value)}
                        placeholder="Enter frequent flyer ID (optional)"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleSaveProfile} className="bg-blue-500 hover:bg-blue-600">
                    Save Profile
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bookings">
              <Card>
                <CardHeader>
                  <CardTitle>My Bookings</CardTitle>
                  <CardDescription>View and manage your flight bookings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Plane className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-600 dark:text-slate-400 mb-2">No bookings yet</h3>
                    <p className="text-slate-500 dark:text-slate-500">Your flight bookings will appear here once you make a reservation.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Travel Preferences</CardTitle>
                  <CardDescription>Set your preferred travel options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Preferred Seat</Label>
                      <Select value={profile.preferredSeat} onValueChange={(value) => handleInputChange('preferredSeat', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="window">Window Seat</SelectItem>
                          <SelectItem value="aisle">Aisle Seat</SelectItem>
                          <SelectItem value="middle">Middle Seat</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Preferred Class</Label>
                      <Select value={profile.preferredClass} onValueChange={(value) => handleInputChange('preferredClass', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="economy">🪑 Economy</SelectItem>
                          <SelectItem value="premium">✨🪑 Premium Economy</SelectItem>
                          <SelectItem value="business">💼 Business</SelectItem>
                          <SelectItem value="first">🛏 First Class</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Button onClick={handleSaveProfile} className="bg-blue-500 hover:bg-blue-600">
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payment">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Manage your preferred payment options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Preferred Payment Mode</Label>
                    <Select value={profile.paymentMode} onValueChange={(value) => handleInputChange('paymentMode', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="credit-card">Credit Card</SelectItem>
                        <SelectItem value="debit-card">Debit Card</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      💡 Payment processing is simulated in this demo. No actual transactions will be processed.
                    </p>
                  </div>
                  
                  <Button onClick={handleSaveProfile} className="bg-blue-500 hover:bg-blue-600">
                    Save Payment Preferences
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
