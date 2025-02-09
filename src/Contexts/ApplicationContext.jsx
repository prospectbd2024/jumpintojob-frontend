"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useUserContext } from "./UserContext";
import Swal from "sweetalert2";
import { useUserProfileContext } from "./UserProfileContext";

const applicationContext = createContext();

export const useApplicationContext = () => useContext(applicationContext);

function ApplicationContext({ children }) {
    const [message, setMessage] = useState({ message: "", type: "" });
    const [forwardingLetter, setForwardingLetter] = useState({ type: "none", value: null });
    const [appliedJobs, setAppliedJobs] = useState([]);
    const { userData, guestProtection } = useUserContext();
    const { availability } = useUserProfileContext();
    const [resume, setResume] = useState(null);
    const [CV, setCV] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getResume = async () => {
        setIsLoading(true);
        try {
            if (!userData?.data?.access_token) {
                console.warn("User not logged in or access token missing.");
                setMessage({ type: "error", message: "You must be logged in to get resume." });
                return;
            }

            const bearerToken = userData.data.access_token;
            const userId = userData.data.user.user_id;
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/cv/${userId}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${bearerToken}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Failed to fetch CV:", response.status, errorData);
                setMessage({ type: "error", message: `Failed to fetch resume: ${errorData.message || response.statusText}` });
                return;
            }

            const data = await response.json();
            setResume(data.data);
            console.log("Fetched resume:", data.data);
            setMessage({ type: "success", message: "Resume loaded successfully." });
        } catch (error) {
            console.error("There was a problem fetching the CV:", error);
            setMessage({ type: "error", message: "Error fetching resume: " + error.message });
        } finally {
            setIsLoading(false);
        }
    };

    const apply = async (job, cv, resume) => {
        console.log("apply() called with job:", job, "cv:", cv, "resume:", resume);

        try {
            if (!userData?.data?.access_token) {
                console.warn("User not logged in or access token missing.");
                setMessage({ type: "error", message: "You must be logged in to apply." });
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "You must be logged in to apply.",
                    showConfirmButton: false,
                    timer: 1500,
                });
                return;
            }

            console.log("User data:", userData);
            console.log("Forwarding letter:", forwardingLetter);
            console.log("Availability:", availability);

            const formData = new FormData();
            formData.append("job_id", job.id);
            if (cv) {
                console.log("Appending CV file:", cv);
                formData.append("cv_file", cv);
            } else {
                console.log("No CV file to append.");
            }
            if (resume) {
                console.log("Appending resume file:", resume);
                formData.append("resume_file", resume);
            } else {
                console.log("No resume file to append.");
            }

            formData.append("forwarding_letter_type", forwardingLetter.type);
            if (forwardingLetter.type !== "none" && forwardingLetter.value) {
                console.log("Appending forwarding letter:", forwardingLetter.value);
                formData.append("forwarding_letter", forwardingLetter.value);
            } else {
                console.log("No forwarding letter to append.");
            }

            formData.append("applicant_status", availability);
            console.log("Job ID:", job.id, "Availability:", availability);

            const bearerToken = userData.data.access_token;
            console.log("Bearer token:", bearerToken);
            console.log("Sending request to:", `${process.env.NEXT_PUBLIC_API_URL}/api/v1/applications/apply-for-job`);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/v1/applications/apply-for-job`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${bearerToken}`,
                    },
                    body: formData,
                }
            );

            console.log("Raw response:", response);

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Apply failed with status:", response.status);
                console.error("Error response text:", errorText);
                throw new Error(`Apply failed with status: ${response.status}, error: ${errorText}`);
            }

            const data = await response.json();
            console.log("Apply successful:", data);

            setMessage({ type: "success", message: "Applied successfully!" });
            getAppliedJobs();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Applied successfully!",
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.error("There has been a problem with your fetch operation:", error);
            setMessage({ type: "error", message: "Failed to apply: " + error.message });
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Failed to apply: " + error.message,
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    const getAppliedJobs = async () => {
        try {
            if (!userData?.data?.access_token) {
                console.warn("User not logged in or access token missing.");
                return;
            }

            const bearerToken = userData.data.access_token;
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/applications`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${bearerToken}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("get applied jobs failed:", errorData);
                throw new Error(`get applied jobs failed with status: ${response.status}`);
            }

            const data = await response.json();
            setAppliedJobs(data.data);
            console.log("get applied jobs successful:", data.data);
        } catch (error) {
            console.error("There has been a problem with your fetch operation:", error);
        }
    };

    const handleApplyJob = (job) => {
        guestProtection(() => {
            window.open(`/applyjob/${job.id}`, "_blank");
        });
    };

    useEffect(() => {
        if (userData) {
            getAppliedJobs();
            getResume();
        }
    }, [userData]);

    const isApplied = (job_id) => {
        return appliedJobs.some(el => el.job_id == job_id);
    };

    const handleFileChange = (e) => {
        if (e.target.id === "resume") {
            setResume(e.target.files[0]);
            setCV(null); 
        } else if (e.target.id === "cv") {
            setCV(e.target.files[0]);
            setResume(null);
        }
    };

    return (
        <applicationContext.Provider
            value={{
                apply,
                message,
                setMessage,
                forwardingLetter,
                setForwardingLetter,
                appliedJobs,
                isApplied,
                resume,
                setResume,
                handleApplyJob,
                CV,
                setCV,
                getResume,
                isLoading,
            }}
        >
            {children}
        </applicationContext.Provider>
    );
}

export default ApplicationContext;