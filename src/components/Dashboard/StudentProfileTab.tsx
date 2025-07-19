import React from 'react';
import { 
  User, 
  BookOpen, 
  Clock, 
  Award, 
  Percent, 
  Calendar,
  FileText,
  Edit,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface StudentProfile {
  gpa: number;
  backlogs: number;
  branch: string;
  batchYear: number;
  tenthPercentage?: number;
  twelfthPercentage?: number;
  diplomaPercentage?: number;
  skills?: string[];
  resumeUrl?: string;
}

interface StudentProfileTabProps {
  profile: StudentProfile | null;
  loading?: boolean;
}

const StudentProfileTab: React.FC<StudentProfileTabProps> = ({ profile, loading = false }) => {
  const { user } = useAuth();

  const ProfileField = ({ 
    icon: Icon, 
    label, 
    value 
  }: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: React.ReactNode;
  }) => (
    <div className="flex items-start space-x-4 p-4 border-b border-gray-100 last:border-0">
      <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-gray-800 font-medium">{value || 'Not specified'}</p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="text-center py-12">
        <Loader2 className="h-8 w-8 text-indigo-600 animate-spin mx-auto" />
        <p className="mt-4 text-gray-600">Loading your profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-12 flex flex-col items-center">
        <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-500">Profile not available</h3>
        <p className="text-gray-400 mt-2">
          {user ? "We couldn't load your profile data" : "Please sign in to view your profile"}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-fade-in max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
            <User className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold">{user?.name}</h2>
            <p className="text-indigo-100">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="divide-y divide-gray-100">
        <ProfileField 
          icon={BookOpen} 
          label="Branch" 
          value={profile.branch} 
        />
        
        <ProfileField 
          icon={Calendar} 
          label="Batch Year" 
          value={profile.batchYear} 
        />
        
        <ProfileField 
          icon={Award} 
          label="CGPA" 
          value={profile.gpa.toFixed(2)} 
        />
        
        <ProfileField 
          icon={Clock} 
          label="Backlogs" 
          value={profile.backlogs} 
        />
        
        {profile.tenthPercentage && (
          <ProfileField 
            icon={Percent} 
            label="10th Percentage" 
            value={`${profile.tenthPercentage}%`} 
          />
        )}
        
        {profile.twelfthPercentage && (
          <ProfileField 
            icon={Percent} 
            label="12th Percentage" 
            value={`${profile.twelfthPercentage}%`} 
          />
        )}
        
        {profile.diplomaPercentage && (
          <ProfileField 
            icon={Percent} 
            label="Diploma Percentage" 
            value={`${profile.diplomaPercentage}%`} 
          />
        )}
        
        {profile.skills && profile.skills.length > 0 && (
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                <Award className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">Skills</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {profile.resumeUrl && (
          <div className="p-4">
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <FileText className="h-4 w-4 mr-2" />
              View Resume
            </a>
          </div>
        )}
      </div>

      {/* Edit Profile Button */}
      <div className="p-4 border-t border-gray-100">
        <button className="w-full py-2 px-4 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors flex items-center justify-center">
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default StudentProfileTab;