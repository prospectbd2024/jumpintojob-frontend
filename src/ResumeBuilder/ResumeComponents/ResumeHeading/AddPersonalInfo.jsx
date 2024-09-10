import React, { useState, useCallback, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

function AddPersonalInfo({ props }) {
    const { personalInfo, setPersonalInfo, onClose } = props;
    const [localPersonalInfo, setLocalPersonalInfo] = useState(personalInfo || {});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setLocalPersonalInfo(personalInfo || {});
    }, [personalInfo]);

    const handleChange = useCallback((key, value) => {
        setLocalPersonalInfo(prevState => ({
            ...prevState,
            [key]: value
        }));
    }, []);

    const handleAddressChange = useCallback((addressType, field, value) => {
        setLocalPersonalInfo(prevState => ({
            ...prevState,
            [addressType]: {
                ...prevState[addressType],
                [field]: value
            }
        }));
    }, []);

    const validateForm = () => {
        let newErrors = {};
        if (!localPersonalInfo.firstName) newErrors.firstName = "First name is required";
        if (!localPersonalInfo.lastName) newErrors.lastName = "Last name is required";
        if (!localPersonalInfo.email) newErrors.email = "Email is required";
        if (!localPersonalInfo.phoneNumber) newErrors.phoneNumber = "Phone number is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (validateForm()) {
            setPersonalInfo(localPersonalInfo);
            onClose();
        }
    };

    return (
        <div className="flex flex-col gap-4 max-h-[80vh] p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        id="firstName"
                        type="text"
                        placeholder='First Name'
                        value={localPersonalInfo.firstName || ''}
                        onChange={(e) => handleChange('firstName', e.target.value)}
                        className="border p-2 rounded"
                    />
                    {errors.firstName && <span className="text-red-500">{errors.firstName}</span>}
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        id="lastName"
                        type="text"
                        placeholder='Last Name'
                        value={localPersonalInfo.lastName || ''}
                        onChange={(e) => handleChange('lastName', e.target.value)}
                        className="border p-2 rounded"
                    />
                    {errors.lastName && <span className="text-red-500">{errors.lastName}</span>}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder='Email'
                        value={localPersonalInfo.email || ''}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="border p-2 rounded"
                    />
                    {errors.email && <span className="text-red-500">{errors.email}</span>}
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        id="phoneNumber"
                        type="tel"
                        placeholder='+8801234567890'
                        value={localPersonalInfo.phoneNumber || ''}
                        onChange={(e) => handleChange('phoneNumber', e.target.value)}
                        className="border p-2 rounded"
                    />
                    {errors.phoneNumber && <span className="text-red-500">{errors.phoneNumber}</span>}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="gender">Gender</label>
                    <select
                        id="gender"
                        value={localPersonalInfo.gender || ''}
                        onChange={(e) => handleChange('gender', e.target.value)}
                        className="border p-2 rounded"
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="maritalStatus">Marital Status</label>
                    <select
                        id="maritalStatus"
                        value={localPersonalInfo.maritalStatus || ''}
                        onChange={(e) => handleChange('maritalStatus', e.target.value)}
                        className="border p-2 rounded"
                    >
                        <option value="">Select Status</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="divorced">Divorced</option>
                        <option value="widowed">Widowed</option>
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="nationality">Nationality</label>
                    <input
                        id="nationality"
                        type="text"
                        placeholder='Bangladeshi'
                        value={localPersonalInfo.nationality || ''}
                        onChange={(e) => handleChange('nationality', e.target.value)}
                        className="border p-2 rounded"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <label>Current Address</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        placeholder="House No"
                        value={localPersonalInfo.currentAddress?.houseNo || ''}
                        onChange={(e) => handleAddressChange('currentAddress', 'houseNo', e.target.value)}
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="City"
                        value={localPersonalInfo.currentAddress?.city || ''}
                        onChange={(e) => handleAddressChange('currentAddress', 'city', e.target.value)}
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Country"
                        value={localPersonalInfo.currentAddress?.country || ''}
                        onChange={(e) => handleAddressChange('currentAddress', 'country', e.target.value)}
                        className="border p-2 rounded"
                    />
                </div>
            </div>
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="sameAsCurrent"
                    checked={localPersonalInfo.permanentAddressSameAsCurrent || false}
                    onChange={(e) => handleChange('permanentAddressSameAsCurrent', e.target.checked)}
                />
                <label htmlFor="sameAsCurrent">Permanent Address same as Current Address</label>
            </div>
            {!localPersonalInfo.permanentAddressSameAsCurrent && (
                <div className="flex flex-col gap-2">
                    <label>Permanent Address</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            type="text"
                            placeholder="House No"
                            value={localPersonalInfo.permanentAddress?.houseNo || ''}
                            onChange={(e) => handleAddressChange('permanentAddress', 'houseNo', e.target.value)}
                            className="border p-2 rounded"
                        />
                        <input
                            type="text"
                            placeholder="City"
                            value={localPersonalInfo.permanentAddress?.city || ''}
                            onChange={(e) => handleAddressChange('permanentAddress', 'city', e.target.value)}
                            className="border p-2 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Country"
                            value={localPersonalInfo.permanentAddress?.country || ''}
                            onChange={(e) => handleAddressChange('permanentAddress', 'country', e.target.value)}
                            className="border p-2 rounded"
                        />
                    </div>
                </div>
            )}
            <div className="flex flex-col gap-2">
                <label htmlFor="careerSummary">Career Summary</label>
                <textarea
                    id="careerSummary"
                    placeholder='Your Career Summary'
                    value={localPersonalInfo.careerSummary || ''}
                    onChange={(e) => handleChange('careerSummary', e.target.value)}
                    className="border p-2 rounded"
                    rows="4"
                />
            </div>
            <div className="flex flex-col gap-2">
                <label>Social Media Links</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                        <FaFacebook className="text-blue-600" />
                        <input
                            type="url"
                            placeholder="Facebook URL"
                            value={localPersonalInfo.socialMedia?.facebook || ''}
                            onChange={(e) => handleAddressChange('socialMedia', 'facebook', e.target.value)}
                            className="border p-2 rounded flex-grow"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <FaTwitter className="text-blue-400" />
                        <input
                            type="url"
                            placeholder="Twitter URL"
                            value={localPersonalInfo.socialMedia?.twitter || ''}
                            onChange={(e) => handleAddressChange('socialMedia', 'twitter', e.target.value)}
                            className="border p-2 rounded flex-grow"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <FaLinkedin className="text-blue-700" />
                        <input
                            type="url"
                            placeholder="LinkedIn URL"
                            value={localPersonalInfo.socialMedia?.linkedin || ''}
                            onChange={(e) => handleAddressChange('socialMedia', 'linkedin', e.target.value)}
                            className="border p-2 rounded flex-grow"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <FaGithub className="text-gray-800" />
                        <input
                            type="url"
                            placeholder="GitHub URL"
                            value={localPersonalInfo.socialMedia?.github || ''}
                            onChange={(e) => handleAddressChange('socialMedia', 'github', e.target.value)}
                            className="border p-2 rounded flex-grow"
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-end gap-2 mt-4 pb-6">
                <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
                <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
            </div>
        </div>
    );
}

export default AddPersonalInfo;