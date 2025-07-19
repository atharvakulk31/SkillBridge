import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Briefcase, 
  Users, 
  Building2, 
  BarChart3, 
  Settings,
  // Add other required icons here
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from '../Layout/Sidebar';
import Header from '../Layout/Header';
import LoadingSpinner from '../LoadingSpinner';
import AdminDashboardContent from './AdminDashboardContent';
import StudentManagement from './StudentManagement';
import DriveManagement from './DriveManagement'; // Make sure this component exists

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

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
        
        const mockData = {
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

  if (!user || user.role !== 'admin' || loading || !data) {
    return <LoadingSpinner fullScreen />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboardContent data={data} />;
      case 'students':
        return <StudentManagement data={data} />;
      case 'drives':
        return <DriveManagement data={data} />;
      // Add other cases as needed
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