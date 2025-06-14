
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plane, Calendar, Clock, MapPin, Download, Edit3, X, CheckCircle2, AlertCircle, QrCode } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Booking {
  id: string;
  flightNumber: string;
  airline: string;
  from: string;
  to: string;
  departTime: string;
  arriveTime: string;
  date: string;
  class: string;
  price: number;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  passengers: number;
  bookingDate: string;
  seatNumber?: string;
  gate?: string;
}

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('userData');
    if (!userData) {
      navigate('/loading');
      return;
    }

    // Load bookings from localStorage
    const savedBookings = JSON.parse(localStorage.getItem('flightBookings') || '[]');
    const processedBookings = savedBookings.map((booking: any, index: number) => ({
      ...booking,
      id: booking.id || `booking-${index}`,
      seatNumber: `${Math.floor(Math.random() * 30) + 1}${'ABCDEF'[Math.floor(Math.random() * 6)]}`,
      gate: `A${Math.floor(Math.random() * 20) + 1}`,
      date: new Date(booking.bookingDate).toLocaleDateString(),
      status: Math.random() > 0.3 ? 'Upcoming' : 'Completed'
    }));
    setBookings(processedBookings);
    setFilteredBookings(processedBookings);
  }, [navigate]);

  useEffect(() => {
    let filtered = [...bookings];
    
    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(booking => booking.status === filterStatus);
    }

    // Sort bookings
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime();
        case 'price':
          return b.price - a.price;
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        default:
          return 0;
      }
    });

    setFilteredBookings(filtered);
  }, [bookings, filterStatus, sortBy]);

  const handleCancelBooking = (bookingId: string) => {
    const updatedBookings = bookings.map(booking =>
      booking.id === bookingId ? { ...booking, status: 'Cancelled' as const } : booking
    );
    setBookings(updatedBookings);
    localStorage.setItem('flightBookings', JSON.stringify(updatedBookings));
    toast({
      title: "Booking Cancelled",
      description: "Your flight booking has been cancelled successfully.",
    });
  };

  const handleDownloadTicket = (booking: Booking) => {
    toast({
      title: "Ticket Downloaded",
      description: `E-ticket for ${booking.flightNumber} has been downloaded.`,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Upcoming':
        return <CheckCircle2 className="h-4 w-4 text-green-400" />;
      case 'Completed':
        return <CheckCircle2 className="h-4 w-4 text-blue-400" />;
      case 'Cancelled':
        return <AlertCircle className="h-4 w-4 text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Upcoming':
        return 'bg-gradient-to-r from-green-500 to-emerald-500';
      case 'Completed':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500';
      case 'Cancelled':
        return 'bg-gradient-to-r from-red-500 to-pink-500';
      default:
        return 'bg-gradient-to-r from-gray-500 to-slate-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* High-tech Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 dark:text-white mb-4">
            Your Flight
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent"> Bookings</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Manage all your flight reservations in one place
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 p-6 bg-gradient-to-r from-slate-900/90 via-blue-900/60 to-slate-900/90 rounded-2xl border border-cyan-500/30 backdrop-blur-sm animate-slide-up">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48 bg-slate-800/50 border-cyan-500/30 text-white">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-cyan-500/30">
                <SelectItem value="all">All Bookings</SelectItem>
                <SelectItem value="Upcoming">Upcoming</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 bg-slate-800/50 border-cyan-500/30 text-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-cyan-500/30">
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="date">Travel Date</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="text-cyan-300 font-mono">
            {filteredBookings.length} booking{filteredBookings.length !== 1 ? 's' : ''} found
          </div>
        </div>

        {/* Bookings Grid */}
        {filteredBookings.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <Plane className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-2">No bookings found</h3>
            <p className="text-slate-500 dark:text-slate-400">Start your journey by booking your first flight!</p>
            <Button 
              onClick={() => navigate('/')}
              className="mt-4 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:from-blue-700 hover:via-cyan-600 hover:to-blue-700"
            >
              Search Flights
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredBookings.map((booking, index) => (
              <Card 
                key={booking.id} 
                className="group relative overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl border-2 bg-gradient-to-r from-slate-900/95 via-blue-900/40 to-slate-900/95 border-cyan-500/30 shadow-lg shadow-cyan-500/10 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <CardContent className="relative z-10 p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                        <Plane className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-lg text-white">{booking.airline}</div>
                        <div className="text-sm text-cyan-300 font-mono">{booking.flightNumber}</div>
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(booking.status)} text-white border-0 shadow-lg flex items-center space-x-1`}>
                      {getStatusIcon(booking.status)}
                      <span>{booking.status}</span>
                    </Badge>
                  </div>

                  {/* Flight Route */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white font-mono">{booking.departTime}</div>
                      <div className="text-sm text-cyan-300">{booking.from.split(' ')[0]}</div>
                    </div>
                    
                    <div className="flex flex-col items-center space-y-2">
                      <div className="relative w-24">
                        <div className="h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
                        <Plane className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 h-4 w-4 text-white" />
                      </div>
                      <div className="text-xs text-slate-400">{booking.date}</div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold text-white font-mono">{booking.arriveTime}</div>
                      <div className="text-sm text-blue-300">{booking.to.split(' ')[0]}</div>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-slate-300">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-cyan-400" />
                      <span>Seat: {booking.seatNumber}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-cyan-400" />
                      <span>Gate: {booking.gate}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-cyan-400" />
                      <span>Class: {booking.class}</span>
                    </div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                      ₹{booking.price.toLocaleString()}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="flex-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:from-blue-700 hover:via-cyan-600 hover:to-blue-700 border-0">
                          <QrCode className="mr-2 h-4 w-4" />
                          View Ticket
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 border-2 border-cyan-500/30">
                        <DialogHeader>
                          <DialogTitle className="text-white">E-Ticket</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 text-white">
                          <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                            <div className="w-24 h-24 bg-white mx-auto mb-2 rounded-lg flex items-center justify-center">
                              <QrCode className="h-16 w-16 text-black" />
                            </div>
                            <div className="font-mono text-sm">{booking.flightNumber}</div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>Passenger: John Doe</div>
                            <div>Seat: {booking.seatNumber}</div>
                            <div>Gate: {booking.gate}</div>
                            <div>Class: {booking.class}</div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button 
                      onClick={() => handleDownloadTicket(booking)}
                      variant="outline"
                      className="bg-transparent border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10"
                    >
                      <Download className="h-4 w-4" />
                    </Button>

                    {booking.status === 'Upcoming' && (
                      <Button 
                        onClick={() => handleCancelBooking(booking.id)}
                        variant="outline"
                        className="bg-transparent border-red-500/50 text-red-300 hover:bg-red-500/10"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
