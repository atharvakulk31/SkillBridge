import React, { useState } from 'react';
import { 
  GraduationCap, 
  Bell, 
  Calendar, 
  FileText, 
  Users, 
  Settings, 
  LogOut,
  Briefcase,
  TrendingUp,
  Download,
  Upload,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from '../Layout/Sidebar';
import Header from '../Layout/Header';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: GraduationCap },
    { id: 'drives', label: 'Placement Drives', icon: Briefcase },
    { id: 'applications', label: 'My Applications', icon: FileText },
    { id: 'profile', label: 'Profile', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const upcomingDrives = [
    {
      id: 1,
      company: 'Google',
      position: 'Software Engineer',
      package: '₹25 LPA',
      deadline: '2025-02-15',
      eligibility: '8.5 CGPA',
      logo: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      eligible: true
    },
    {
      id: 2,
      company: 'Microsoft',
      position: 'SDE Intern',
      package: '₹50k/month',
      deadline: '2025-02-20',
      eligibility: '8.0 CGPA',
      logo: 'https://images.pexels.com/photos/574069/pexels-photo-574069.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      eligible: true
    },
    {
      id: 3,
      company: 'Amazon',
      position: 'Software Developer',
      package: '₹22 LPA',
      deadline: '2025-02-25',
      eligibility: '9.0 CGPA',
      logo: 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      eligible: false
    }
  ];

  const applications = [
    {
      id: 1,
      company: 'TCS',
      position: 'Software Engineer',
      appliedDate: '2025-01-10',
      status: 'Applied',
      statusColor: 'text-blue-600 bg-blue-100'
    },
    {
      id: 2,
      company: 'Infosys',
      position: 'System Engineer',
      appliedDate: '2025-01-08',
      status: 'Shortlisted',
      statusColor: 'text-green-600 bg-green-100'
    },
    {
      id: 3,
      company: 'Wipro',
      position: 'Developer',
      appliedDate: '2025-01-05',
      status: 'Rejected',
      statusColor: 'text-red-600 bg-red-100'
    }
  ];

  const renderDashboard = () => (
    <div className="space-y-8 animate-slide-up">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-scale-in">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 hover:transform hover:scale-105 group">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">12</p>
              <p className="text-gray-600 text-sm font-medium">Available Drives</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 hover:transform hover:scale-105 group">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">5</p>
              <p className="text-gray-600 text-sm font-medium">Applications</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 hover:transform hover:scale-105 group">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">3</p>
              <p className="text-gray-600 text-sm font-medium">Pending</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 hover:transform hover:scale-105 group">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">8.5</p>
              <p className="text-gray-600 text-sm font-medium">Current GPA</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Drives */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50">
        <div className="p-6 border-b border-gray-100/50">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Upcoming Placement Drives</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {upcomingDrives.map((drive) => (
              <div key={drive.id} className="flex items-center justify-between p-6 border border-gray-200/50 rounded-2xl hover:border-indigo-300 transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105 bg-gradient-to-r from-white to-gray-50/50">
                <div className="flex items-center space-x-4">
                  <img 
                    src={drive.logo} 
                    alt={drive.company}
                    className="w-16 h-16 rounded-xl object-cover shadow-md"
                  />
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{drive.company}</h3>
                    <p className="text-gray-600 font-medium">{drive.position}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                      <span>{drive.package}</span>
                      <span>•</span>
                      <span>Deadline: {drive.deadline}</span>
                      <span>•</span>
                      <span>Min: {drive.eligibility}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {drive.eligible ? (
                    <span className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full text-sm font-bold shadow-lg">
                      Eligible
                    </span>
                  ) : (
                    <span className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-full text-sm font-bold shadow-lg">
                      Not Eligible
                    </span>
                  )}
                  <button 
                    disabled={!drive.eligible}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold hover:transform hover:scale-105"
                  >
                    Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50">
        <div className="p-6 border-b border-gray-100/50">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Recent Applications</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {applications.map((app) => (
              <div key={app.id} className="flex items-center justify-between p-6 border border-gray-200/50 rounded-2xl hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105 bg-gradient-to-r from-white to-gray-50/50">
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">{app.company}</h3>
                  <p className="text-gray-600 font-medium">{app.position}</p>
                  <p className="text-sm text-gray-500 font-medium">Applied on {app.appliedDate}</p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${app.statusColor}`}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 animate-scale-in">
      <div className="p-6 border-b border-gray-100/50">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Profile Information</h2>
      </div>
      <div className="p-6">
        <div className="flex items-start space-x-6">
          <img 
            src={user?.profile?.avatar} 
            alt={user?.name}
            className="w-32 h-32 rounded-2xl object-cover shadow-xl"
          />
          <div className="flex-1">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">{user?.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 font-medium">
              <div>
                <span className="font-bold text-gray-700">Email:</span> {user?.email}
              </div>
              <div>
                <span className="font-bold text-gray-700">Department:</span> {user?.profile?.department}
              </div>
              <div>
                <span className="font-bold text-gray-700">Year:</span> {user?.profile?.year}
              </div>
              <div>
                <span className="font-bold text-gray-700">GPA:</span> {user?.profile?.gpa}
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Resume</label>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold hover:transform hover:scale-105">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Resume
                  </button>
                  <button className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold hover:transform hover:scale-105">
                    <Download className="h-4 w-4 mr-2" />
                    Download Current
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'profile':
        return renderProfile();
      case 'drives':
        return renderDashboard(); // For now, showing drives in dashboard
      case 'applications':
        return renderDashboard(); // For now, showing applications in dashboard
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

export default StudentDashboard;