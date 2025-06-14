
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Search, MapPin, Users, Plane } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface SearchHistory {
  from: string;
  to: string;
  date: string;
  class: string;
  passengers: number;
  timestamp: string;
}

const popularDestinations = [
  // Major Indian Cities
  { code: 'DEL', name: 'Delhi', country: 'India' },
  { code: 'BOM', name: 'Mumbai', country: 'India' },
  { code: 'BLR', name: 'Bangalore', country: 'India' },
  { code: 'MAA', name: 'Chennai', country: 'India' },
  { code: 'CCU', name: 'Kolkata', country: 'India' },
  { code: 'HYD', name: 'Hyderabad', country: 'India' },
  { code: 'AMD', name: 'Ahmedabad', country: 'India' },
  { code: 'PNQ', name: 'Pune', country: 'India' },
  { code: 'COK', name: 'Kochi', country: 'India' },
  { code: 'GOI', name: 'Goa', country: 'India' },
  { code: 'JAI', name: 'Jaipur', country: 'India' },
  { code: 'LKO', name: 'Lucknow', country: 'India' },
  { code: 'IXC', name: 'Chandigarh', country: 'India' },
  { code: 'VNS', name: 'Varanasi', country: 'India' },
  { code: 'IXB', name: 'Bagdogra', country: 'India' },
  { code: 'GAU', name: 'Guwahati', country: 'India' },
  { code: 'IMP', name: 'Imphal', country: 'India' },
  { code: 'SXR', name: 'Srinagar', country: 'India' },
  { code: 'LEH', name: 'Leh', country: 'India' },
  { code: 'IXM', name: 'Madurai', country: 'India' },
  
  // International Destinations
  { code: 'LHR', name: 'London', country: 'UK' },
  { code: 'CDG', name: 'Paris', country: 'France' },
  { code: 'NRT', name: 'Tokyo', country: 'Japan' },
  { code: 'SIN', name: 'Singapore', country: 'Singapore' },
  { code: 'DXB', name: 'Dubai', country: 'UAE' },
  { code: 'SYD', name: 'Sydney', country: 'Australia' },
  { code: 'JFK', name: 'New York', country: 'USA' },
  { code: 'LAX', name: 'Los Angeles', country: 'USA' },
  { code: 'BKK', name: 'Bangkok', country: 'Thailand' },
  { code: 'KUL', name: 'Kuala Lumpur', country: 'Malaysia' },
  { code: 'ICN', name: 'Seoul', country: 'South Korea' },
  { code: 'HKG', name: 'Hong Kong', country: 'Hong Kong' },
  { code: 'FRA', name: 'Frankfurt', country: 'Germany' },
  { code: 'AMS', name: 'Amsterdam', country: 'Netherlands' },
  { code: 'ZUR', name: 'Zurich', country: 'Switzerland' },
  { code: 'YYZ', name: 'Toronto', country: 'Canada' },
  { code: 'MEL', name: 'Melbourne', country: 'Australia' },
  { code: 'DOH', name: 'Doha', country: 'Qatar' },
  { code: 'IST', name: 'Istanbul', country: 'Turkey' },
  { code: 'CAI', name: 'Cairo', country: 'Egypt' },
];

const FlightSearch = ({ onSearch }: { onSearch: (searchData: any) => void }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departDate, setDepartDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [passengers, setPassengers] = useState(1);
  const [flightClass, setFlightClass] = useState('economy');
  const [tripType, setTripType] = useState('roundtrip');
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const history = localStorage.getItem('flightSearchHistory');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  const handleSearch = () => {
    if (!from || !to || !departDate) return;

    const searchData = {
      from,
      to,
      departDate: format(departDate, 'yyyy-MM-dd'),
      returnDate: returnDate ? format(returnDate, 'yyyy-MM-dd') : null,
      passengers,
      class: flightClass,
      tripType
    };

    // Save to search history
    const newHistoryItem: SearchHistory = {
      ...searchData,
      date: searchData.departDate,
      timestamp: new Date().toISOString()
    };

    const updatedHistory = [newHistoryItem, ...searchHistory.slice(0, 9)];
    setSearchHistory(updatedHistory);
    localStorage.setItem('flightSearchHistory', JSON.stringify(updatedHistory));

    onSearch(searchData);
  };

  const filteredFromSuggestions = popularDestinations.filter(dest =>
    dest.name.toLowerCase().includes(from.toLowerCase()) ||
    dest.code.toLowerCase().includes(from.toLowerCase())
  );

  const filteredToSuggestions = popularDestinations.filter(dest =>
    dest.name.toLowerCase().includes(to.toLowerCase()) ||
    dest.code.toLowerCase().includes(to.toLowerCase())
  );

  const selectHistoryItem = (item: SearchHistory) => {
    setFrom(item.from);
    setTo(item.to);
    setDepartDate(new Date(item.date));
    setFlightClass(item.class);
    setPassengers(item.passengers);
    setShowHistory(false);
  };

  return (
    <Card className="w-full max-w-6xl mx-auto shadow-2xl border-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
      <CardContent className="p-8">
        {/* Trip Type Selector */}
        <div className="flex space-x-4 mb-6">
          <Button
            variant={tripType === 'roundtrip' ? 'default' : 'outline'}
            onClick={() => setTripType('roundtrip')}
            className="rounded-full"
          >
            Round Trip
          </Button>
          <Button
            variant={tripType === 'oneway' ? 'default' : 'outline'}
            onClick={() => setTripType('oneway')}
            className="rounded-full"
          >
            One Way
          </Button>
        </div>

        {/* Recent Searches */}
        {searchHistory.length > 0 && (
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => setShowHistory(!showHistory)}
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
            >
              Recent Searches {showHistory ? '▲' : '▼'}
            </Button>
            {showHistory && (
              <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                {searchHistory.slice(0, 5).map((item, index) => (
                  <div
                    key={index}
                    onClick={() => selectHistoryItem(item)}
                    className="flex items-center space-x-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                  >
                    <Plane className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">{item.from} → {item.to}</span>
                    <span className="text-xs text-slate-500">{item.date}</span>
                    <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                      {item.class}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* From */}
          <div className="relative">
            <Label htmlFor="from" className="text-slate-700 dark:text-slate-300 mb-2 block">From</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                id="from"
                placeholder="Departure city"
                value={from}
                onChange={(e) => {
                  setFrom(e.target.value);
                  setShowFromSuggestions(true);
                }}
                onFocus={() => setShowFromSuggestions(true)}
                className="pl-10"
              />
              {showFromSuggestions && from && filteredFromSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                  {filteredFromSuggestions.map((dest) => (
                    <div
                      key={dest.code}
                      onClick={() => {
                        setFrom(`${dest.name} (${dest.code})`);
                        setShowFromSuggestions(false);
                      }}
                      className="p-3 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer"
                    >
                      <div className="font-medium">{dest.name}</div>
                      <div className="text-sm text-slate-500">{dest.country} • {dest.code}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* To */}
          <div className="relative">
            <Label htmlFor="to" className="text-slate-700 dark:text-slate-300 mb-2 block">To</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                id="to"
                placeholder="Destination city"
                value={to}
                onChange={(e) => {
                  setTo(e.target.value);
                  setShowToSuggestions(true);
                }}
                onFocus={() => setShowToSuggestions(true)}
                className="pl-10"
              />
              {showToSuggestions && to && filteredToSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                  {filteredToSuggestions.map((dest) => (
                    <div
                      key={dest.code}
                      onClick={() => {
                        setTo(`${dest.name} (${dest.code})`);
                        setShowToSuggestions(false);
                      }}
                      className="p-3 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer"
                    >
                      <div className="font-medium">{dest.name}</div>
                      <div className="text-sm text-slate-500">{dest.country} • {dest.code}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Departure Date */}
          <div>
            <Label className="text-slate-700 dark:text-slate-300 mb-2 block">Departure</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !departDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {departDate ? format(departDate, "MMM dd, yyyy") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={departDate}
                  onSelect={setDepartDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Return Date */}
          {tripType === 'roundtrip' && (
            <div>
              <Label className="text-slate-700 dark:text-slate-300 mb-2 block">Return</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !returnDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {returnDate ? format(returnDate, "MMM dd, yyyy") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={returnDate}
                    onSelect={setReturnDate}
                    disabled={(date) => date < (departDate || new Date())}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Passengers */}
          <div>
            <Label className="text-slate-700 dark:text-slate-300 mb-2 block">Passengers</Label>
            <Select value={passengers.toString()} onValueChange={(value) => setPassengers(parseInt(value))}>
              <SelectTrigger>
                <Users className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? 'Passenger' : 'Passengers'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Class */}
          <div>
            <Label className="text-slate-700 dark:text-slate-300 mb-2 block">Class</Label>
            <Select value={flightClass} onValueChange={setFlightClass}>
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

          {/* Search Button */}
          <div className="flex items-end">
            <Button 
              onClick={handleSearch}
              className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 h-10"
              disabled={!from || !to || !departDate}
            >
              <Search className="mr-2 h-4 w-4" />
              Search Flights
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightSearch;
