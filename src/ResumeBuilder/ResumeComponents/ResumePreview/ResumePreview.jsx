import React, { useEffect, useRef } from 'react';
import { useResumeContext } from '@/Contexts/ResumeContext';
import RenderTemplate from './RenderTemplate';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ResumePreview = () => {
    const { userProfileData, template, currentStep } = useResumeContext();
    const resumeRef = useRef(null);

    useEffect(() => {
        // console.log(userProfileData)
    }, [userProfileData]);

    const downloadAsPDF = () => {
        const input = resumeRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('resume.pdf');
        });
    };

    const downloadAsImage = (format) => {
        const input = resumeRef.current;
        html2canvas(input).then((canvas) => {
            const link = document.createElement('a');
            link.download = `resume.${format}`;
            link.href = canvas.toDataURL(`image/${format}`);
            link.click();
        });
    };

    return (
        <div className='border border-gray-300 p-5 rounded-lg bg-white mb-5'>
            <div ref={resumeRef}>
                <RenderTemplate template={template} userProfileData={userProfileData} currentStep={currentStep} />
            </div>
            {/* <div className="mt-4 flex flex-wrap gap-2">
                <button onClick={downloadAsPDF} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Download as PDF
                </button>
                <button onClick={() => downloadAsImage('png')} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Download as PNG
                </button>
                <button onClick={() => downloadAsImage('jpeg')} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                    Download as JPEG
                </button>
            </div> */}
        </div>
    );
};

export default ResumePreview;