import React, { useEffect, useState } from 'react';
import Navbar from '../Layout/Navbar';
import api from '../../services/api';
import {
  UserIcon,
  ChartBarIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';


interface User {
  _id: string;
  username: string;
  email: string;
  role: 'user' | 'moderator' | 'admin';
  permissions: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const AdminDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [users, setUsers] = useState<User[]>([]);
  useEffect(()=>{
    const fetchData = async()=>{
    const response = await api.get('protected/admin-dashboard')
    setUsers(response.data.users);
    }
    fetchData();
  },[users])
  const makeadmin = async(id:string)=>{
    try {
      console.log("The user id is",id);
      const response = await api.patch(`protected/change-role/${id}`, {
        newRole: 'admin'
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error changing user role:', error);
      throw error;
    }
  }
  const makemoderator =async (id:string) =>{
    try {
      console.log("The user id is",id);
      const response = await api.patch(`protected/change-role/${id}`, {
        newRole: 'moderator'
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error changing user role:', error);
      throw error;
    }
  }
  const renderUserManagement = () => (
    <div className="bg-white shadow rounded-lg">
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {user.username}
                        </div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 
                        user.role === 'moderator' ? 'bg-blue-100 text-blue-800' : 
                        'bg-green-100 text-green-800'}`}>
                      {user.role}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={()=>{
                      console.log("The user id is"+ user._id)
                      makemoderator(user._id)}} className="hover:white mr-3 border border-indigo-600 rounded-md px-2 py-1 bg-indigo-600 text-white">
                      Make Moderator
                    </button>
                    <button onClick={()=>{
                      console.log("The user id is"+ user._id)
                      makeadmin(user._id)}} className=" hover:white border-red-600 rounded-md px-2 py-1 bg-red-600 text-white">
                      Make Admin
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {/* Stats Cards */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-blue-100 text-blue-500">
            <UserIcon className="h-6 w-6" />
          </div>
          <div className="ml-4">
            <p className="text-gray-500">Total Users</p>
            <p className="text-2xl font-semibold">{users.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-green-100 text-green-500">
            <UsersIcon className="h-6 w-6" />
          </div>
          <div className="ml-4">
            <p className="text-gray-500">Moderators</p>
            <p className="text-2xl font-semibold">
              {users.filter(user => user.role === 'moderator').length}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-purple-100 text-purple-500">
            <ChartBarIcon className="h-6 w-6" />
          </div>
          <div className="ml-4">
            <p className="text-gray-500">Admins</p>
            <p className="text-2xl font-semibold">
              {users.filter(user => user.role === 'admin').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar/>
      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <div className="w-64 bg-white h-screen shadow-lg flex flex-col flex-shrink-0">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800">Admin Panel</h2>
          </div>
          <nav className="mt-6  flex-grow">
            <div
              className={`p-4 cursor-pointer ${
                selectedTab === 'dashboard'
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
              onClick={() => setSelectedTab('dashboard')}
            >
              Dashboard
            </div>
            <div
              className={`p-4 cursor-pointer ${
                selectedTab === 'users'
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
              onClick={() => setSelectedTab('users')}
            >
              User Management
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-auto">
          {selectedTab === 'dashboard' && renderDashboard()}
          {selectedTab === 'users' && renderUserManagement()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;