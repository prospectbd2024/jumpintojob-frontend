'use client'
import React, { createContext, useState, useContext } from 'react';

const CandidatesContext = createContext();

export const CandidatesProvider = ({ children }) => {
    const [candidates, setCandidates] = useState([]);

    const addCandidate = (candidateData) => {
        setCandidates((prevCandidates) => [...prevCandidates, { ...candidateData, id: Date.now() }]);
    };

    const deleteCandidate = (id) => {
        setCandidates((prevCandidates) => prevCandidates.filter((candidate) => candidate.id !== id));
    };

    return (
        <CandidatesContext.Provider value={{ candidates, addCandidate, deleteCandidate }}>
            {children}
        </CandidatesContext.Provider>
    );
};

export const useCandidatesContext = () => {
    return useContext(CandidatesContext);
};