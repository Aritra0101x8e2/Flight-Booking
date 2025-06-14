import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import FlightSearch from '@/components/FlightSearch';
import FlightResults from '@/components/FlightResults';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plane, TrendingUp, MapPin } from 'lucide-react';

const Index = () => {
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (!userData) {
      navigate('/loading');
    }
  }, [navigate]);

  const handleSearch = async (searchData: any) => {
    setIsLoading(true);
    setTimeout(() => {
      setSearchResults(searchData);
      setIsLoading(false);
    }, 1500);
  };

  const flightDeals = [
    { destination: 'Singapore', discount: '25%', price: '₹45,999', originalPrice: '₹59,999', image: '🇸🇬' },
    { destination: 'Tokyo', discount: '20%', price: '₹67,999', originalPrice: '₹84,999', image: '🇯🇵' },
    { destination: 'Dubai', discount: '30%', price: '₹28,999', originalPrice: '₹41,999', image: '🇦🇪' },
  ];

  const popularDestinations = [
    { name: 'London', country: 'United Kingdom', flag: '🇬🇧', price: 'from ₹67,999' },
    { name: 'Paris', country: 'France', flag: '🇫🇷', price: 'from ₹59,999' },
    { name: 'Sydney', country: 'Australia', flag: '🇦🇺', price: 'from ₹97,999' },
    { name: 'New York', country: 'United States', flag: '🇺🇸', price: 'from ₹52,999' },
  ];

  const handleDealClick = (deal: any) => {
    const dealSearchData = {
      from: 'Delhi (DEL)',
      to: `${deal.destination} (${deal.destination === 'Singapore' ? 'SIN' : deal.destination === 'Tokyo' ? 'NRT' : 'DXB'})`,
      departDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      returnDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      passengers: 1,
      class: 'economy',
      tripType: 'roundtrip'
    };

    setIsLoading(true);
    setTimeout(() => {
      setSearchResults(dealSearchData);
      setIsLoading(false);
    }, 1500);
  };

  const handleDestinationClick = (destination: any) => {
    const destCodes: { [key: string]: string } = {
      'London': 'UK',
      'Paris': 'CDG',
      'Sydney': 'SYD',
      'New York': 'JFK'
    };

    const destSearchData = {
      from: 'Delhi (DEL)',
      to: `${destination.name} (${destCodes[destination.name]})`,
      departDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      returnDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      passengers: 1,
      class: 'economy',
      tripType: 'roundtrip'
    };

    setIsLoading(true);
    setTimeout(() => {
      setSearchResults(destSearchData);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-black dark:via-neutral-900 dark:to-neutral-800">
      <Header />

      <div className="container mx-auto px-4 py-8">
  
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 dark:text-white mb-4">
            Discover Your Next
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent"> Adventure</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-gray-300 max-w-2xl mx-auto">
            Book premium flights to destinations worldwide with our exclusive deals and exceptional service
          </p>
        </div>

        <div className="mb-12">
          <FlightSearch onSearch={handleSearch} />
        </div>
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center">
              <TrendingUp className="mr-2 h-6 w-6 text-blue-500" />
              Hot Deals
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {flightDeals.map((deal, index) => (
              <Card
                key={index}
                onClick={() => handleDealClick(deal)}
                className="hover:shadow-lg transition-all duration-200 cursor-pointer bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 hover:scale-105"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-2">{deal.image}</div>
                  <h3 className="text-xl font-bold mb-2">{deal.destination}</h3>
                  <Badge variant="secondary" className="bg-white/20 text-white mb-2">
                    🔥 {deal.discount} OFF
                  </Badge>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold">{deal.price}</p>
                    <p className="text-sm opacity-60 line-through">{deal.originalPrice}</p>
                    <p className="text-sm opacity-80">per person</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center">
              <MapPin className="mr-2 h-6 w-6 text-blue-500" />
              Popular Destinations
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularDestinations.map((destination, index) => (
              <Card
                key={index}
                onClick={() => handleDestinationClick(destination)}
                className="hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105 dark:bg-neutral-900"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{destination.flag}</div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">{destination.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-gray-400 mb-2">{destination.country}</p>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold">{destination.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center space-x-3">
              <Plane className="h-8 w-8 text-blue-500 animate-bounce" />
              <div className="text-xl font-semibold text-slate-700 dark:text-slate-300">
                Searching for the best flights...
              </div>
            </div>
            <div className="mt-4 flex justify-center space-x-1">
              <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}

        {searchResults && !isLoading && (
          <div className="animate-fade-in">
            <FlightResults searchData={searchResults} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
