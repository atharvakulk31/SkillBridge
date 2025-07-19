import React from 'react';
import { Bell, Search, Settings } from 'lucide-react';
import { User } from '../../contexts/AuthContext';

interface HeaderProps {
  user: User | null;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200/50 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {user?.role === 'student' && 'Student Dashboard'}
            {user?.role === 'admin' && 'Admin Dashboard'}
          </h2>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-12 pr-4 py-3 w-80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50/50 hover:bg-white"
            />
          </div>
          
          <button className="relative p-3 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-300 hover:scale-110">
            <Bell className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg">
              3
            </span>
          </button>
          
          <button className="p-3 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-300 hover:scale-110">
            <Settings className="h-6 w-6" />
          </button>
          
          <div className="flex items-center space-x-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-2 hover:shadow-md transition-all duration-300">
            <img 
              src={user?.profile?.avatar} 
              alt={user?.name}
              className="w-12 h-12 rounded-xl object-cover shadow-md"
            />
            <div>
              <p className="font-bold text-gray-800">{user?.name}</p>
              <p className="text-sm text-indigo-600 capitalize font-medium">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;