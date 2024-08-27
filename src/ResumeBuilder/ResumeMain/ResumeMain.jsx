"use client";
import React, { useState, useEffect } from 'react';
import ResumeHeader from '../Layout/ResumeHeader/ResumeHeader';
import ResumeFooter from '../Layout/ResumeFooter/ResumeFooter';
import ResumeContainer from '../ResumeComponents/ResumeContainer/ResumeContainer';
import ResumeContext from '@/Contexts/ResumeContext'; 
import ResumeMainSkeleton from '@/Skeletons/ResumeMainSkeleton';

const ResumeBuilder = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className='flex flex-col min-h-screen'>
            <ResumeHeader />
            <main className='flex-grow w-full max-w-6xl mx-auto p-5'>
                <ResumeContext>
                    {loading ? (
                        <ResumeMainSkeleton />
                    ) : (
                        <ResumeContainer />
                    )}
                </ResumeContext>
            </main>
            <ResumeFooter />
        </div>
    );
};

export default ResumeBuilder;
