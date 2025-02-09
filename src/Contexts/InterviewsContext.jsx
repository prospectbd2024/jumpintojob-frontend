'use client'
import React, { createContext, useState, useContext } from 'react';

const InterviewsContext = createContext();

export const InterviewsProvider = ({ children }) => {
    const [interviews, setInterviews] = useState([]);

    const scheduleInterview = (interviewData) => {
        setInterviews((prevInterviews) => [...prevInterviews, { ...interviewData, id: Date.now() }]);
    };

    const deleteInterview = (id) => {
        setInterviews((prevInterviews) => prevInterviews.filter((interview) => interview.id !== id));
    };

    return (
        <InterviewsContext.Provider value={{ interviews, scheduleInterview, deleteInterview }}>
            {children}
        </InterviewsContext.Provider>
    );
};

export const useInterviewsContext = () => {
    return useContext(InterviewsContext);
};