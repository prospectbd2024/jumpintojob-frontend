'use client';
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
        (title, state, index) => {
            manageModal({
                title: title,
                display: 'block',
                state: state,
                index: index,
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
        <div className="p-6">
            <h3 className="text-xl font-bold mb-6">Others</h3>
            <div className="space-y-4">
                {more.map((el, index) => (
                    <div className="border p-4 rounded-md shadow-sm space-y-2" key={index}>
                        <div className="flex justify-end">
                            <FaTrashAlt
                                className="text-red-500 cursor-pointer hover:text-red-700"
                                onClick={() => removeItem(index)}
                            />
                        </div>
                        <p className="font-semibold">{el.type} Title: {el.title}</p>
                        {el.startDate && <p><span className="font-medium">Start Year:</span> {el.startDate}</p>}
                        {(el.endDate || el.present) && <p><span className="font-medium">End Year:</span> {el.endDate}</p>}
                        {el.date && <p><span className="font-medium">Date:</span> {el.date}</p>}
                        {el.journal && <p><span className="font-medium">Journal:</span> {el.journal}</p>}
                        {el.description && <p><span className="font-medium">Description:</span> {el.description}</p>}
                        {el.abstract && <p><span className="font-medium">Abstract:</span> {el.abstract}</p>}
                    </div>
                ))}
            </div>
            <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-2">
                    <input
                        type="radio"
                        id="projects"
                        value="Project"
                        name="add"
                        checked={inputType === 'Project'}
                        onChange={handleChange}
                        className="text-blue-600"
                    />
                    <label htmlFor="projects">Add projects</label>
                </li>
                <li className="flex items-center gap-2">
                    <input
                        type="radio"
                        id="certificates"
                        value="Certificate"
                        name="add"
                        onChange={handleChange}
                        className="text-blue-600"
                    />
                    <label htmlFor="certificates">Add certificates</label>
                </li>
                <li className="flex items-center gap-2">
                    <input
                        type="radio"
                        id="publications"
                        value="Publication"
                        name="add"
                        onChange={handleChange}
                        className="text-blue-600"
                    />
                    <label htmlFor="publications">Add publications</label>
                </li>
                <li className="flex items-center gap-2">
                    <input
                        type="radio"
                        id="more"
                        value="Other"
                        name="add"
                        onChange={handleChange}
                        className="text-blue-600"
                    />
                    <label htmlFor="more">Other</label>
                </li>
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
