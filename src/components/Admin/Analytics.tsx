import React from 'react';
import { PieChart, BarChart, Users, Briefcase, TrendingUp, Download } from 'lucide-react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface Stat {
  label: string;
  value: string;
  icon: React.ComponentType<any>;
}

interface PlacementStat {
  department: string;
  students: number;
  placed: number;
  placementRate: number;
  avgPackage: string;
}

interface Drive {
  id: number;
  company: string;
  position: string;
  applications: number;
  deadline: string;
  status: string;
  package: string;
}

interface AnalyticsDashboardProps {
  stats: Stat[];
  placementStats: PlacementStat[];
  recentDrives: Drive[];
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ 
  stats, 
  placementStats, 
  recentDrives 
}) => {
  // Calculate top companies based on applications
  const topCompanies = recentDrives
    .sort((a, b) => b.applications - a.applications)
    .slice(0, 5);

  // Data for bar chart (placements by month)
  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Placements',
        data: [12, 19, 15, 28, 24, 32, 27],
        backgroundColor: '#4f46e5', // indigo-600
        borderRadius: 6,
      },
      {
        label: 'Applications',
        data: [45, 52, 48, 65, 59, 72, 68],
        backgroundColor: '#a5b4fc', // indigo-300
        borderRadius: 6,
      }
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#e5e7eb', // gray-200
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  // Data for pie chart (placements by department)
  const pieChartData = {
    labels: placementStats.map(stat => stat.department),
    datasets: [
      {
        data: placementStats.map(stat => stat.placed),
        backgroundColor: [
          '#6366f1', // indigo-500
          '#8b5cf6', // violet-500
          '#ec4899', // pink-500
          '#f43f5e', // rose-500
          '#14b8a6', // teal-500
        ],
        borderWidth: 1,
        borderColor: '#fff',
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-8">
        <TrendingUp className="mr-2" /> Analytics Dashboard
      </h2>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className={`p-4 rounded-lg ${
              index === 0 ? 'bg-blue-50' :
              index === 1 ? 'bg-green-50' :
              index === 2 ? 'bg-purple-50' :
              'bg-indigo-50'
            }`}
          >
            <div className="text-3xl font-bold">
              {stat.value}
            </div>
            <div className="text-gray-600 flex items-center">
              <stat.icon className="mr-2" /> {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <BarChart className="mr-2" /> Placements by Month
          </h3>
          <div className="h-64 bg-white border border-gray-200 rounded-lg p-2">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <PieChart className="mr-2" /> Placements by Department
          </h3>
          <div className="h-64 bg-white border border-gray-200 rounded-lg p-2">
            <Pie data={pieChartData} options={pieChartOptions} />
          </div>
        </div>
      </div>

      {/* Top Companies Table */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Top Hiring Companies</h3>
          <button className="flex items-center text-indigo-600 hover:text-indigo-800">
            <Download className="mr-2" /> Export Data
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-200">
                <th className="pb-3">Company</th>
                <th className="pb-3">Applications</th>
                <th className="pb-3">Package</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {topCompanies.map((company, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 font-medium">{company.company}</td>
                  <td className="py-4">{company.applications}</td>
                  <td className="py-4">{company.package}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      company.status === 'Active' ? 'bg-green-100 text-green-800' :
                      company.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {company.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Department-wise Stats */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Department-wise Placement Statistics</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-200">
                <th className="pb-3">Department</th>
                <th className="pb-3">Students</th>
                <th className="pb-3">Placed</th>
                <th className="pb-3">Placement Rate</th>
                <th className="pb-3">Avg. Package</th>
              </tr>
            </thead>
            <tbody>
              {placementStats.map((stat, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 font-medium">{stat.department}</td>
                  <td className="py-4">{stat.students}</td>
                  <td className="py-4">{stat.placed}</td>
                  <td className={`py-4 ${
                    stat.placementRate > 80 ? 'text-green-600' :
                    stat.placementRate > 70 ? 'text-blue-600' :
                    'text-yellow-600'
                  }`}>
                    {stat.placementRate}%
                  </td>
                  <td className="py-4">{stat.avgPackage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;