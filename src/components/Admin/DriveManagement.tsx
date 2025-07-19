import React from 'react';
import { Plus, Search, Filter, Download } from 'lucide-react';

interface Drive {
  id: number;
  company: string;
  position: string;
  applications: number;
  deadline: string;
  status: string;
  package: string;
}

interface DriveManagementProps {
  data: {
    recentDrives: Drive[];
  };
}

const DriveManagement: React.FC<DriveManagementProps> = ({ data }) => {
  return (
    <div className="space-y-8 animate-slide-up">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50">
        <div className="p-6 border-b border-gray-100/50">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Drive Management</h2>
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold hover:transform hover:scale-105">
                <Plus className="h-4 w-4 mr-2" />
                Add New Drive
              </button>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search drives..."
                  className="pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50/50 hover:bg-white transition-all"
                />
              </div>
              <button className="flex items-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all font-semibold hover:transform hover:scale-105">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
              <button className="flex items-center px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold hover:transform hover:scale-105">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>
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
                  <th className="pb-4">Actions</th>
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
                    <td className="py-4">
                      <button className="text-indigo-600 hover:text-indigo-700 font-bold hover:transform hover:scale-105 transition-all mr-3">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-700 font-bold hover:transform hover:scale-105 transition-all">
                        Delete
                      </button>
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

export default DriveManagement;