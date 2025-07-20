import React from 'react';
import { Users, Briefcase, BarChart3, Building2 } from 'lucide-react';

interface StatItem {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>; // Proper type for Lucide icons
}

interface DriveItem {
  id: number;
  company: string;
  position: string;
  applications: number;
  deadline: string;
  status: string;
  package: string;
}

interface AdminDashboardContentProps {
  data: {
    stats: StatItem[];
    recentDrives: DriveItem[];
  };
}

const AdminDashboardContent: React.FC<AdminDashboardContentProps> = ({ data }) => {
  return (
    <div className="space-y-8 animate-slide-up">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-scale-in">
        {data.stats.map((stat, index) => {
          const Icon = stat.icon; // Get the icon component
          return (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 hover:transform hover:scale-105 group">
              <div className="flex items-center">
                <div className={`p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-all ${index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-green-500' : index === 2 ? 'bg-purple-500' : 'bg-orange-500'} text-white`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{stat.value}</p>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Drives */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50">
        <div className="p-6 border-b border-gray-100/50 flex items-center justify-between">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Recent Placement Drives</h2>
          <button className="text-indigo-600 hover:text-indigo-700 font-bold hover:transform hover:scale-105 transition-all">View All</button>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 text-sm font-bold">
                  <th className="pb-4">Company</th>
                  <th className="pb-4">Position</th>
                  <th className="pb-4">Applications</th>
                  <th className="pb-4">Deadline</th>
                  <th className="pb-4">Package</th>
                  <th className="pb-4">Status</th>
                </tr>
              </thead>
              <tbody className="space-y-4">
                {data.recentDrives.map((drive) => (
                  <tr key={drive.id} className="border-t border-gray-100/50 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-all duration-300">
                    <td className="py-4 font-bold text-gray-800">{drive.company}</td>
                    <td className="py-4 text-gray-600 font-medium">{drive.position}</td>
                    <td className="py-4 text-gray-600 font-medium">{drive.applications}</td>
                    <td className="py-4 text-gray-600 font-medium">{drive.deadline}</td>
                    <td className="py-4 text-gray-600 font-medium">{drive.package}</td>
                    <td className="py-4">
                      <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
                        drive.status === 'Active' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-yellow-500 text-white'
                      }`}>
                        {drive.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardContent;