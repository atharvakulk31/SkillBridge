import React from 'react';
import { Search, Filter, Download } from 'lucide-react';

interface Student {
  name: string;
  department: string;
  gpa: string;
  year: string;
  applications: number;
}

interface StudentManagementProps {
  students: Student[];
}

const StudentManagement: React.FC<StudentManagementProps> = ({ students }) => {
  return (
    <div className="space-y-8 animate-slide-up">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50">
        <div className="p-6 border-b border-gray-100/50">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Student Management
            </h2>
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
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-100/50 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-all duration-300"
                  >
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

export default StudentManagement;
