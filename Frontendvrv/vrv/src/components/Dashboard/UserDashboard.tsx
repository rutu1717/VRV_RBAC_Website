import React, { useState, useEffect } from 'react';
import Navbar from '../Layout/Navbar';
import {
  UserCircleIcon,
  BellIcon,
  CogIcon,
  DocumentTextIcon,
  ChartBarIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinDate: string;
  bio?: string;
}

interface Activity {
  id: string;
  type: string;
  description: string;
  date: string;
}

interface Notification {
  id: string;
  message: string;
  date: string;
  read: boolean;
}

const UserDashboard: React.FC = () => {
  // const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Mock activity data for the chart
  const activityData = [
    { name: 'Mon', posts: 4, comments: 8 },
    { name: 'Tue', posts: 3, comments: 12 },
    { name: 'Wed', posts: 5, comments: 15 },
    { name: 'Thu', posts: 2, comments: 10 },
    { name: 'Fri', posts: 6, comments: 18 },
  ];

  useEffect(() => {
    // Simulate API calls
    const fetchUserData = async () => {
      try {
        // Replace with actual API calls
        const mockProfile: UserProfile = {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          joinDate: '2024-01-01',
          bio: 'Software developer and tech enthusiast',
        };

        const mockActivities: Activity[] = [
          {
            id: '1',
            type: 'post',
            description: 'Created a new post: "Getting Started with React"',
            date: '2024-02-20',
          },
          // Add more mock activities
        ];

        const mockNotifications: Notification[] = [
          {
            id: '1',
            message: 'Someone commented on your post',
            date: '2024-02-20',
            read: false,
          },
          // Add more mock notifications
        ];

        setProfile(mockProfile);
        setActivities(activities);
        setNotifications(notifications);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <DocumentTextIcon className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500">Total Posts</p>
              <p className="text-2xl font-semibold">24</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <StarIcon className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500">Reputation</p>
              <p className="text-2xl font-semibold">486</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <ChartBarIcon className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500">Comments</p>
              <p className="text-2xl font-semibold">152</p>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Chart */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Activity Overview</h3>
        <div className="h-80">
          <LineChart width={800} height={300} data={activityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="posts" stroke="#8884d8" />
            <Line type="monotone" dataKey="comments" stroke="#82ca9d" />
          </LineChart>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="p-2 rounded-full bg-gray-100">
                  <DocumentTextIcon className="h-5 w-5 text-gray-500" />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-900">{activity.description}</p>
                <p className="text-xs text-gray-500">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Profile Information</h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-indigo-600 hover:text-indigo-800"
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      <div className="space-y-6">
        <div className="flex items-center">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
            {profile?.avatar ? (
              <img
                src={profile.avatar}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <UserCircleIcon className="w-20 h-20 text-gray-400" />
            )}
          </div>
          {isEditing && (
            <button className="ml-4 text-sm text-indigo-600 hover:text-indigo-800">
              Change Photo
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              disabled={!isEditing}
              value={profile?.name}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              disabled={!isEditing}
              value={profile?.email}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              disabled={!isEditing}
              value={profile?.bio}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-6">Notifications</h3>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-start space-x-4 p-4 rounded-lg ${
              notification.read ? 'bg-gray-50' : 'bg-blue-50'
            }`}
          >
            <div className="flex-shrink-0">
              <BellIcon className="h-6 w-6 text-blue-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">{notification.message}</p>
              <p className="text-xs text-gray-500">{notification.date}</p>
            </div>
            {!notification.read && (
              <button className="text-sm text-blue-600 hover:text-blue-800">
                Mark as read
              </button>
            )}
          </div>
        ))}
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
            <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
            <p className="text-sm text-gray-600 mt-1">Welcome, {profile?.name}</p>
          </div>
          <nav className="mt-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center w-full px-6 py-3 text-left ${
                activeTab === 'overview'
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <ChartBarIcon className="h-5 w-5 mr-3" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center w-full px-6 py-3 text-left ${
                activeTab === 'profile'
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <UserCircleIcon className="h-5 w-5 mr-3" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex items-center w-full px-6 py-3 text-left ${
                activeTab === 'notifications'
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <BellIcon className="h-5 w-5 mr-3" />
              Notifications
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
            <>
              {activeTab === 'overview' && renderOverview()}
              {activeTab === 'profile' && renderProfile()}
              {activeTab === 'notifications' && renderNotifications()}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;