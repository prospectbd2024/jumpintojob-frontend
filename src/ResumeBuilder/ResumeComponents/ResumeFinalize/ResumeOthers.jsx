import AddButton from '@/Components/Buttons/AddButton';
import ModalBox from '@/Components/UserProfile/Qualifications/ModalBox';
import React, { useState, useCallback } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useResumeContext } from '@/Contexts/ResumeContext';
import AddMore from './AddMore';
import Availability from '@/Components/UserProfile/Availability';

function ResumeOthers() {
    const { more, manageMore } = useResumeContext();
    const [formData, setFormData] = useState({});
    const [inputType, setInputType] = useState('Project');

    const handleChange = (e) => {
        setInputType(e.target.value);
    };

    const showModal = useCallback(
        (title, state) => {
            manageModal({
                title: title,
                display: 'block',
                state: state,
            });
        },
        []
    );

    const closeModal = useCallback(() => {
        setFormData({});
        manageModal({ display: 'none' });
    }, []);

    const [modal, manageModal] = useState({
        display: 'none',
        title: 'Loading',
        state: 'new',
    });

    const removeItem = useCallback(
        (id) => {
            manageMore((prev) =>
                prev.filter((_, index) => index !== id)
            );
        },
        [manageMore]
    );

    const onSave = () => {
        manageMore((prev) => [...prev, formData]);
        closeModal();
    };

    return (
        <div className="mt-8 bg-gradient-to-br from-blue-50 to-primary-color p-4 sm:p-6 rounded-xl shadow-xl">
            <h2 className='font-bold text-lg text-center m-5'>Other Details</h2>
            <style>
                {`
                .scrollbar-hidden::-webkit-scrollbar {
                    display: none; /* Hide scrollbar for WebKit browsers */
                }

                .scrollbar-hidden {
                    -ms-overflow-style: none;  /* Hide scrollbar for Internet Explorer and Edge */
                    scrollbar-width: none;     /* Hide scrollbar for Firefox */
                }
                `}
            </style>
            <div className="space-y-4">
                {more.map((el, index) => (
                    <div className="space-y-1 bg-gradient-to-br from-blue-200 to-primary-color p-5 rounded-md shadow-sm flex justify-between" key={index}>
                        <div>

                        <p className="font-bold text-gray-800 truncate">{el.type} Title: {el.title}</p>
                        {el.startDate && <p><span className="font-bold">Start Year:</span> {el.startDate}</p>}
                        {(el.endDate || el.present) && <p><span className="font-bold">End Year:</span> {el.endDate}</p>}
                        {el.date && <p><span className="font-bold">Date:</span> {el.date}</p>}
                        {el.journal && <p><span className="font-bold">Journal:</span> {el.journal}</p>}

                        <div className="flex items-center overflow-auto scrollbar-hidden">
                            {el.description && <p><span className="font-bold">Description:</span>{el.description}</p>}
                            {el.abstract && <p><span className="font-bold">Abstract:</span>{el.abstract}</p>}
                        </div>
                        </div>
                        <div className="">
                            <FaTrashAlt
                                className="text-red-500 cursor-pointer text-lg"
                                onClick={() => removeItem(index)}
                            />
                        </div>
                        {/* <div className="flex items-center overflow-auto scrollbar-hidden">
                        {el.abstract && <p><span className="font-bold">Abstract:</span> {el.abstract}</p>}
                        </div> */}
                    </div>
                ))}
            </div>
            <ul className="mt-6 space-y-3">
                {['Project', 'Certificate', 'Publication', 'Other'].map((type) => (
                    <li className="flex items-center gap-2" key={type}>
                        <input
                            type="radio"
                            id={type.toLowerCase()}
                            value={type}
                            name="add"
                            checked={inputType === type}
                            onChange={handleChange}
                            className="text-blue-600"
                        />
                        <label htmlFor={type.toLowerCase()} className="text-gray-700">{`Add ${type}s`}</label>
                    </li>
                ))}
            </ul>
            <ModalBox props={{ ...modal, onSave, onClose: closeModal }}>
                <AddMore props={{ inputType, formData, setFormData }} />
            </ModalBox>
            <div className="mt-10">
                <AddButton onClick={() => showModal('Add ' + inputType, 'add')} />
            </div>
            <div className="mt-10">
                <Availability />
            </div>
        </div>
    );
}

export default ResumeOthers;


/*
<div className="flex items-center justify-start">
                <label htmlFor="title" className="text-base sm:text-lg md:text-xl font-bold">Current Address: </label>
                <p className="text-xs sm:text-sm md:text-base">
                {personalInfo.currentAddress?.city}, {personalInfo.currentAddress?.state}, {personalInfo.currentAddress?.country}
              </p>
              </div>
*/