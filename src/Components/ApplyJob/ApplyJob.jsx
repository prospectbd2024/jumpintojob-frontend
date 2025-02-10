// pages/applyjob.js
import React, { useState, useEffect } from "react";
import { useUserProfileContext } from "@/Contexts/UserProfileContext";
import { useApplicationContext } from "@/Contexts/ApplicationContext";
import { useUserContext } from "@/Contexts/UserContext";
import { useCandidatesContext } from "@/Contexts/CandidatesContext";
import Swal from "sweetalert2";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { AlertCircle, CheckCircle, Info, Briefcase, MapPin, DollarSign } from "lucide-react";
import Link from "next/link";

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
);

const ApplyJob = ({ job }) => {
  const { personalInformation } = useUserProfileContext();
  const { city, state, country } = personalInformation.currentAddress || {};
  const address = [city, state, country].filter(Boolean).join(", ");

  const { userData } = useUserContext();
  const {
    apply,
    message,
    forwardingLetter,
    setForwardingLetter,
    resume,
    setResume,
    CV,
    setCV,
    getResume,
  } = useApplicationContext();
  const { addCandidate } = useCandidatesContext();
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setPhone(personalInformation?.phone || "+880");

    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [personalInformation]);

  const handleCoverLetter = (type) => {
    setForwardingLetter({ type, value: null });
  };

  useEffect(() => {
    getResume();
  }, []);

  const handleClick = async () => {
    if (userData) {
      try {
        await apply(job, CV, resume);

        addCandidate({
          name: personalInformation?.firstName + " " + personalInformation?.lastName,
          role: job.job_title,
          location: address,
          experience: personalInformation?.experience,
          image: userData.image || "/placeholder-image.jpg",
          phone: phone,
          email: personalInformation?.email,
          resume: resume,
          CV: CV,
        });

        Swal.fire("Applied!", "You have successfully applied for this job.", "success");
      } catch (error) {
        console.error("Application failed:", error);
        Swal.fire("Error!", "Failed to apply for the job. Please try again.", "error");
      }
    } else {
      Swal.fire({
        title: "Login Required",
        text: "You must be logged in to apply. Would you like to log in now?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, log in",
        cancelButtonText: "No, thanks",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/signin";
        }
      });
    }
  };

  const handleTextChange = (e) => {
    setForwardingLetter({ type: "text", value: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.id === "resume") {
      setResume(e.target.files[0]);
      setCV(null);
    } else if (e.target.id === "cv") {
      setCV(e.target.files[0]);
      setResume(null);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-4" />
          <div className="flex items-center space-x-4">
            <Skeleton className="w-16 h-16 rounded-full" />
            <div>
              <Skeleton className="h-6 w-40 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-6 w-full" />
            ))}
          </div>
        </div>
        <div className="space-y-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white shadow-md rounded-lg p-6">
              <Skeleton className="h-6 w-1/4 mb-4" />
              <div className="space-y-4">
                {[...Array(4)].map((_, j) => (
                  <Skeleton key={j} className="h-10 w-full" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!isClient || !job) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <>
          <h2 className="text-2xl font-bold mb-2">{job.job_title || "Job Title Not Available"}</h2>
          <p className="text-gray-500 mb-4">
            {job.company_name || "Company Name Not Available"} •{" "}
            {job.address || "Address Not Available"}
          </p>
          <div className="flex items-center space-x-4">
            <img
              src={job.image || "/placeholder-image.jpg"}
              alt={job.company_name || "Company Logo"}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold">
                {job.company_name || "Company Name Not Available"}
              </h3>
              <p className="text-sm text-gray-500">
                {job.availability || "Availability Not Specified"}
              </p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="flex items-center">
              <Briefcase className="mr-2" /> {job.availability || "Not Specified"}
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2" /> {job.address || "Not Specified"}
            </div>
            <div className="flex items-center">
              <DollarSign className="mr-1" /> {job.salary || "Not Specified"}
            </div>
          </div>
        </>
      </div>

      {message.message && (
        <div
          className={`mb-6 p-4 rounded-md flex items-center space-x-2 ${
            message.type === "success"
              ? "bg-green-100 text-green-800"
              : message.type === "error"
              ? "bg-red-100 text-red-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle className="w-5 h-5" />
          ) : message.type === "error" ? (
            <AlertCircle className="w-5 h-5" />
          ) : (
            <Info className="w-5 h-5" />
          )}
          <span>{message.message}</span>
        </div>
      )}

      <form className="space-y-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
          {isLoading ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[...Array(2)].map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    value={personalInformation?.firstName}
                    disabled
                    className="w-full p-2 border rounded-md bg-gray-100"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    value={personalInformation?.lastName}
                    disabled
                    className="w-full p-2 border rounded-md bg-gray-100"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={personalInformation?.email}
                  disabled
                  className="w-full p-2 border rounded-md bg-gray-100"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <PhoneInput
                  international
                  countryCallingCodeEditable={false}
                  defaultCountry="BD"
                  value={phone}
                  onChange={setPhone}
                  className="w-full p-2 border rounded-md focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  id="location"
                  value={address ?? "Not Found!"}
                  disabled
                  className="w-full p-2 border rounded-md bg-gray-100"
                />
              </div>
            </div>
          )}
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Resume</h3>
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-1/2" />
            </div>
          ) : (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload or {resume ? "update" : "create"} your resume {resume && "(Optional)"}
              </label>
              <div className="mt-2 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                <input
                  id="resume"
                  type="file"
                  accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
                  className="w-full md:w-auto p-2 border rounded-md flex-grow"
                  onChange={handleFileChange}
                />

                <Link
                  href="/resumebuilder"
                  className="px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 whitespace-nowrap text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h3 className="text-sm">{resume ? "Update" : "Create"} Resume</h3>
                </Link>
              </div>
            </div>
          )}
          {CV && !isLoading && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <p className="font-semibold">Selected Resume: {CV.name}</p>
            </div>
          )}
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Cover Letter</h3>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-6 w-full" />
              ))}
              <Skeleton className="h-32 w-full" />
            </div>
          ) : (
            <>
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="cl-none"
                    name="coverLetter"
                    value="none"
                    onChange={() => handleCoverLetter("none")}
                    defaultChecked
                  />
                  <label htmlFor="cl-none">No cover letter</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="cl-text"
                    name="coverLetter"
                    value="text"
                    onChange={() => handleCoverLetter("text")}
                  />
                  <label htmlFor="cl-text">Write cover letter</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="cl-file"
                    name="coverLetter"
                    value="file"
                    onChange={() => handleCoverLetter("text")}
                  />
                  <label htmlFor="cl-file">Upload cover letter</label>
                </div>
              </div>

              {forwardingLetter.type === "text" && (
                <textarea
                  placeholder="Write your cover letter here..."
                  className="w-full p-2 border rounded-md mt-2"
                  rows={6}
                  onChange={handleTextChange}
                ></textarea>
              )}
              {forwardingLetter.type === "file" && (
                <input
                  type="file"
                  accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
                  className="w-full p-2 border rounded-md mt-2"
                  onChange={handleFileChange}
                />
              )}
            </>
          )}
        </div>

        <div className="flex justify-end">
          {isLoading ? (
            <Skeleton className="h-10 w-32" />
          ) : (
            <button
              onClick={handleClick}
              disabled={(!CV && !resume) || !job}
              className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ${
                (!CV && !resume) || !job ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="button"
            >
              Apply Now
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ApplyJob;
