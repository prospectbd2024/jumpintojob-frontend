import { useResumeContext } from '@/Contexts/ResumeContext';
import { useUserProfileContext } from '@/Contexts/UserProfileContext';
import React, { useState } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert2

const DownloadAsButton = () => {
  const [downloadType, setDownloadType] = useState('');
  const { generateTemplate } = useResumeContext();
  const { template } = useUserProfileContext();

  // Handle format selection
  const handleSelect = (e) => {
    setDownloadType(e.target.value);
  };

  // Function to download the base64 data as a file
  const downloadFile = (data, type) => {
    const link = document.createElement('a');
    const base64Data = data.split(',')[1]; // Get the base64 part
    const blob = new Blob([Uint8Array.from(atob(base64Data), c => c.charCodeAt(0))], { type: `image/${type}` });
    const url = URL.createObjectURL(blob); 
    link.href = url;
    link.download = `new_resume.${type}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Handle button click
  const handleAction = async () => {
    if (!downloadType) {
      Swal.fire('Error', 'Please select a format', 'error'); // Show error alert
      return;
    }

    // Show SweetAlert2 loading spinner
    Swal.fire({
      title: 'Generating file...',
      text: 'Please wait while your file is being generated.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const data = await generateTemplate(template, downloadType, {});
      if (data?.template) {
        downloadFile(data.template, data.type);

        // Close the SweetAlert and show success message
        Swal.fire({
          title: 'Success!',
          text: 'Your file has been downloaded.',
          icon: 'success',
        });
      } else {
        Swal.fire('Error', 'No template data found', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'There was an error generating the template', 'error');
    }
  };

  return (
    <div className="flex items-center space-x-4 p-4">
      <select
        value={downloadType}
        onChange={handleSelect}
        className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Format</option>
        <option value="png">PNG</option>
        <option value="pdf">PDF</option>
        <option value="jpg">JPG</option>
      </select>
      <button
        onClick={handleAction}
        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Download
      </button>
    </div>
  );
};

export default DownloadAsButton;
