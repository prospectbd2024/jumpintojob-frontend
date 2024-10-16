'use client';
import React, { useContext, createContext, useState, useEffect } from 'react';

// Create the context
export const dashboardContext = createContext();
export const useDashboardContext = () => useContext(dashboardContext);

// Rename the provider function for clarity
function DashboardContext({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        console.log('Dark mode toggled');
    };

    return (
        <dashboardContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </dashboardContext.Provider>
    );
}

export default DashboardContext;
