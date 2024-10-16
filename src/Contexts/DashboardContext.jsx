'use client';
import React, {useContext, createContext, useState, useEffect} from 'react';
import {useUserContext} from "@/Contexts/UserContext";

// Create the context
export const dashboardContext = createContext();
export const useDashboardContext = () => useContext(dashboardContext);

// Rename the provider function for clarity
function DashboardContext({children}) {
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [jobsPerPage] = useState(10); // Adjust as needed
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const { bearerToken } = useUserContext();

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    // Fetch employer's jobs from API
    useEffect(() => {
        async function fetchJobs() {
            try {
                const response = await fetch(`${API_URL}/api/v1/employer/jobs`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${bearerToken}`,
                    },
                });

                // Check if the response is ok (status code 200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setJobs(data.data); // Assuming the response contains a `data` array
            } catch (error) {
                console.error('Error fetching jobs:', error);
            } finally {
                setLoading(false); // Stop the loader when the API call is done
            }
        }

        fetchJobs();
    }, [API_URL, bearerToken]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        localStorage.setItem('darkMode', !isDarkMode);
        console.log('Dark mode toggled');
    };

    // Calculate pagination
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
    const totalPages = Math.ceil(jobs.length / jobsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <dashboardContext.Provider
            value={{isDarkMode, toggleDarkMode, jobs: currentJobs, loading, paginate, currentPage, totalPages}}>
            {children}
        </dashboardContext.Provider>
    );
}

export default DashboardContext;
