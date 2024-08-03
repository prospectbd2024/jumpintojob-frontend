"use client"
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
        <div  className='w-full max-w-6xl mx-auto p-5'>
             <ResumeContext>
            {loading ? (
                <ResumeMainSkeleton/>
            ) : (
                <>
                <ResumeHeader />
            <ResumeContainer />
            <ResumeFooter />
                </>
               
            )}
                </ResumeContext>
        </div>
    );
};

export default ResumeBuilder;