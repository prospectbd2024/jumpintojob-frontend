import React, { useState, useEffect } from 'react';

const ImageUpload = ({ onImageChange }) => {
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                onImageChange(reader.result); 
            };
            reader.readAsDataURL(file);
        }
    }, [file, onImageChange]);

    const handleChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <div>
            <input type="file" onChange={handleChange} />
            {imagePreview && <img src={imagePreview} alt="Profile Preview" />}
        </div>
    );
};

export default ImageUpload;
