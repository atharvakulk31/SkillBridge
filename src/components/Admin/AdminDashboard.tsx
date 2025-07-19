import React, { useState, useEffect } from 'react';
import { 
  Shield, Briefcase, Users, Building2, BarChart3, Settings
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

interface EligibilityCriteria {
  minCGPA: number;
  maxBacklogs: number;
  branches: string[];
  batchYear: number;
  additionalRequirements: string;
  tenthPercentage?: number;
  twelfthPercentage?: number;
  diplomaPercentage?: number;
}

interface Drive {
  id: number;
  company: string;
  position: string;
  applications: number;
  deadline: string;
  status: 'Draft' | 'Active' | 'Archived';
  package: string;
  eligibility: EligibilityCriteria;
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
              package: '₹25 LPA',
              eligibility: {
                minCGPA: 7.5,
                maxBacklogs: 0,
                branches: ['Computer Science', 'Information Technology'],
                batchYear: 2025,
                additionalRequirements: 'Strong problem solving skills',
                tenthPercentage: 75,
                twelfthPercentage: 80
              }
            },
            {
              id: 2,
              company: 'Microsoft',
              position: 'SDE Intern',
              applications: 89,
              deadline: '2025-02-20',
              status: 'Active',
              package: '₹50k/month',
              eligibility: {
                minCGPA: 7.0,
                maxBacklogs: 1,
                branches: ['Computer Science', 'Electronics'],
                batchYear: 2025,
                additionalRequirements: 'Basic programming knowledge',
                tenthPercentage: 70,
                twelfthPercentage: 75
              }
            },
            {
              id: 3,
              company: 'Amazon',
              position: 'Software Developer',
              applications: 67,
              deadline: '2025-02-25',
              status: 'Draft',
              package: '₹22 LPA',
              eligibility: {
                minCGPA: 6.5,
                maxBacklogs: 2,
                branches: ['Computer Science', 'Information Technology', 'Electronics'],
                batchYear: 2025,
                additionalRequirements: 'Web development experience preferred',
                tenthPercentage: 65,
                twelfthPercentage: 70
              }
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
        return <DriveManagement data={{ recentDrives: data.recentDrives }} />;
      case 'companies':
        return <CompanyRelations companies={data.companies} />;
      case 'analytics':
        return <AnalyticsDashboard 
          stats={data.stats} 
          placementStats={data.placementStats} 
          recentDrives={data.recentDrives} 
        />;
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