import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../Layout/Navbar';
import {
  ShieldCheckIcon,
  ClockIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface Report {
  id: string;
  reportedUser: string;
  reason: string;
  status: 'pending' | 'resolved' | 'dismissed';
  date: string;
}

interface ContentItem {
  id: string;
  type: 'post' | 'comment';
  content: string;
  author: string;
  flags: number;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

const ModeratorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('queue');
  const [reports, setReports] = useState<Report[]>([]);
  const [contentQueue, setContentQueue] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock performance data
  const performanceData = [
    { name: 'Mon', reviews: 12, reports: 8 },
    { name: 'Tue', reviews: 19, reports: 15 },
    { name: 'Wed', reviews: 15, reports: 10 },
    { name: 'Thu', reviews: 22, reports: 18 },
    { name: 'Fri', reviews: 17, reports: 12 },
  ];

  useEffect(() => {
    // Simulate API calls
    const fetchData = async () => {
      try {
        // Replace with actual API calls
        const mockReports: Report[] = [
          {
            id: '1',
            reportedUser: 'user123',
            reason: 'Inappropriate content',
            status: 'pending',
            date: '2024-02-20',
          },
          // Add more mock reports
        ];

        const mockContent: ContentItem[] = [
          {
            id: '1',
            type: 'post',
            content: 'This is a flagged post content...',
            author: 'user456',
            flags: 3,
            status: 'pending',
            date: '2024-02-20',
          },
          // Add more mock content
        ];

        setReports(mockReports);
        setContentQueue(mockContent);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderContentQueue = () => (
    
    <div className="bg-white rounded-lg shadow-lg p-6">
      
      <h2 className="text-xl font-semibold mb-6">Content Moderation Queue</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Content
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Flags
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contentQueue.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-normal">
                  <div className="text-sm text-gray-900">{item.content}</div>
                  <div className="text-xs text-gray-500">{item.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{item.author}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    {item.flags}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-green-600 hover:text-green-900 mr-3">
                    Approve
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6">User Reports</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reported User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reason
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reports.map((report) => (
              <tr key={report.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{report.reportedUser}</div>
                </td>
                <td className="px-6 py-4 whitespace-normal">
                  <div className="text-sm text-gray-900">{report.reason}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      report.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : report.status === 'resolved'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {report.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                    Review
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    Dismiss
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPerformance = () => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Performance Metrics</h2>
      <div className="h-80">
        <LineChart width={800} height={300} data={performanceData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="reviews" stroke="#8884d8" />
          <Line type="monotone" dataKey="reports" stroke="#82ca9d" />
        </LineChart>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar/>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white h-screen shadow-lg fixed">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800">Moderator Panel</h2>
            <p className="text-sm text-gray-600 mt-1">Welcome back, {user?.name}</p>
          </div>
          <nav className="mt-6">
            <button
              onClick={() => setActiveTab('queue')}
              className={`flex items-center w-full px-6 py-3 text-left ${
                activeTab === 'queue'
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <ShieldCheckIcon className="h-5 w-5 mr-3" />
              Content Queue
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`flex items-center w-full px-6 py-3 text-left ${
                activeTab === 'reports'
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <ExclamationTriangleIcon className="h-5 w-5 mr-3" />
              User Reports
            </button>
            <button
              onClick={() => setActiveTab('performance')}
              className={`flex items-center w-full px-6 py-3 text-left ${
                activeTab === 'performance'
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <ChartBarIcon className="h-5 w-5 mr-3" />
              Performance
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="ml-64 flex-1 p-8">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                      <DocumentTextIcon className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <p className="text-gray-500">Pending Reviews</p>
                      <p className="text-2xl font-semibold">{contentQueue.length}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-red-100 text-red-600">
                      <ExclamationTriangleIcon className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <p className="text-gray-500">Active Reports</p>
                      <p className="text-2xl font-semibold">{reports.length}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-green-100 text-green-600">
                      <ClockIcon className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <p className="text-gray-500">Response Time</p>
                      <p className="text-2xl font-semibold">2.5h</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content Based on Active Tab */}
              {activeTab === 'queue' && renderContentQueue()}
              {activeTab === 'reports' && renderReports()}
              {activeTab === 'performance' && renderPerformance()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModeratorDashboard;