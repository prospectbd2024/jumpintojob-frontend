import React from 'react';
import ResumeOthers from './ResumeOthers';
import { useResumeContext } from '@/Contexts/ResumeContext';
import Language from '@/Components/UserProfile/Qualifications/Language/Language';
import Hobbies from '@/Components/UserProfile/Qualifications/Hobbies/Hobbies';

const ResumeFinalize = () => {
    const { languages, setLanguages, hobbies, setHobbies } = useResumeContext();

    return (
        <div className="p-6 border border-gray-300 bg-white shadow-lg mt-8 bg-gradient-to-br from-blue-50 to-primary-color sm:p-6 rounded-xl">
            <div className="mb-6">
                <h3 className="text-2xl font-semibold text-gray-800">
                    Almost there! Just finalize your <span className="text-blue-500">document</span>.
                </h3>
            </div>
            <div className="space-y-6">
                <Language props={{ languages, setLanguages }} />
                <Hobbies props={{ hobbies, setHobbies }} />
                <ResumeOthers />
            </div>
        </div>
    );
};

export default ResumeFinalize;
