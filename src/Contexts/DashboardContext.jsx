'use client';
import React, {useContext, createContext, useState, useEffect} from 'react';
import {useUserContext} from "@/Contexts/UserContext";

// Create the context
export const dashboardContext = createContext();
export const useDashboardContext = () => useContext(dashboardContext);


// Rename the provider function for clarity
function DashboardContext({children}) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [jobsPerPage] = useState(10);

    const [appliedJobs, setAppliedJobs] = useState([]);
    const [appliedJobCurrentPage, setAppliedJobCurrentPage] = useState(1);
    const appliedJobPerPage = 10; // You can adjust this number as needed

    // Calculate pagination for applied jobs
    const appliedJobIndexOfLastJob = appliedJobCurrentPage * appliedJobPerPage;
    const appliedJobIndexOfFirstJob = appliedJobIndexOfLastJob - appliedJobPerPage;
    const appliedJobCurrentJobs = appliedJobs.slice(appliedJobIndexOfFirstJob, appliedJobIndexOfLastJob);
    const appliedJobTotalPages = Math.ceil(appliedJobs.length / appliedJobPerPage);

    const appliedJobPaginate = (pageNumber) => setAppliedJobCurrentPage(pageNumber);

    const [loadingApplyJob, setLoadingApplyJob] = useState(true); // State for loading
    const [applicantsData, setApplicantsData] = useState(null); // State for applicants data
    const [loadingApplicants, setLoadingApplicants] = useState(true); // State for loading applicants
    const [error, setError] = useState(null);

    const {bearerToken, userData} = useUserContext();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        // Check if localStorage is available
        if (typeof window !== 'undefined') {
            const storedDarkMode = localStorage.getItem('darkMode');
            setIsDarkMode(storedDarkMode === 'true');
        }
    }, []);

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
            if (userData?.data.user?.user_type !== 'employer') {
                setLoading(false);
                return; // Exit early if the user is not an employer
            }
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

// Fetch applied jobs for the job seeker
    useEffect(() => {
        async function fetchAppliedJobs() {
            setLoadingApplyJob(true);
            setError(null);
            if (userData?.data.user?.user_type !== 'job_seeker') {
                return; // Exit early if the user is not a job seeker
            }
            try {
                const response = await fetch(`${API_URL}/api/v1/applications`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${bearerToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setAppliedJobs(data.data); // Set the applied jobs data using your naming convention
                setLoadingApplyJob(false);
            } catch (err) {
                setError(err.message); // Set error if fetch fails
            }
        }

        fetchAppliedJobs();
    }, [API_URL, bearerToken, userData]);

    useEffect(() => {
        const fetchApplications = async () => {
            setLoadingApplicants(true);
            try {
                // Fetch job applications data directly with auth header
                const res = await fetch(`${API_URL}/api/v1/employer/jobs-with-applicants`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${bearerToken}`, // Pass the Bearer token here
                        'Content-Type': 'application/json',
                    },
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch applications');
                }

                const data = await res.json();
                setApplicantsData(data.data); // Set applicants data
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingApplicants(false);
            }
        };

        fetchApplications();
    }, [bearerToken]);

    const clearJobs = () => setJobs([]);

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
            value={{
                isDarkMode,
                toggleDarkMode,
                jobs: currentJobs,
                loading,
                paginate,
                clearJobs,
                currentPage,
                totalPages,
                appliedJobs: appliedJobCurrentJobs,
                loadingApplyJob,
                applicantsData,
                loadingApplicants,
                error,
                appliedJobCurrentPage,
                appliedJobTotalPages,
                appliedJobPaginate,
            }}>
            {children}
        </dashboardContext.Provider>
    );
}

export default DashboardContext;
