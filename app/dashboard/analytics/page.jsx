'use client'

import React from 'react'
import DashboardLayout from "@/Components/Dashboard/DashboardLayout";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, Users, Briefcase, Clock } from 'lucide-react'

const jobApplicationsData = [
    { name: 'Jan', applications: 65 },
    { name: 'Feb', applications: 59 },
    { name: 'Mar', applications: 80 },
    { name: 'Apr', applications: 81 },
    { name: 'May', applications: 56 },
    { name: 'Jun', applications: 55 },
    { name: 'Jul', applications: 40 },
]

const hiringSourcesData = [
    { name: 'Job Boards', value: 400 },
    { name: 'Referrals', value: 300 },
    { name: 'Company Website', value: 200 },
    { name: 'Social Media', value: 100 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function AnalyticsPage() {
    return (
        <DashboardLayout>
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Analytics</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Total Applications</h2>
                        <TrendingUp className="text-green-500" size={24} />
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">1,234</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">+15% from last month</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Active Candidates</h2>
                        <Users className="text-blue-500" size={24} />
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">567</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">+5% from last month</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Open Positions</h2>
                        <Briefcase className="text-yellow-500" size={24} />
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">23</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">-2 from last month</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Time to Hire</h2>
                        <Clock className="text-purple-500" size={24} />
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">18 days</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">-2 days from last month</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Job Applications</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={jobApplicationsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="applications" fill="#3B82F6" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Hiring Sources</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={hiringSourcesData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {hiringSourcesData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </DashboardLayout>
    )
}