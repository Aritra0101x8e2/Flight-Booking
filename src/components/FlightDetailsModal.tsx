
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plane, Clock, Users, Wifi, Utensils, Tv, ShoppingBag, MapPin, Calendar, Timer } from 'lucide-react';

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

interface FlightDetailsModalProps {
  flight: Flight | null;
  isOpen: boolean;
  onClose: () => void;
  onBookFlight: (flight: Flight) => void;
}

const FlightDetailsModal = ({ flight, isOpen, onClose, onBookFlight }: FlightDetailsModalProps) => {
  if (!flight) return null;

  const amenities = [
    { icon: Wifi, name: 'Free Wi-Fi', available: true },
    { icon: Utensils, name: 'Meals Included', available: true },
    { icon: Tv, name: 'Entertainment', available: true },
    { icon: ShoppingBag, name: 'Extra Baggage', available: false },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 border-2 border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent"></div>
        <div className="relative z-10">
          <DialogHeader className="border-b border-cyan-500/20 pb-6">
            <DialogTitle className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Plane className="h-8 w-8 text-white animate-pulse" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                  {flight.airline}
                </div>
                <div className="text-sm text-cyan-300 font-mono">{flight.flightNumber}</div>
                <div className="text-xs text-slate-400 mt-1">{flight.aircraft}</div>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-8 pt-6">
            {/* High-tech Flight Route Display */}
            <div className="relative p-6 bg-gradient-to-r from-slate-800/50 via-blue-900/30 to-slate-800/50 rounded-2xl border border-cyan-500/30 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent rounded-2xl"></div>
              <div className="relative z-10 grid grid-cols-3 items-center">
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <MapPin className="h-4 w-4 text-cyan-400" />
                    <span className="text-xs text-cyan-300 font-mono">DEPARTURE</span>
                  </div>
                  <div className="text-4xl font-bold text-white font-mono">{flight.departTime}</div>
                  <div className="text-sm text-slate-300">{flight.from.split(' ')[0]}</div>
                  <div className="text-xs text-slate-500">{flight.from}</div>
                </div>
                
                <div className="flex flex-col items-center space-y-3">
                  <div className="flex items-center space-x-2">
                    <Timer className="h-4 w-4 text-cyan-400" />
                    <span className="text-sm text-cyan-300 font-mono">{flight.duration}</span>
                  </div>
                  <div className="relative w-32">
                    <div className="h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-3 h-3 bg-cyan-500 rounded-full -translate-y-1 shadow-lg shadow-cyan-500/50"></div>
                    <div className="absolute top-0 right-0 w-3 h-3 bg-blue-500 rounded-full -translate-y-1 shadow-lg shadow-blue-500/50"></div>
                    <Plane className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 h-4 w-4 text-white" />
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
                  <div className="flex items-center justify-center space-x-2">
                    <MapPin className="h-4 w-4 text-blue-400" />
                    <span className="text-xs text-blue-300 font-mono">ARRIVAL</span>
                  </div>
                  <div className="text-4xl font-bold text-white font-mono">{flight.arriveTime}</div>
                  <div className="text-sm text-slate-300">{flight.to.split(' ')[0]}</div>
                  <div className="text-xs text-slate-500">{flight.to}</div>
                </div>
              </div>
            </div>

            {/* High-tech Price Display */}
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-gradient-to-br from-slate-800/60 to-blue-900/40 rounded-2xl border border-cyan-500/30 backdrop-blur-sm">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Plane className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-cyan-300 font-mono">AIRCRAFT MODEL</span>
                </div>
                <div className="text-xl font-bold text-white">{flight.aircraft}</div>
                <div className="text-xs text-slate-400 mt-1">Next Generation Aircraft</div>
              </div>
              
              <div className="p-6 bg-gradient-to-br from-green-900/40 to-emerald-900/40 rounded-2xl border border-green-500/30 backdrop-blur-sm">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">₹</span>
                  </div>
                  <span className="text-sm text-green-300 font-mono">BASE FARE</span>
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  ₹{flight.basePrice.toLocaleString()}
                </div>
                <div className="text-xs text-slate-400 mt-1">Per Passenger</div>
              </div>
            </div>

            {/* Advanced Amenities Grid */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Users className="h-3 w-3 text-white" />
                </div>
                <span className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">Flight Amenities</span>
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {amenities.map((amenity, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center space-x-4 p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
                      amenity.available 
                        ? 'bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/30 shadow-lg shadow-green-500/10' 
                        : 'bg-gradient-to-r from-slate-800/30 to-slate-700/30 border-slate-500/30'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      amenity.available 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg shadow-green-500/30' 
                        : 'bg-gradient-to-r from-slate-600 to-slate-500'
                    }`}>
                      <amenity.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <span className={`text-sm font-medium ${amenity.available ? 'text-white' : 'text-slate-400'}`}>
                        {amenity.name}
                      </span>
                      {amenity.available && (
                        <div className="text-xs text-green-400 mt-1">Included</div>
                      )}
                    </div>
                    {amenity.available && (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Separator className="bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

            {/* High-tech Action Buttons */}
            <div className="flex space-x-4">
              <Button 
                variant="outline" 
                onClick={onClose} 
                className="flex-1 bg-transparent border-2 border-slate-500/50 text-slate-300 hover:bg-slate-800/50 hover:border-slate-400 transition-all duration-300"
              >
                <span className="font-mono">CANCEL</span>
              </Button>
              <Button 
                onClick={() => onBookFlight(flight)} 
                className="flex-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:from-blue-700 hover:via-cyan-600 hover:to-blue-700 border-0 shadow-2xl shadow-cyan-500/30 transition-all duration-300 hover:scale-105"
              >
                <Calendar className="mr-2 h-4 w-4" />
                <span className="font-mono font-bold">BOOK FLIGHT</span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FlightDetailsModal;
