import React from 'react';
import { LogOut } from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}

interface SidebarProps {
  items: SidebarItem[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ items, activeTab, setActiveTab, onLogout }) => {
  return (
    <div className="w-64 bg-white/95 backdrop-blur-sm shadow-xl border-r border-gray-200/50">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">PlacementPro</h1>
        </div>
      </div>
      
      <nav className="px-4 py-4 space-y-2">
        {items.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-300 group ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 hover:transform hover:scale-105'
              }`}
            >
              <IconComponent className={`h-5 w-5 mr-3 transition-all ${
                activeTab === item.id ? 'text-white' : 'text-gray-500 group-hover:text-indigo-600'
              }`} />
              <span className="font-semibold">{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-100">
        <button
          onClick={onLogout}
          className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-300 hover:transform hover:scale-105 group"
        >
          <LogOut className="h-5 w-5 mr-3 group-hover:text-red-600 transition-colors" />
          <span className="font-semibold">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;