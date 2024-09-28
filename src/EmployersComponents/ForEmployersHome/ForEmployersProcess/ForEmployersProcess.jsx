import React from 'react';

const ProcessStep = ({ number, title, description, image }) => (
    <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
        <div className="flex-shrink-0 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {number}
        </div>
        <div className="flex-grow md:pt-3">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            <img src={image} alt={title} className="w-full h-48 object-cover rounded-lg shadow-md" />
        </div>
    </div>
);

const ForEmployersProcess = () => {
    const steps = [
        {
            number: 1,
            title: "Create an employer account",
            description: "Sign up and create your employer profile to get started on our platform.",
            image: "https://img.freepik.com/free-vector/woman-resume-with-magnifier-table-cv-resume-concept-finding-worker-apply-job-business-opportunity-cv-profile_613284-42.jpg?w=740&t=st=1691229625~exp=1691230225~hmac=8aacc3cb7302a633b648714ed8fbf7155464d59176dedc8903c49199c638e770"
        },
        {
            number: 2,
            title: "Explore the website",
            description: "Familiarize yourself with our features and tools designed for employers.",
            image: "https://img.freepik.com/free-vector/choice-worker-concept_23-2148642741.jpg?w=740&t=st=1691231952~exp=1691232552~hmac=84ff7aba59099a9cc243ea24b465ae949de7be1d4322b24e45308d36d521f8e6"
        },
        {
            number: 3,
            title: "Post a job",
            description: "Create and publish your job listing to attract qualified candidates.",
            image: "https://img.freepik.com/free-vector/flat-university-concept_23-2148175455.jpg?w=740&t=st=1691231262~exp=1691231862~hmac=eca71a0a5ea68cb14f107f7098805fe673dcbd5ac96c415200904fc6119ac98b"
        },
        {
            number: 4,
            title: "Schedule interviews",
            description: "Review applications and set up interviews with promising candidates.",
            image: "https://img.freepik.com/free-vector/hiring-process_23-2148642176.jpg?w=740&t=st=1691231889~exp=1691232489~hmac=47018025adc43edd221d28ff535abc84dce999f3be8153b1811f8beb2e9c9b1f"
        },
        {
            number: 5,
            title: "Hire a candidate",
            description: "Select and onboard your chosen candidate to join your team.",
            image: "https://img.freepik.com/free-vector/hiring-process_23-2148642176.jpg?w=740&t=st=1691231889~exp=1691232489~hmac=47018025adc43edd221d28ff535abc84dce999f3be8153b1811f8beb2e9c9b1f"
        }
    ];

    return (
        <div className="bg-gray-50 py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Hire Candidates With These Simple Steps</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">Our streamlined process makes finding and hiring top talent easier than ever.</p>
                </div>
                <div className="space-y-16">
                    {steps.map((step, index) => (
                        <ProcessStep key={index} {...step} />
                    ))}
                </div>
                {/* <div className="mt-16 text-center">
                    <button className="bg-green-500 text-white font-bold py-3 px-8 rounded-full hover:bg-green-600 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                        Post a Job
                    </button>
                </div> */}
            </div>
        </div>
    );
};

export default ForEmployersProcess;