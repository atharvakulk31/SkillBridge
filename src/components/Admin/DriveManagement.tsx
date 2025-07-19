import React, { useState } from 'react';
import { Plus, Search, Filter, Download, Edit2, Trash2, X, ChevronDown, Check } from 'lucide-react';

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

const allBranches = [
  'Computer Science',
  'Information Technology',
  'Electronics',
  'Electrical',
  'Mechanical',
  'Civil',
  'Chemical',
  'Biotechnology'
];

const DriveManagement: React.FC<{ data: { recentDrives: Drive[] } }> = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [drives, setDrives] = useState<Drive[]>(data.recentDrives);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDrive, setCurrentDrive] = useState<Drive | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [statusChangeId, setStatusChangeId] = useState<number | null>(null);
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);

  const defaultEligibility: EligibilityCriteria = {
    minCGPA: 6.0,
    maxBacklogs: 0,
    branches: [...allBranches],
    batchYear: new Date().getFullYear(),
    additionalRequirements: '',
    tenthPercentage: 60,
    twelfthPercentage: 60,
    diplomaPercentage: 60
  };

  const openDriveModal = (drive: Drive | null = null) => {
    setCurrentDrive(drive || {
      id: 0,
      company: '',
      position: '',
      applications: 0,
      deadline: '',
      status: 'Draft',
      package: '',
      eligibility: { ...defaultEligibility }
    });
    setSelectedBranches(drive?.eligibility?.branches || [...allBranches]);
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('eligibility.')) {
      const eligibilityField = name.split('.')[1];
      setCurrentDrive(prev => ({
        ...(prev || {
          id: 0,
          company: '',
          position: '',
          applications: 0,
          deadline: '',
          status: 'Draft',
          package: '',
          eligibility: { ...defaultEligibility }
        }),
        eligibility: {
          ...(prev?.eligibility || { ...defaultEligibility }),
          [eligibilityField]: ['minCGPA', 'maxBacklogs', 'batchYear', 'tenthPercentage', 'twelfthPercentage', 'diplomaPercentage'].includes(eligibilityField)
            ? parseFloat(value) || 0
            : value
        }
      }));
    } else {
      setCurrentDrive(prev => ({
        ...(prev || {
          id: 0,
          company: '',
          position: '',
          applications: 0,
          deadline: '',
          status: 'Draft',
          package: '',
          eligibility: { ...defaultEligibility }
        }),
        [name]: name === 'applications' ? parseInt(value) || 0 : value
      }));
    }
  };

  const toggleBranchSelection = (branch: string) => {
    const newBranches = selectedBranches.includes(branch)
      ? selectedBranches.filter(b => b !== branch)
      : [...selectedBranches, branch];
    
    setSelectedBranches(newBranches);
    setCurrentDrive(prev => ({
      ...(prev || {
        id: 0,
        company: '',
        position: '',
        applications: 0,
        deadline: '',
        status: 'Draft',
        package: '',
        eligibility: { ...defaultEligibility }
      }),
      eligibility: {
        ...(prev?.eligibility || { ...defaultEligibility }),
        branches: newBranches
      }
    }));
  };

  const toggleAllBranches = (selectAll: boolean) => {
    const newBranches = selectAll ? [...allBranches] : [];
    setSelectedBranches(newBranches);
    setCurrentDrive(prev => ({
      ...(prev || {
        id: 0,
        company: '',
        position: '',
        applications: 0,
        deadline: '',
        status: 'Draft',
        package: '',
        eligibility: { ...defaultEligibility }
      }),
      eligibility: {
        ...(prev?.eligibility || { ...defaultEligibility }),
        branches: newBranches
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentDrive) return;

    const driveToSubmit = {
      ...currentDrive,
      eligibility: {
        ...currentDrive.eligibility,
        branches: selectedBranches
      }
    };

    if (driveToSubmit.id) {
      setDrives(drives.map(d => d.id === driveToSubmit.id ? driveToSubmit : d));
      setSuccessMessage('Drive updated successfully!');
    } else {
      const newId = drives.length > 0 ? Math.max(...drives.map(d => d.id)) + 1 : 1;
      setDrives([{ ...driveToSubmit, id: newId }, ...drives]);
      setSuccessMessage('Drive added successfully!');
    }

    setIsModalOpen(false);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleDeleteDrive = (id: number) => {
    if (window.confirm('Are you sure you want to delete this drive?')) {
      setDrives(drives.filter(drive => drive.id !== id));
      setSuccessMessage('Drive deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleStatusChange = (id: number, newStatus: Drive['status']) => {
    setDrives(drives.map(drive => 
      drive.id === id ? { ...drive, status: newStatus } : drive
    ));
    setStatusChangeId(null);
    setSuccessMessage(`Status changed to ${newStatus}`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleExport = () => {
    const csvContent = [
      ['Company', 'Position', 'Applications', 'Deadline', 'Package', 'Status', 'Eligibility Criteria'],
      ...drives.map(drive => [
        drive.company,
        drive.position,
        drive.applications.toString(),
        drive.deadline,
        drive.package,
        drive.status,
        `CGPA: ${drive.eligibility.minCGPA}+ | Backlogs: ${drive.eligibility.maxBacklogs} | Branches: ${drive.eligibility.branches?.join(', ') || 'All'} | Year: ${drive.eligibility.batchYear} | ${drive.eligibility.additionalRequirements}`
      ])
    ].map(e => e.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'drives_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredDrives = drives
    .filter(drive => 
      drive.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drive.position.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(drive => 
      filterStatus === 'All' || drive.status === filterStatus
    );

  return (
    <div className="space-y-8 animate-slide-up">
      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">
          {successMessage}
        </div>
      )}

      {statusChangeId !== null && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 z-40" 
          onClick={() => setStatusChangeId(null)}
        ></div>
      )}

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50">
        <div className="p-6 border-b border-gray-100/50">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Drive Management
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button 
                onClick={() => openDriveModal(null)}
                className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold hover:transform hover:scale-105 whitespace-nowrap"
              >
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Add New Drive</span>
                <span className="sm:hidden">Add</span>
              </button>
              
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search drives..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50/50 hover:bg-white transition-all"
                />
              </div>
              
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400 h-5 w-5" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50/50 hover:bg-white transition-all appearance-none"
                >
                  <option value="All">All Status</option>
                  <option value="Draft">Draft</option>
                  <option value="Active">Active</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
              
              <button 
                onClick={handleExport}
                className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold hover:transform hover:scale-105 whitespace-nowrap"
              >
                <Download className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Export</span>
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
                  <th className="pb-4">Apps</th>
                  <th className="pb-4">Deadline</th>
                  <th className="pb-4">Package</th>
                  <th className="pb-4">Eligibility</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDrives.map((drive) => (
                  <tr key={drive.id} className="border-t border-gray-100/50 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-all duration-300">
                    <td className="py-4 font-bold text-gray-800">{drive.company}</td>
                    <td className="py-4 text-gray-600 font-medium">{drive.position}</td>
                    <td className="py-4 text-gray-600 font-medium">{drive.applications}</td>
                    <td className="py-4 text-gray-600 font-medium">{drive.deadline}</td>
                    <td className="py-4 text-gray-600 font-medium">{drive.package}</td>
                    <td className="py-4 text-gray-600 font-medium">
                      <button 
                        onClick={() => {
                          setCurrentDrive(drive);
                          setIsModalOpen(true);
                        }}
                        className="text-indigo-600 hover:underline text-sm"
                      >
                        View Criteria
                      </button>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center space-x-1">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
                          drive.status === 'Active' 
                            ? 'bg-green-500 text-white' 
                            : drive.status === 'Draft'
                              ? 'bg-yellow-500 text-white'
                              : 'bg-gray-500 text-white'
                        }`}>
                          {drive.status}
                        </span>
                        <div className="relative">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setStatusChangeId(statusChangeId === drive.id ? null : drive.id);
                            }}
                            className="p-1 text-gray-500 hover:text-indigo-600"
                            aria-label="Change status"
                          >
                            <ChevronDown className="h-4 w-4" />
                          </button>
                          
                          {statusChangeId === drive.id && (
                            <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                              {(['Draft', 'Active', 'Archived'] as Drive['status'][]).map(status => (
                                drive.status !== status && (
                                  <button
                                    key={status}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleStatusChange(drive.id, status);
                                    }}
                                    className="flex items-center w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                                  >
                                    <span className="mr-2">To {status}</span>
                                  </button>
                                )
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => openDriveModal(drive)}
                          className="p-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-all duration-300"
                          aria-label="Edit drive"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteDrive(drive.id)}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-300"
                          aria-label="Delete drive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredDrives.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No drives found matching your criteria
              </div>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl animate-scale-in">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  {currentDrive?.id ? 'Edit Drive' : 'Add New Drive'}
                </h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
                    <input
                      type="text"
                      name="company"
                      value={currentDrive?.company || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Position *</label>
                    <input
                      type="text"
                      name="position"
                      value={currentDrive?.position || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Applications</label>
                    <input
                      type="number"
                      name="applications"
                      value={currentDrive?.applications || 0}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      min="0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      name="status"
                      value={currentDrive?.status || 'Draft'}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="Draft">Draft</option>
                      <option value="Active">Active</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Deadline *</label>
                    <input
                      type="date"
                      name="deadline"
                      value={currentDrive?.deadline || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Package *</label>
                    <input
                      type="text"
                      name="package"
                      value={currentDrive?.package || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Eligibility Criteria</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Minimum CGPA</label>
                      <input
                        type="number"
                        name="eligibility.minCGPA"
                        value={currentDrive?.eligibility.minCGPA || 0}
                        onChange={handleInputChange}
                        min="0"
                        max="10"
                        step="0.1"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Max Backlogs</label>
                      <input
                        type="number"
                        name="eligibility.maxBacklogs"
                        value={currentDrive?.eligibility.maxBacklogs || 0}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Batch Year</label>
                      <input
                        type="number"
                        name="eligibility.batchYear"
                        value={currentDrive?.eligibility.batchYear || new Date().getFullYear()}
                        onChange={handleInputChange}
                        min="2000"
                        max={new Date().getFullYear() + 5}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">10th Percentage</label>
                      <input
                        type="number"
                        name="eligibility.tenthPercentage"
                        value={currentDrive?.eligibility.tenthPercentage || ''}
                        onChange={handleInputChange}
                        min="0"
                        max="100"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">12th Percentage</label>
                      <input
                        type="number"
                        name="eligibility.twelfthPercentage"
                        value={currentDrive?.eligibility.twelfthPercentage || ''}
                        onChange={handleInputChange}
                        min="0"
                        max="100"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Diploma Percentage</label>
                      <input
                        type="number"
                        name="eligibility.diplomaPercentage"
                        value={currentDrive?.eligibility.diplomaPercentage || ''}
                        onChange={handleInputChange}
                        min="0"
                        max="100"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">Eligible Branches</label>
                      <div className="space-x-2">
                        <button 
                          type="button"
                          onClick={() => toggleAllBranches(true)}
                          className="text-xs text-indigo-600 hover:underline"
                        >
                          Select All
                        </button>
                        <button 
                          type="button"
                          onClick={() => toggleAllBranches(false)}
                          className="text-xs text-indigo-600 hover:underline"
                        >
                          Clear All
                        </button>
                      </div>
                    </div>
                    <div className="border border-gray-300 rounded-lg p-4 max-h-40 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {allBranches.map(branch => (
                        <div key={branch} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`branch-${branch}`}
                            checked={selectedBranches.includes(branch)}
                            onChange={() => toggleBranchSelection(branch)}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                          <label htmlFor={`branch-${branch}`} className="ml-2 text-sm text-gray-700">
                            {branch}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Additional Requirements</label>
                    <textarea
                      name="eligibility.additionalRequirements"
                      value={currentDrive?.eligibility.additionalRequirements || ''}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Any other specific requirements..."
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    {currentDrive?.id ? 'Update' : 'Create'} Drive
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriveManagement;