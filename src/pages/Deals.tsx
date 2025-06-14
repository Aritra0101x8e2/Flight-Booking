
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Plane, TrendingUp, Clock, Zap, Star, MapPin, Calendar, Timer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Deal {
  id: string;
  title: string;
  route: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  airline: string;
  validUntil: string;
  category: string;
  isFlashSale?: boolean;
  isTrending?: boolean;
  isNew?: boolean;
  image: string;
}

const Deals = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [budgetRange, setBudgetRange] = useState([50000]);
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([]);
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: number }>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('userData');
    if (!userData) {
      navigate('/loading');
    }
  }, [navigate]);

  const bannerDeals = [
    {
      id: 'banner1',
      title: '🌧️ Monsoon Madness',
      subtitle: 'Fly to Kerala during monsoon season',
      route: 'Delhi → Kochi',
      price: '₹15,999',
      validity: '5 days left',
      bgImage: '🌴'
    },
    {
      id: 'banner2', 
      title: '🏖️ Weekend Getaways',
      subtitle: 'Perfect 2-day escapes',
      route: 'Mumbai → Goa',
      price: '₹8,999',
      validity: '2 days left',
      bgImage: '🏖️'
    },
    {
      id: 'banner3',
      title: '🏔️ Mountain Adventures', 
      subtitle: 'Explore the Himalayas',
      route: 'Delhi → Leh',
      price: '₹22,999',
      validity: '7 days left',
      bgImage: '🏔️'
    }
  ];

  const deals: Deal[] = [
    {
      id: 'deal1',
      title: 'Singapore Special',
      route: 'Delhi → Singapore',
      originalPrice: 55999,
      discountedPrice: 41999,
      discount: 25,
      airline: 'Singapore Airlines',
      validUntil: '2024-06-20',
      category: 'International',
      isTrending: true,
      image: '🇸🇬'
    },
    {
      id: 'deal2',
      title: 'Tokyo Flash Sale',
      route: 'Mumbai → Tokyo',
      originalPrice: 84999,
      discountedPrice: 67999,
      discount: 20,
      airline: 'Air India',
      validUntil: '2024-06-18',
      category: 'International',
      isFlashSale: true,
      image: '🇯🇵'
    },
    {
      id: 'deal3',
      title: 'Dubai Delight',
      route: 'Chennai → Dubai',
      originalPrice: 41999,
      discountedPrice: 28999,
      discount: 30,
      airline: 'Emirates',
      validUntil: '2024-06-25',
      category: 'International',
      isNew: true,
      image: '🇦🇪'
    },
    {
      id: 'deal4',
      title: 'Goa Beach Vibes',
      route: 'Delhi → Goa',
      originalPrice: 12999,
      discountedPrice: 8999,
      discount: 30,
      airline: 'IndiGo',
      validUntil: '2024-06-22',
      category: 'Domestic',
      isTrending: true,
      image: '🏖️'
    },
    {
      id: 'deal5',
      title: 'Kerala Backwaters',
      route: 'Mumbai → Kochi',
      originalPrice: 15999,
      discountedPrice: 11999,
      discount: 25,
      airline: 'Vistara',
      validUntil: '2024-06-30',
      category: 'Domestic',
      image: '🌴'
    },
    {
      id: 'deal6',
      title: 'Rajasthan Heritage',
      route: 'Delhi → Jaipur',
      originalPrice: 8999,
      discountedPrice: 6299,
      discount: 30,
      airline: 'SpiceJet',
      validUntil: '2024-06-28',
      category: 'Domestic',
      isNew: true,
      image: '🏰'
    },
    {
      id: 'deal7',
      title: 'London Explorer',
      route: 'Delhi → London',
      originalPrice: 89999,
      discountedPrice: 67999,
      discount: 24,
      airline: 'British Airways',
      validUntil: '2024-07-05',
      category: 'International',
      image: '🇬🇧'
    },
    {
      id: 'deal8',
      title: 'Paris Romance',
      route: 'Mumbai → Paris',
      originalPrice: 79999,
      discountedPrice: 59999,
      discount: 25,
      airline: 'Air France',
      validUntil: '2024-07-10',
      category: 'International',
      isTrending: true,
      image: '🇫🇷'
    }
  ];

  useEffect(() => {
    // Auto-rotate banner
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerDeals.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [bannerDeals.length]);

  useEffect(() => {
    // Filter deals by budget
    const filtered = deals.filter(deal => deal.discountedPrice <= budgetRange[0]);
    setFilteredDeals(filtered);
  }, [budgetRange]);

  useEffect(() => {
    // Update countdown timers
    const timer = setInterval(() => {
      const newTimeLeft: { [key: string]: number } = {};
      deals.forEach(deal => {
        const endTime = new Date(deal.validUntil).getTime();
        const now = new Date().getTime();
        const difference = endTime - now;
        newTimeLeft[deal.id] = Math.max(0, difference);
      });
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTimeLeft = (milliseconds: number) => {
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor((milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m ${seconds}s`;
  };

  const handleBookDeal = (deal: Deal) => {
    toast({
      title: "Deal Selected!",
      description: `Redirecting to book ${deal.title} for ₹${deal.discountedPrice.toLocaleString()}`,
    });
    
    // Simulate booking process
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* High-tech Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 dark:text-white mb-4">
            Exclusive Flight
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"> Deals</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Discover amazing discounts and limited-time offers on premium flights
          </p>
        </div>

        {/* Banner Carousel */}
        <div className="relative mb-12 overflow-hidden rounded-3xl border-2 border-cyan-500/30 animate-slide-up">
          <div className="flex transition-transform duration-1000 ease-in-out" style={{ transform: `translateX(-${currentBanner * 100}%)` }}>
            {bannerDeals.map((banner, index) => (
              <div 
                key={banner.id}
                className="w-full flex-shrink-0 relative h-64 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-between p-12"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                <div className="relative z-10">
                  <h2 className="text-4xl font-bold text-white mb-2">{banner.title}</h2>
                  <p className="text-xl text-cyan-200 mb-4">{banner.subtitle}</p>
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl font-bold text-green-400">{banner.price}</div>
                    <Badge className="bg-red-500 text-white animate-pulse">
                      <Clock className="mr-1 h-3 w-3" />
                      {banner.validity}
                    </Badge>
                  </div>
                  <div className="text-lg text-cyan-300 mt-2">{banner.route}</div>
                </div>
                <div className="text-8xl opacity-20">{banner.bgImage}</div>
              </div>
            ))}
          </div>
          
          {/* Banner Navigation Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {bannerDeals.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentBanner ? 'bg-cyan-400 w-8' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Budget Slider */}
        <div className="mb-12 p-6 bg-gradient-to-r from-slate-900/90 via-purple-900/60 to-slate-900/90 rounded-2xl border border-purple-500/30 backdrop-blur-sm animate-slide-up">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
            <TrendingUp className="mr-2 h-6 w-6 text-purple-400" />
            Explore by Budget
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-cyan-300">Max Budget:</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                ₹{budgetRange[0].toLocaleString()}
              </span>
            </div>
            <Slider
              value={budgetRange}
              onValueChange={setBudgetRange}
              max={100000}
              min={5000}
              step={5000}
              className="w-full"
            />
            <div className="text-sm text-slate-400">
              Showing {filteredDeals.length} deals under your budget
            </div>
          </div>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDeals.map((deal, index) => (
            <Card 
              key={deal.id}
              className="group relative overflow-hidden transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl border-2 bg-gradient-to-r from-slate-900/95 via-orange-900/40 to-slate-900/95 border-orange-500/30 shadow-lg shadow-orange-500/10 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Deal Badges */}
              <div className="absolute top-4 left-4 z-20 flex flex-col space-y-2">
                {deal.isTrending && (
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 shadow-lg">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    TRENDING
                  </Badge>
                )}
                {deal.isFlashSale && (
                  <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 shadow-lg animate-pulse">
                    <Zap className="mr-1 h-3 w-3" />
                    FLASH SALE
                  </Badge>
                )}
                {deal.isNew && (
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-lg">
                    <Star className="mr-1 h-3 w-3" />
                    NEW
                  </Badge>
                )}
              </div>

              {/* Discount Badge */}
              <div className="absolute top-4 right-4 z-20">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/30">
                  <div className="text-center">
                    <div className="text-sm font-bold text-white">{deal.discount}%</div>
                    <div className="text-xs text-white">OFF</div>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <CardContent className="relative z-10 p-6">
                {/* Deal Image/Icon */}
                <div className="text-center mb-4">
                  <div className="text-6xl mb-2">{deal.image}</div>
                  <h3 className="text-2xl font-bold text-white">{deal.title}</h3>
                  <div className="text-cyan-300 font-mono">{deal.route}</div>
                </div>

                {/* Pricing */}
                <div className="text-center mb-4">
                  <div className="text-sm text-slate-400 line-through">₹{deal.originalPrice.toLocaleString()}</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    ₹{deal.discountedPrice.toLocaleString()}
                  </div>
                  <div className="text-sm text-slate-400">{deal.airline}</div>
                </div>

                {/* Countdown Timer */}
                {timeLeft[deal.id] && (
                  <div className="mb-4 p-3 bg-slate-800/50 rounded-lg border border-red-500/30">
                    <div className="flex items-center justify-center space-x-2 text-red-400">
                      <Timer className="h-4 w-4" />
                      <span className="font-mono font-bold">
                        {formatTimeLeft(timeLeft[deal.id])}
                      </span>
                    </div>
                    <div className="text-xs text-center text-slate-400 mt-1">Deal expires soon!</div>
                  </div>
                )}

                {/* Book Button */}
                <Button 
                  onClick={() => handleBookDeal(deal)}
                  className="w-full bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 hover:from-orange-700 hover:via-red-600 hover:to-pink-700 border-0 shadow-2xl shadow-red-500/30 transition-all duration-300 hover:scale-105 font-bold"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  BOOK NOW
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Deals Message */}
        {filteredDeals.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <Zap className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-2">No deals in your budget</h3>
            <p className="text-slate-500 dark:text-slate-400">Try increasing your budget to see more amazing offers!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Deals;
