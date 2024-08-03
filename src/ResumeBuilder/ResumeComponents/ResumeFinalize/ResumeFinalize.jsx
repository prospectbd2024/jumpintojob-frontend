import React from 'react';
import ResumeOthers from './ResumeOthers';
import { useResumeContext } from '@/Contexts/ResumeContext';
import Language from '@/Components/UserProfile/Qualifications/Language/Language';
import Hobbies from '@/Components/UserProfile/Qualifications/Hobbies/Hobbies';

const ResumeFinalize = () => {
    const { languages, setLanguages, hobbies, setHobbies } = useResumeContext();

    return (
        <div className="p-6 border border-gray-300 rounded-lg">
            <div className="mb-6">
                <h3 className="text-2xl font-semibold">
                    YAY, you are one step away from your final <span className="text-blue-500">document!</span>
                </h3>
            </div>
            <div className="space-y-6">
                <div>
                    <Language props={{ languages, setLanguages }} />
                </div>
                <div>
                    <Hobbies props={{ hobbies, setHobbies }} />
                </div>
                <div>
                    <ResumeOthers />
                </div>
            </div>
        </div>
    );
};

export default ResumeFinalize;
