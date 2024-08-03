import React from 'react';

const AddNew = () => {
    return (
        <div className="flex flex-col gap-4">
            <label htmlFor="addnew" className="text-lg font-semibold">
                Add New
            </label>
            <textarea
                name="addnew"
                id="addnew"
                cols="30"
                rows="10"
                className="p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
        </div>
    );
};

export default AddNew;
