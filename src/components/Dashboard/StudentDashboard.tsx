import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Bell, 
  FileText, 
  Users, 
  Settings, 
  Briefcase,
  Download,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from '../Layout/Sidebar';
import Header from '../Layout/Header';

// Interface Definitions
interface Drive {
  id: number;
  company: string;
  position: string;
  package: string;
  deadline: string;
  eligibility: {
    minCGPA: number;
    maxBacklogs: number;
    branches: string[];
    batchYear: number;
    additionalRequirements?: string;
    tenthPercentage?: number;
    twelfthPercentage?: number;
    diplomaPercentage?: number;
  };
  status: 'Draft' | 'Active' | 'Archived';
  createdAt?: Date;
}

interface Application {
  id: number;
  driveId: number;
  company: string;
  position: string;
  appliedDate: string;
  status: 'Applied' | 'Shortlisted' | 'Rejected' | 'Accepted';
}

interface StudentProfile {
  gpa: number;
  backlogs: number;
  branch: string;
  batchYear: number;
  tenthPercentage?: number;
  twelfthPercentage?: number;
  diplomaPercentage?: number;
}

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: boolean;
}

interface DriveCardProps {
  drive: Drive;
  onApply: (driveId: number) => void;
  applied: boolean;
}

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  value: string | number;
  label: string;
  color: string;
}

// Stat Card Component
const StatCard: React.FC<StatCardProps> = ({ icon: Icon, value, label, color }) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
    <div className="flex items-center">
      <div className={`p-3 rounded-xl shadow-lg bg-gradient-to-r ${color} text-white`}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="ml-4">
        <p className="text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent">{value}</p>
        <p className="text-gray-600 text-sm font-medium">{label}</p>
      </div>
    </div>
  </div>
);

// Drive Card Component
const DriveCard: React.FC<DriveCardProps> = ({ drive, onApply, applied }) => {
  const isNew = drive.createdAt && new Date(drive.createdAt) > new Date(Date.now() - 86400000);

  return (
    <div className={`p-6 border rounded-2xl hover:shadow-lg bg-white/80 backdrop-blur-sm transition-all duration-300 ${
      isNew ? 'border-blue-200 bg-blue-50/50' : 'border-gray-200'
    }`}>
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-bold text-gray-800 text-lg">{drive.company}</h3>
            {isNew && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                New
              </span>
            )}
          </div>
          <p className="text-gray-600 font-medium">{drive.position}</p>
          <div className="mt-2 space-y-1 text-sm">
            <p className="text-gray-500">Package: {drive.package}</p>
            <p className="text-gray-500">Deadline: {drive.deadline}</p>
            <p className="text-gray-500">
              Eligibility: CGPA ≥ {drive.eligibility.minCGPA}, Backlogs ≤ {drive.eligibility.maxBacklogs}
            </p>
          </div>
        </div>
        <button
          onClick={() => onApply(drive.id)}
          disabled={applied}
          className={`px-4 py-2 rounded-lg font-medium ${
            applied 
              ? 'bg-gray-200 text-gray-600 cursor-not-allowed' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {applied ? 'Applied' : 'Apply Now'}
        </button>
      </div>
    </div>
  );
};

// Main Student Dashboard Component
const StudentDashboard: React.FC<{
  drives?: Drive[];
  applications?: Application[];
  studentProfile: StudentProfile;
}> = ({ 
  drives = [], 
  applications = [], 
  studentProfile 
}) => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [filteredDrives, setFilteredDrives] = useState<Drive[]>([]);
  const [hasNewDrives, setHasNewDrives] = useState(false);

  // Filter eligible drives
  useEffect(() => {
    if (!studentProfile) return;

    const eligibleDrives = drives.filter(drive => {
      if (drive.status !== 'Active') return false;
      
      const e = drive.eligibility;
      const profile = studentProfile;
      
      return (
        profile.gpa >= e.minCGPA &&
        profile.backlogs <= e.maxBacklogs &&
        e.branches.includes(profile.branch) &&
        profile.batchYear === e.batchYear &&
        (!e.tenthPercentage || (profile.tenthPercentage ?? 100) >= e.tenthPercentage) &&
        (!e.twelfthPercentage || (profile.twelfthPercentage ?? 100) >= e.twelfthPercentage) &&
        (!e.diplomaPercentage || (profile.diplomaPercentage ?? 100) >= e.diplomaPercentage)
      );
    });

    setFilteredDrives(eligibleDrives);
    setHasNewDrives(
      eligibleDrives.some(d => 
        d.createdAt && new Date(d.createdAt) > new Date(Date.now() - 86400000)
      )
    );
  }, [drives, studentProfile]);

  const handleApply = (driveId: number) => {
    console.log('Applying to drive:', driveId);
    // TODO: Implement actual application logic
  };

  // Sidebar items configuration
  const sidebarItems: SidebarItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: GraduationCap },
    { id: 'drives', label: 'Placement Drives', icon: Briefcase, badge: hasNewDrives },
    { id: 'applications', label: 'My Applications', icon: FileText },
    { id: 'profile', label: 'Profile', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Empty state component
  const renderEmptyState = (message: string, icon?: React.ReactNode) => (
    <div className="text-center py-12 flex flex-col items-center">
      {icon || <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />}
      <p className="text-gray-500 text-lg">{message}</p>
    </div>
  );

  // Dashboard Tab
  const renderDashboard = () => (
    <div className="space-y-8 animate-slide-up">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-scale-in">
        <StatCard 
          icon={Briefcase} 
          value={filteredDrives.length} 
          label="Eligible Drives" 
          color="from-blue-500 to-indigo-600" 
        />
        <StatCard 
          icon={FileText} 
          value={applications.length} 
          label="Applications" 
          color="from-green-500 to-emerald-600" 
        />
        <StatCard 
          icon={Clock} 
          value={new Date().toLocaleDateString()} 
          label="Today's Date" 
          color="from-purple-500 to-pink-600" 
        />
      </div>
      
      {hasNewDrives && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 animate-pulse">
          <h3 className="font-bold text-blue-800 flex items-center">
            <Bell className="h-5 w-5 mr-2" />
            New Drives Available!
          </h3>
          <p className="text-sm text-blue-700 mt-1">
            Check the Placement Drives tab to view new opportunities.
          </p>
        </div>
      )}
    </div>
  );

  // Drives Tab
  const renderDrives = () => (
    <div className="space-y-6 animate-slide-up">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Available Drives
        </h2>
        <button className="flex items-center text-sm text-indigo-600 hover:text-indigo-700">
          <Download className="h-4 w-4 mr-1" /> Export
        </button>
      </div>

      {filteredDrives.length === 0 ? (
        renderEmptyState("No eligible drives available at the moment.")
      ) : (
        <div className="space-y-4">
          {filteredDrives.map(drive => (
            <DriveCard 
              key={drive.id} 
              drive={drive} 
              onApply={handleApply}
              applied={applications.some(app => app.driveId === drive.id)}
            />
          ))}
        </div>
      )}
    </div>
  );

  // Applications Tab
  const renderApplications = () => (
    <div className="space-y-6 animate-slide-up">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        My Applications
      </h2>

      {applications.length === 0 ? (
        renderEmptyState(
          "You haven't applied to any drives yet.",
          <FileText className="h-12 w-12 text-gray-400 mb-4" />
        )
      ) : (
        <div className="space-y-4">
          {applications.map(app => {
            let statusIcon, statusColor;
            switch(app.status) {
              case 'Applied':
                statusIcon = <FileText className="h-4 w-4" />;
                statusColor = 'bg-blue-100 text-blue-800';
                break;
              case 'Shortlisted':
                statusIcon = <CheckCircle className="h-4 w-4" />;
                statusColor = 'bg-green-100 text-green-800';
                break;
              case 'Rejected':
                statusIcon = <XCircle className="h-4 w-4" />;
                statusColor = 'bg-red-100 text-red-800';
                break;
              case 'Accepted':
                statusIcon = <CheckCircle className="h-4 w-4" />;
                statusColor = 'bg-purple-100 text-purple-800';
                break;
              default:
                statusIcon = <FileText className="h-4 w-4" />;
                statusColor = 'bg-gray-100 text-gray-800';
            }

            return (
              <div key={app.id} className="p-6 border border-gray-200 rounded-2xl bg-white/80 backdrop-blur-sm transition-all duration-300">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{app.company}</h3>
                    <p className="text-gray-600 font-medium">{app.position}</p>
                    <p className="text-sm text-gray-500 mt-2">Applied on {app.appliedDate}</p>
                  </div>
                  <span className={`flex items-center px-4 py-2 rounded-full text-sm font-bold ${statusColor}`}>
                    {statusIcon}
                    <span className="ml-2">{app.status}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  // Profile Tab
  const renderProfile = () => (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 animate-scale-in p-6">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
        Profile Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 font-medium">
        <div><span className="font-bold">Name:</span> {user?.name}</div>
        <div><span className="font-bold">Email:</span> {user?.email}</div>
        <div><span className="font-bold">GPA:</span> {studentProfile.gpa}</div>
        <div><span className="font-bold">Backlogs:</span> {studentProfile.backlogs}</div>
        <div><span className="font-bold">Branch:</span> {studentProfile.branch}</div>
        <div><span className="font-bold">Batch Year:</span> {studentProfile.batchYear}</div>
        {studentProfile.tenthPercentage && (
          <div><span className="font-bold">10th Percentage:</span> {studentProfile.tenthPercentage}%</div>
        )}
        {studentProfile.twelfthPercentage && (
          <div><span className="font-bold">12th Percentage:</span> {studentProfile.twelfthPercentage}%</div>
        )}
        {studentProfile.diplomaPercentage && (
          <div><span className="font-bold">Diploma Percentage:</span> {studentProfile.diplomaPercentage}%</div>
        )}
      </div>
    </div>
  );

  // Main Render
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
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'drives' && renderDrives()}
          {activeTab === 'applications' && renderApplications()}
          {activeTab === 'profile' && renderProfile()}
          {activeTab === 'settings' && renderEmptyState("Settings page coming soon")}
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;