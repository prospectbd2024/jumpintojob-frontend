'use client'

import React, {useState} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import {
    Menu, X, BriefcaseIcon, UsersIcon, CalendarIcon, BarChart2Icon,
    PlusIcon, HelpCircleIcon, BellIcon, MessageCircleIcon,
    ChevronDownIcon, StarIcon, FilterIcon, Sun, Moon
} from 'lucide-react'
import {useDashboardContext} from "@/Contexts/DashboardContext";
import {useUserContext} from "@/Contexts/UserContext";

const menuItems = [
    {icon: BriefcaseIcon, label: 'Jobs', href: '/dashboard/jobs'},
    {icon: UsersIcon, label: 'Candidates', href: '/dashboard/candidates'},
    {icon: CalendarIcon, label: 'Interviews', href: '/dashboard/interviews'},
    {icon: BarChart2Icon, label: 'Analytics', href: '/dashboard/analytics'},
    {icon: BarChart2Icon, label: 'Tools', href: '/dashboard/tools'},
]

export default function DashboardLayout({children}) {
    const router = useRouter()
    const {isDarkMode, toggleDarkMode} = useDashboardContext();
    const {user} = useUserContext()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <div className={`flex h-screen ${isDarkMode ? 'dark' : ''}`}>
            {/* Sidebar */}
            <aside className={`${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
                <div className="flex items-center justify-between h-16 px-6 bg-gray-800">
                    <Link href="/dashboard" className="text-white text-2xl font-bold">JobPortal</Link>
                    <button onClick={() => setIsSidebarOpen(false)}
                            className="lg:hidden text-gray-300 hover:text-white">
                        <X size={24}/>
                    </button>
                </div>
                <div className="px-4 py-2">
                    <button
                        className="w-full flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-200">
                        <PlusIcon size={20}/>
                        <span>Create new</span>
                    </button>
                </div>
                <nav className="mt-4">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white ${
                                router.pathname === item.href ? 'bg-gray-800 text-white' : ''
                            }`}
                        >
                            <item.icon className="w-5 h-5 mr-3"/>
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header
                    className="flex items-center justify-between h-16 px-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <button onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100">
                        <Menu size={24}/>
                    </button>
                    <div className="flex items-center space-x-4">
                        <button
                            className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100">
                            <HelpCircleIcon size={24}/>
                        </button>
                        <button
                            className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100">
                            <BellIcon size={24}/>
                        </button>
                        <button
                            className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100">
                            <MessageCircleIcon size={24}/>
                        </button>
                        <button onClick={toggleDarkMode}
                                className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100">
                            {isDarkMode ? <Sun size={24}/> : <Moon size={24}/>}
                        </button>
                        <div className="flex items-center space-x-2">
                            <span
                                className="text-gray-700 dark:text-gray-300">{user?.email || 'user@example.com'}</span>
                            <ChevronDownIcon size={20} className="text-gray-500 dark:text-gray-400"/>
                        </div>
                    </div>
                </header>

                {/* Main content area */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
                    <div className="container mx-auto px-6 py-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
