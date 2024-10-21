'use client'

import React from 'react'
import DashboardLayout from "@/Components/Dashboard/DashboardLayout";
import {FileText, Mail, Video, Calendar, Database, Settings} from 'lucide-react'

const tools = [
    {
        name: 'Resume Parser',
        description: 'Automatically extract information from resumes',
        icon: FileText,
        color: 'bg-blue-500'
    },
    {
        name: 'Email Templates',
        description: 'Manage and send personalized email templates',
        icon: Mail,
        color: 'bg-green-500'
    },
    {name: 'Video Interviews', description: 'Conduct and manage video interviews', icon: Video, color: 'bg-purple-500'},
    {
        name: 'Interview Scheduler',
        description: 'Schedule and manage interviews efficiently',
        icon: Calendar,
        color: 'bg-yellow-500'
    },
    {
        name: 'Applicant Tracking',
        description: 'Track and manage applicants throughout the hiring process',
        icon: Database,
        color: 'bg-red-500'
    },
    {
        name: 'Integration Settings',
        description: 'Manage integrations with other HR tools',
        icon: Settings,
        color: 'bg-indigo-500'
    },
]

export default function ToolsPage() {
    return (
        <DashboardLayout>
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Recruitment Tools</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                        <div className={`h-2 ${tool.color}`}></div>
                        <div className="p-6">
                            <div className="flex items-center mb-4">
                                <div className={`p-2 rounded-full ${tool.color} text-white mr-4`}>
                                    <tool.icon size={24}/>
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{tool.name}</h2>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">{tool.description}</p>
                            <button
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out">
                                Launch Tool
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </DashboardLayout>
    )
}