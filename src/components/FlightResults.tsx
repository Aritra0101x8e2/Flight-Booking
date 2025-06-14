
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plane, Clock, Zap, TrendingUp, Star, Shield, Wifi, Coffee } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import FlightDetailsModal from './FlightDetailsModal';

interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  from: string;
  to: string;
  departTime: string;
  arriveTime: string;
  duration: string;
  basePrice: number;
  stops: number;
  aircraft: string;
}

const airlines = [
  'Air India', 'IndiGo', 'SpiceJet', 'Vistara', 'GoAir', 'AirAsia India',
  'Emirates', 'Qatar Airways', 'Singapore Airlines', 'Swiss International',
  'Lufthansa', 'British Airways', 'Thai Airways', 'Cathay Pacific'
];

const aircraft = [
  'Boeing 737', 'Boeing 777', 'Boeing 787', 'Airbus A320', 'Airbus A330', 
  'Airbus A350', 'Boeing 747', 'Airbus A380', 'Embraer E190', 'ATR 72'
];

const generateMockFlights = (searchData: any): Flight[] => {
  const flights: Flight[] = [];
  
  for (let i = 0; i < 15; i++) {
    const airline = airlines[Math.floor(Math.random() * airlines.length)];
    const flightNum = Math.floor(Math.random() * 900) + 100;
    const stops = Math.random() > 0.6 ? (Math.random() > 0.8 ? 2 : 1) : 0;
    const basePrice = Math.floor(Math.random() * 50000) + 15000 + (stops * 5000);
    
    // Generate random times
    const departHour = Math.floor(Math.random() * 24);
    const departMin = Math.floor(Math.random() * 4) * 15;
    const durationHours = Math.floor(Math.random() * 8) + 2 + stops;
    const durationMins = Math.floor(Math.random() * 4) * 15;
    
    const arriveHour = (departHour + durationHours) % 24;
    const arriveMin = (departMin + durationMins) % 60;
    
    flights.push({
      id: `flight-${i + 1}`,
      airline,
      flightNumber: `${airline.split(' ')[0].substring(0, 2).toUpperCase()}${flightNum}`,
      from: searchData?.from || 'Delhi (DEL)',
      to: searchData?.to || 'Mumbai (BOM)',
      departTime: `${departHour.toString().padStart(2, '0')}:${departMin.toString().padStart(2, '0')}`,
      arriveTime: `${arriveHour.toString().padStart(2, '0')}:${arriveMin.toString().padStart(2, '0')}`,
      duration: `${durationHours}h ${durationMins}m`,
      basePrice,
      stops,
      aircraft: aircraft[Math.floor(Math.random() * aircraft.length)]
    });
  }
  
  return flights.sort((a, b) => a.basePrice - b.basePrice);
};

const FlightResults = ({ searchData }: { searchData: any }) => {
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();
  
  const flights = generateMockFlights(searchData);
  
  const getPriceByClass = (basePrice: number, flightClass: string) => {
    const multipliers = {
      economy: 1,
      premium: 1.4,
      business: 2.2,
      first: 3.5
    };
    return Math.floor(basePrice * (multipliers[flightClass as keyof typeof multipliers] || 1));
  };

  const handleSelectFlight = (flight: Flight) => {
    setSelectedFlight(flight);
    setIsModalOpen(true);
  };

  const handleBookFlight = (flight: Flight) => {
    const finalPrice = getPriceByClass(flight.basePrice, searchData?.class || 'economy');
    toast({
      title: "Flight Booking Initiated",
      description: `Booking ${flight.airline} flight ${flight.flightNumber} for ₹${finalPrice.toLocaleString()}`,
    });
    setIsModalOpen(false);
    
    // Store booking in localStorage for demonstration
    const bookings = JSON.parse(localStorage.getItem('flightBookings') || '[]');
    const newBooking = {
      ...flight,
      price: finalPrice,
      class: searchData?.class || 'economy',
      passengers: searchData?.passengers || 1,
      bookingDate: new Date().toISOString(),
      status: 'Confirmed'
    };
    bookings.push(newBooking);
    localStorage.setItem('flightBookings', JSON.stringify(bookings));
  };

  const handleViewDeals = () => {
    toast({
      title: "Special Deals",
      description: "Check out our hot deals section for exclusive discounts!",
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* High-tech Header */}
      <div className="flex items-center justify-between mb-8 p-6 bg-gradient-to-r from-slate-900/80 via-blue-900/60 to-slate-900/80 rounded-2xl border border-cyan-500/30 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <Plane className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
              Available Flights
            </h2>
            <div className="text-sm text-cyan-300 font-mono mt-1">
              {flights.length} flights found • Real-time pricing
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button 
            onClick={handleViewDeals} 
            className="bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 hover:from-orange-700 hover:via-red-600 hover:to-pink-700 border-0 shadow-2xl shadow-red-500/30 transition-all duration-300 hover:scale-105"
          >
            <Zap className="mr-2 h-4 w-4" />
            🔥 Hot Deals
          </Button>
          <div className="flex items-center space-x-2 text-sm text-cyan-300 bg-slate-800/50 px-4 py-2 rounded-xl border border-cyan-500/30">
            <TrendingUp className="h-4 w-4" />
            <span className="font-mono">Live Results</span>
          </div>
        </div>
      </div>

      {flights.map((flight, index) => {
        const finalPrice = getPriceByClass(flight.basePrice, searchData?.class || 'economy');
        const isPopular = index < 3;
        const isPremium = ['Emirates', 'Qatar Airways', 'Singapore Airlines', 'Swiss International'].includes(flight.airline);
        
        return (
          <Card 
            key={flight.id} 
            className={`group relative overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl border-2 ${
              isPremium 
                ? 'bg-gradient-to-r from-slate-900/95 via-purple-900/40 to-slate-900/95 border-purple-500/30 shadow-lg shadow-purple-500/10' 
                : 'bg-gradient-to-r from-slate-900/90 via-blue-900/30 to-slate-900/90 border-cyan-500/30 shadow-lg shadow-cyan-500/10'
            }`}
          >
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Popular flight indicator */}
            {isPopular && (
              <div className="absolute top-4 right-4 z-10">
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 shadow-lg shadow-yellow-500/30">
                  <Star className="mr-1 h-3 w-3" />
                  POPULAR
                </Badge>
              </div>
            )}

            {/* Premium airline indicator */}
            {isPremium && (
              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-lg shadow-purple-500/30">
                  <Shield className="mr-1 h-3 w-3" />
                  PREMIUM
                </Badge>
              </div>
            )}

            <CardContent className="relative z-10 p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-8">
                  {/* Enhanced Airline Section */}
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${
                        isPremium 
                          ? 'bg-gradient-to-br from-purple-600 via-pink-500 to-purple-600 shadow-purple-500/30' 
                          : 'bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-600 shadow-cyan-500/30'
                      }`}>
                        <Plane className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-slate-900">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="font-bold text-xl text-white">{flight.airline}</div>
                      <div className="text-sm text-cyan-300 font-mono">{flight.flightNumber}</div>
                      <div className="text-xs text-slate-400">{flight.aircraft}</div>
                    </div>
                  </div>

                  {/* Enhanced Flight Timeline */}
                  <div className="flex items-center space-x-12">
                    <div className="text-center space-y-2">
                      <div className="text-3xl font-bold text-white font-mono">{flight.departTime}</div>
                      <div className="text-sm text-cyan-300">{flight.from.split(' ')[0]}</div>
                      <div className="text-xs text-slate-500 max-w-24 truncate">{flight.from}</div>
                    </div>

                    <div className="flex flex-col items-center space-y-3">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-cyan-400" />
                        <span className="text-sm text-cyan-300 font-mono">{flight.duration}</span>
                      </div>
                      <div className="relative w-32">
                        <div className={`h-2 rounded-full ${
                          isPremium 
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                            : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                        }`}></div>
                        <div className="absolute top-0 left-0 w-4 h-4 bg-cyan-500 rounded-full -translate-y-1 shadow-lg shadow-cyan-500/50"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 bg-blue-500 rounded-full -translate-y-1 shadow-lg shadow-blue-500/50"></div>
                        <Plane className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 h-5 w-5 text-white" />
                      </div>
                      {flight.stops === 0 ? (
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-lg shadow-green-500/30">
                          NON-STOP
                        </Badge>
                      ) : (
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 shadow-lg shadow-yellow-500/30">
                          {flight.stops} STOP{flight.stops > 1 ? 'S' : ''}
                        </Badge>
                      )}
                    </div>

                    <div className="text-center space-y-2">
                      <div className="text-3xl font-bold text-white font-mono">{flight.arriveTime}</div>
                      <div className="text-sm text-blue-300">{flight.to.split(' ')[0]}</div>
                      <div className="text-xs text-slate-500 max-w-24 truncate">{flight.to}</div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Price and Booking Section */}
                <div className="text-right space-y-4">
                  <div className="space-y-2">
                    <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                      ₹{finalPrice.toLocaleString()}
                    </div>
                    <div className="text-sm text-slate-400">per person</div>
                    <div className="text-xs bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/30">
                      {searchData?.class ? `${searchData.class} class` : 'economy class'}
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => handleSelectFlight(flight)}
                    className={`w-full transition-all duration-300 hover:scale-105 shadow-2xl ${
                      isPremium
                        ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 hover:from-purple-700 hover:via-pink-600 hover:to-purple-700 shadow-purple-500/30'
                        : 'bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:from-blue-700 hover:via-cyan-600 hover:to-blue-700 shadow-cyan-500/30'
                    } border-0 font-bold`}
                  >
                    SELECT FLIGHT
                  </Button>
                </div>
              </div>

              {/* Enhanced Footer with Icons */}
              <div className="mt-6 pt-6 border-t border-gradient-to-r from-transparent via-cyan-500/20 to-transparent flex items-center justify-between">
                <div className="flex items-center space-x-6 text-sm text-slate-400">
                  <div className="flex items-center space-x-2">
                    <Plane className="h-4 w-4 text-cyan-400" />
                    <span>Aircraft: {flight.aircraft}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span>Operated by {flight.airline}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Wifi className="h-4 w-4 text-cyan-400" />
                    <Coffee className="h-4 w-4 text-orange-400" />
                    <span className="text-xs text-slate-400">Wi-Fi + Meals</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}

      <FlightDetailsModal
        flight={selectedFlight}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBookFlight={handleBookFlight}
      />
    </div>
  );
};

export default FlightResults;
