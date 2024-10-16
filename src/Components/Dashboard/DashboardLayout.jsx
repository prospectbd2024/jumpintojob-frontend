'use client'

import React, {useState, useRef, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {useRouter} from 'next/navigation'
import {
    Menu, X, BriefcaseIcon, UsersIcon, CalendarIcon, BarChart2Icon,
    PlusIcon, HelpCircleIcon, BellIcon, MessageCircleIcon,
    ChevronDownIcon, StarIcon, FilterIcon, Sun, Moon, LogOut, Settings, User
} from 'lucide-react'
import {useDashboardContext} from "@/Contexts/DashboardContext";
import {useUserContext} from "@/Contexts/UserContext";


const menuItems = [
    {icon: BriefcaseIcon, label: 'Jobs', href: '/dashboard/jobs'},
    {icon: UsersIcon, label: 'Candidates', href: '/dashboard/candidates'},
    {icon: CalendarIcon, label: 'Interviews', href: '/dashboard/interviews'},
    {icon: BarChart2Icon, label: 'Analytics', href: '/dashboard/analytics'},
    {icon: PlusIcon, label: 'Tools', href: '/dashboard/tools'},
]

export default function DashboardLayout({children}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const userMenuRef = useRef(null)
    const router = useRouter()
    const {isDarkMode, toggleDarkMode} = useDashboardContext()
    const {userData, user, profile, handleSignOut} = useUserContext()


    useEffect(() => {
        function handleClickOutside(event) {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [userMenuRef])

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
                        <span>Post New Job</span>
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
                <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center">
                                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                        className="lg:hidden text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 focus:outline-none">
                                    <Menu size={24}/>
                                </button>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button
                                    className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 focus:outline-none">
                                    <HelpCircleIcon size={24}/>
                                </button>
                                <button
                                    className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 focus:outline-none">
                                    <BellIcon size={24}/>
                                </button>
                                <button
                                    className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 focus:outline-none">
                                    <MessageCircleIcon size={24}/>
                                </button>
                                <button onClick={toggleDarkMode}
                                        className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 focus:outline-none">
                                    {isDarkMode ? <Sun size={24}/> : <Moon size={24}/>}
                                </button>
                                <div className="relative" ref={userMenuRef}>
                                    <button
                                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                        className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none"
                                    >
                                        <Image
                                            src="https://i.pravatar.cc/300"
                                            alt="User avatar"
                                            width={32}
                                            height={32}
                                            className="rounded-full"
                                        />
                                        <span>{user?.email || 'user@example.com'}</span>
                                        <ChevronDownIcon size={20} className="text-gray-500 dark:text-gray-400"/>
                                    </button>
                                    {isUserMenuOpen && (
                                        <div
                                            className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md overflow-hidden shadow-xl z-10">
                                            <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name || 'John Doe'}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email || 'user@example.com'}</p>
                                            </div>
                                            <Link href="/dashboard/profile"
                                                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                                <User size={18} className="inline-block mr-2"/>
                                                Profile
                                            </Link>
                                            <Link href="/dashboard/settings"
                                                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                                <Settings size={18} className="inline-block mr-2"/>
                                                Settings
                                            </Link>
                                            <button
                                                onClick={handleSignOut}
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                                                <LogOut size={18} className="inline-block mr-2"/>
                                                Sign out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main content area */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}