import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  Briefcase, 
  BarChart3, 
  Settings, 
  Bell,
  Plus,
  Search,
  Filter,
  Download,
  Calendar,
  TrendingUp,
  UserCheck,
  Building2
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from '../Layout/Sidebar';
import Header from '../Layout/Header';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Shield },
    { id: 'drives', label: 'Manage Drives', icon: Briefcase },
    { id: 'students', label: 'Student Management', icon: Users },
    { id: 'companies', label: 'Company Relations', icon: Building2 },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'notifications', label: 'Announcements', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const stats = [
    { label: 'Total Students', value: '1,245', icon: Users, color: 'bg-blue-100 text-blue-600' },
    { label: 'Active Drives', value: '8', icon: Briefcase, color: 'bg-green-100 text-green-600' },
    { label: 'Placement Rate', value: '78%', icon: TrendingUp, color: 'bg-purple-100 text-purple-600' },
    { label: 'Companies', value: '45', icon: Building2, color: 'bg-orange-100 text-orange-600' },
  ];

  const recentDrives = [
    {
      id: 1,
      company: 'Google',
      position: 'Software Engineer',
      applications: 145,
      deadline: '2025-02-15',
      status: 'Active',
      package: '₹25 LPA'
    },
    {
      id: 2,
      company: 'Microsoft',
      position: 'SDE Intern',
      applications: 89,
      deadline: '2025-02-20',
      status: 'Active',
      package: '₹50k/month'
    },
    {
      id: 3,
      company: 'Amazon',
      position: 'Software Developer',
      applications: 67,
      deadline: '2025-02-25',
      status: 'Draft',
      package: '₹22 LPA'
    }
  ];

  const eligibleStudents = [
    { name: 'John Doe', department: 'CSE', gpa: '9.2', year: '4th Year', applications: 5 },
    { name: 'Jane Smith', department: 'ECE', gpa: '8.8', year: '4th Year', applications: 3 },
    { name: 'Mike Johnson', department: 'IT', gpa: '9.0', year: '4th Year', applications: 7 },
    { name: 'Sarah Wilson', department: 'CSE', gpa: '8.9', year: '4th Year', applications: 4 },
  ];

  const renderDashboard = () => (
    <div className="space-y-8 animate-slide-up">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-scale-in">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 hover:transform hover:scale-105 group">
              <div className="flex items-center">
                <div className={`p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-all ${stat.color.replace('text-', 'text-white bg-gradient-to-r from-').replace('bg-', 'to-')}`}>
                  <IconComponent className="h-6 w-6 text-white" />
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

      {/* Quick Actions */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold hover:transform hover:scale-105">
            <Plus className="h-5 w-5 mr-2" />
            Create New Drive
          </button>
          <button className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold hover:transform hover:scale-105">
            <Bell className="h-5 w-5 mr-2" />
            Send Announcement
          </button>
          <button className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold hover:transform hover:scale-105">
            <Download className="h-5 w-5 mr-2" />
            Export Reports
          </button>
        </div>
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
                  <th className="pb-4">Actions</th>
                </tr>
              </thead>
              <tbody className="space-y-4">
                {recentDrives.map((drive) => (
                  <tr key={drive.id} className="border-t border-gray-100/50 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-all duration-300">
                    <td className="py-4 font-bold text-gray-800">{drive.company}</td>
                    <td className="py-4 text-gray-600 font-medium">{drive.position}</td>
                    <td className="py-4 text-gray-600 font-medium">{drive.applications}</td>
                    <td className="py-4 text-gray-600 font-medium">{drive.deadline}</td>
                    <td className="py-4 text-gray-600 font-medium">{drive.package}</td>
                    <td className="py-4">
                      <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
                        drive.status === 'Active' 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
                          : 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white'
                      }`}>
                        {drive.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <button className="text-indigo-600 hover:text-indigo-700 font-bold hover:transform hover:scale-105 transition-all">
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Top Performing Students */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50">
        <div className="p-6 border-b border-gray-100/50">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Top Performing Students</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {eligibleStudents.map((student, index) => (
              <div key={index} className="flex items-center justify-between p-6 border border-gray-200/50 rounded-2xl hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105 bg-gradient-to-r from-white to-gray-50/50">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">{student.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{student.name}</h3>
                    <p className="text-gray-600 text-sm font-medium">{student.department} • {student.year}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm text-gray-600 font-medium">
                  <span>GPA: {student.gpa}</span>
                  <span>Applications: {student.applications}</span>
                  <button className="text-indigo-600 hover:text-indigo-700 font-bold hover:transform hover:scale-105 transition-all">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStudentManagement = () => (
    <div className="space-y-8 animate-slide-up">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50">
        <div className="p-6 border-b border-gray-100/50">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Student Management</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search students..."
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
                  <th className="pb-4">Student</th>
                  <th className="pb-4">Department</th>
                  <th className="pb-4">Year</th>
                  <th className="pb-4">GPA</th>
                  <th className="pb-4">Applications</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {eligibleStudents.map((student, index) => (
                  <tr key={index} className="border-t border-gray-100/50 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-all duration-300">
                    <td className="py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-sm">{student.name.charAt(0)}</span>
                        </div>
                        <span className="font-bold text-gray-800">{student.name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-gray-600 font-medium">{student.department}</td>
                    <td className="py-4 text-gray-600 font-medium">{student.year}</td>
                    <td className="py-4 text-gray-600 font-medium">{student.gpa}</td>
                    <td className="py-4 text-gray-600 font-medium">{student.applications}</td>
                    <td className="py-4">
                      <span className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full text-sm font-bold shadow-lg">
                        Active
                      </span>
                    </td>
                    <td className="py-4">
                      <button className="text-indigo-600 hover:text-indigo-700 font-bold mr-4 hover:transform hover:scale-105 transition-all">
                        View
                      </button>
                      <button className="text-gray-600 hover:text-gray-700 font-bold hover:transform hover:scale-105 transition-all">
                        Edit
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

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'students':
        return renderStudentManagement();
      case 'drives':
      case 'companies':
      case 'analytics':
      case 'notifications':
        return renderDashboard(); // For now, redirect to dashboard
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-pink-50/50">
      <Sidebar 
        items={sidebarItems} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onLogout={logout}
      />
      
      <div className="flex-1 overflow-hidden">
        <Header user={user} />
        
        <main className="flex-1 overflow-auto p-6 animate-fade-in">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;