import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, Plane, LogOut, User, Calendar, Zap } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

interface UserData {
  name: string;
  email: string;
}
const Header = () => {
  const { theme, setTheme } = useTheme();
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    setUserData(null);
    navigate('/login');
  };

  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
    
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Atrika Flights
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Premium Travel Experience</p>
            </div>
          </div>

 
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
            >
              Home
            </Link>
           <Link 
  to="https://fly-high-by-aritra.vercel.app/" 
  className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
>
  View Routes
</Link>

            <Link 
              to="/deals" 
              className="text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium flex items-center space-x-1"
            >
              <Zap className="h-4 w-4" />
              <span>Deals</span>
            </Link>
            <Link 
              to="/bookings" 
              className="text-slate-700 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium flex items-center space-x-1"
            >
              <Calendar className="h-4 w-4" />
              <span>Bookings</span>
            </Link>
            <Link 
              to="/dashboard" 
              className="text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium"
            >
              Dashboard
            </Link>
          </nav>

          <div className="flex items-center space-x-4">

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="w-9 h-9 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

       
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-lg">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt="User" />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                      {userData?.name ? userData.name.charAt(0).toUpperCase() : 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-700" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userData?.name || 'Guest User'}</p>
                    <p className="text-xs leading-none text-muted-foreground">{userData?.email || 'guest@example.com'}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="flex items-center cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/bookings" className="flex items-center cursor-pointer">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>My Bookings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/deals" className="flex items-center cursor-pointer">
                    <Zap className="mr-2 h-4 w-4" />
                    <span>Special Deals</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 dark:text-red-400 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
                <div className="flex flex-col space-y-4 mt-8">
                  <Link to="/" className="text-lg font-medium">Home</Link>
                   <Link 
  to="https://fly-high-by-aritra.vercel.app/" 
  target="_blank"
  rel="noopener noreferrer"
  className="text-lg font-medium flex items-center space-x-2"
>
  <Plane className="h-4 w-4" />
  <span>View Routes</span>
</Link>

                  <Link to="/deals" className="text-lg font-medium flex items-center space-x-2">
                    <Zap className="h-4 w-4" />
                    <span>Deals</span>
                  </Link>
                  <Link to="/bookings" className="text-lg font-medium flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Bookings</span>
                  </Link>
                  <Link to="/dashboard" className="text-lg font-medium">Dashboard</Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
