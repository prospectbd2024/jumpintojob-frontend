"use client"
import React from 'react';
import ResumeHeader from '../Layout/ResumeHeader/ResumeHeader';
import ResumeFooter from '../Layout/ResumeFooter/ResumeFooter';
import ResumeContainer from '../ResumeComponents/ResumeContainer/ResumeContainer';
import ResumeContext from '@/Contexts/ResumeContext';


const ResumeMain = () => {
    return (
        <ResumeContext>
            <ResumeHeader />
            <ResumeContainer />
            <ResumeFooter />
        </ResumeContext>
    );
};

export default ResumeMain;