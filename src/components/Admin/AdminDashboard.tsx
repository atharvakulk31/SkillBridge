import React, { useState, useEffect } from 'react';
import { 
  Shield, Briefcase, Users, Building2, BarChart3, Settings,
  PieChart, LineChart, FileText, Mail, Phone, User, Lock, Bell, Database
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from '../Layout/Sidebar';
import Header from '../Layout/Header';
import LoadingSpinner from '../LoadingSpinner';
import AdminDashboardContent from './AdminDashboardContent';
import StudentManagement from './StudentManagement';
import DriveManagement from './DriveManagement';
import CompanyRelations from './CompanyRelation';
import AnalyticsDashboard from './Analytics';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}

interface Drive {
  id: number;
  company: string;
  position: string;
  applications: number;
  deadline: string;
  status: 'Draft' | 'Active' | 'Archived';
  package: string;
}

interface Company {
  id: number;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  lastContact: string;
  status: 'Active' | 'Draft' | 'Inactive';
  partnershipSince: string;
}

interface PlacementStat {
  department: string;
  students: number;
  placed: number;
  placementRate: number;
  avgPackage: string;
}

interface DashboardData {
  stats: {
    label: string;
    value: string;
    icon: React.ComponentType<any>;
  }[];
  recentDrives: Drive[];
  eligibleStudents: {
    name: string;
    department: string;
    gpa: string;
    year: string;
    applications: number;
  }[];
  companies: Company[];
  placementStats: PlacementStat[];
}

const SettingsPage = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [autoUpdates, setAutoUpdates] = useState(true);
  const [errorReporting, setErrorReporting] = useState(true);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-slide-up">
      <div className="flex items-center mb-8">
        <Settings className="h-6 w-6 text-indigo-600 mr-2" aria-hidden="true" />
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Account Settings Card */}
        <section className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all">
          <div className="flex items-center mb-4">
            <User className="h-5 w-5 text-indigo-500 mr-3" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-gray-700">Account Settings</h2>
          </div>
          <p className="text-gray-600 mb-4">Manage your profile information and login details</p>
          <button 
            className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium"
            aria-label="Configure account settings"
          >
            Configure
          </button>
        </section>

        {/* Security Settings Card */}
        <section className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all">
          <div className="flex items-center mb-4">
            <Lock className="h-5 w-5 text-indigo-500 mr-3" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-gray-700">Security</h2>
          </div>
          <p className="text-gray-600 mb-4">Change password, enable 2FA, and manage sessions</p>
          <button 
            className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium"
            aria-label="Manage security settings"
          >
            Secure Account
          </button>
        </section>

        {/* Notifications Card */}
        <section className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all">
          <div className="flex items-center mb-4">
            <Bell className="h-5 w-5 text-indigo-500 mr-3" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-gray-700">Notifications</h2>
          </div>
          <p className="text-gray-600 mb-4">Configure email and in-app notifications</p>
          <button 
            className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium"
            aria-label="Manage notification settings"
          >
            Manage Alerts
          </button>
        </section>

        {/* Email Settings Card */}
        <section className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all">
          <div className="flex items-center mb-4">
            <Mail className="h-5 w-5 text-indigo-500 mr-3" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-gray-700">Email Configuration</h2>
          </div>
          <p className="text-gray-600 mb-4">Set up email templates and SMTP settings</p>
          <button 
            className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium"
            aria-label="Configure email settings"
          >
            Configure Email
          </button>
        </section>

        {/* Database Backup Card */}
        <section className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all">
          <div className="flex items-center mb-4">
            <Database className="h-5 w-5 text-indigo-500 mr-3" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-gray-700">Database</h2>
          </div>
          <p className="text-gray-600 mb-4">Backup and restore your application data</p>
          <button 
            className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium"
            aria-label="Manage database settings"
          >
            Manage Database
          </button>
        </section>

        {/* Privacy Settings Card */}
        <section className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all">
          <div className="flex items-center mb-4">
            <Shield className="h-5 w-5 text-indigo-500 mr-3" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-gray-700">Privacy</h2>
          </div>
          <p className="text-gray-600 mb-4">Configure GDPR and data privacy settings</p>
          <button 
            className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium"
            aria-label="Manage privacy settings"
          >
            Privacy Center
          </button>
        </section>
      </div>

      {/* System Settings Section */}
      <section className="mt-10 bg-gray-50 p-6 rounded-xl border border-gray-200" aria-labelledby="system-settings-heading">
        <h2 id="system-settings-heading" className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Settings className="h-5 w-5 text-indigo-500 mr-2" aria-hidden="true" />
          System Settings
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label htmlFor="maintenance-mode" className="font-medium text-gray-700">Maintenance Mode</label>
              <p id="maintenance-mode-desc" className="text-sm text-gray-500">Temporarily disable access to the platform</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                id="maintenance-mode"
                checked={maintenanceMode}
                onChange={() => setMaintenanceMode(!maintenanceMode)}
                aria-describedby="maintenance-mode-desc"
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label htmlFor="auto-updates" className="font-medium text-gray-700">Auto Updates</label>
              <p id="auto-updates-desc" className="text-sm text-gray-500">Automatically install system updates</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                id="auto-updates"
                checked={autoUpdates}
                onChange={() => setAutoUpdates(!autoUpdates)}
                aria-describedby="auto-updates-desc"
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label htmlFor="error-reporting" className="font-medium text-gray-700">Error Reporting</label>
              <p id="error-reporting-desc" className="text-sm text-gray-500">Send error reports to help improve the system</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                id="error-reporting"
                checked={errorReporting}
                onChange={() => setErrorReporting(!errorReporting)}
                aria-describedby="error-reporting-desc"
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button 
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            aria-label="Save system settings"
          >
            Save System Settings
          </button>
        </div>
      </section>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardData | null>(null);

  const sidebarItems: SidebarItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: Shield },
    { id: 'drives', label: 'Manage Drives', icon: Briefcase },
    { id: 'students', label: 'Student Management', icon: Users },
    { id: 'companies', label: 'Company Relations', icon: Building2 },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  useEffect(() => {
    const fetchAdminData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 600));
        
        const mockData: DashboardData = {
          stats: [
            { label: 'Total Students', value: '1,245', icon: Users },
            { label: 'Active Drives', value: '8', icon: Briefcase },
            { label: 'Placement Rate', value: '78%', icon: BarChart3 },
            { label: 'Companies', value: '45', icon: Building2 },
          ],
          recentDrives: [
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
          ],
          eligibleStudents: [
            { name: 'John Doe', department: 'CSE', gpa: '9.2', year: '4th Year', applications: 5 },
            { name: 'Jane Smith', department: 'ECE', gpa: '8.8', year: '4th Year', applications: 3 },
            { name: 'Mike Johnson', department: 'IT', gpa: '9.0', year: '4th Year', applications: 7 },
            { name: 'Sarah Wilson', department: 'CSE', gpa: '8.9', year: '4th Year', applications: 4 },
          ],
          companies: [
            {
              id: 1,
              name: 'Google',
              contactPerson: 'Sarah Johnson',
              email: 's.johnson@google.com',
              phone: '(650) 253-0000',
              lastContact: '2025-01-15',
              status: 'Active',
              partnershipSince: '2020-05-10'
            },
            {
              id: 2,
              name: 'Microsoft',
              contactPerson: 'David Chen',
              email: 'david.chen@microsoft.com',
              phone: '(425) 882-8080',
              lastContact: '2025-01-10',
              status: 'Active',
              partnershipSince: '2019-11-22'
            },
            {
              id: 3,
              name: 'Amazon',
              contactPerson: 'Priya Patel',
              email: 'ppatel@amazon.com',
              phone: '(206) 266-1000',
              lastContact: '2024-12-20',
              status: 'Draft',
              partnershipSince: '2023-03-15'
            }
          ],
          placementStats: [
            { department: 'Computer Science', students: 450, placed: 390, placementRate: 87, avgPackage: '₹24 LPA' },
            { department: 'Electrical Engineering', students: 320, placed: 240, placementRate: 75, avgPackage: '₹18 LPA' },
            { department: 'Mechanical Engineering', students: 280, placed: 210, placementRate: 75, avgPackage: '₹16 LPA' },
            { department: 'Business Administration', students: 195, placed: 132, placementRate: 68, avgPackage: '₹12 LPA' },
          ]
        };
        
        setData(mockData);
      } catch (error) {
        console.error('Failed to fetch admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [activeTab]);

  if (!user || user.role !== 'admin') {
    return <LoadingSpinner fullScreen />;
  }

  if (loading || !data) {
    return <LoadingSpinner fullScreen />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboardContent data={data} />;
      case 'students':
        return <StudentManagement students={data.eligibleStudents} />;
      case 'drives':
        return <DriveManagement drives={data.recentDrives} />;
      case 'companies':
        return <CompanyRelations companies={data.companies} />;
      case 'analytics':
        return <AnalyticsDashboard 
          stats={data.stats} 
          placementStats={data.placementStats} 
          recentDrives={data.recentDrives} 
        />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <AdminDashboardContent data={data} />;
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
      
      <div className="flex-1 overflow-hidden flex flex-col">
        <Header user={user} />
        
        <main className="flex-1 overflow-auto p-6 animate-fade-in">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;