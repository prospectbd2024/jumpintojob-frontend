import React, { useState, useEffect } from "react";
import { useUserProfileContext } from "@/Contexts/UserProfileContext";
import { useApplicationContext } from "@/Contexts/ApplicationContext";
import { useUserContext } from "@/Contexts/UserContext";
import Swal from "sweetalert2";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  AlertCircle,
  CheckCircle,
  Info,
  Briefcase,
  MapPin,
  DollarSign,
} from "lucide-react";
import Link from "next/link";

const ApplyJob = ({ job }) => {
  const { personalInformation } = useUserProfileContext();
  const [CV, setCV] = useState(false);
  const { userData } = useUserContext();
  const { apply, message, forwardingLetter, setForwardingLetter } =
    useApplicationContext();
  const [phone, setPhone] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setPhone(personalInformation?.phone || "+880");
  }, [personalInformation]);

  const handleCoverLetter = (type) => {
    setForwardingLetter({ type, value: null });
  };

  const handleClick = () => {
    if (userData) {
      CV && job && apply(job, CV);
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
    setForwardingLetter({ type: "file", value: e.target.files[0] });
  };

  if (!isClient || !job) {
    return null;
  }
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-2">{job.job_title || 'Job Title Not Available'}</h2>
        <p className="text-gray-500 mb-4">
          {job.company_name || 'Company Name Not Available'} • {job.address || 'Address Not Available'}
        </p>
        <div className="flex items-center space-x-4">
          <img
            src={job.image || '/placeholder-image.jpg'}
            alt={job.company_name || 'Company Logo'}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold">{job.company_name || 'Company Name Not Available'}</h3>
            <p className="text-sm text-gray-500">{job.availability || 'Availability Not Specified'}</p>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="flex items-center">
            <Briefcase className="mr-2" /> {job.availability || 'Not Specified'}
          </div>
          <div className="flex items-center">
            <MapPin className="mr-2" /> {job.address || 'Not Specified'}
          </div>
          <div className="flex items-center">
            <DollarSign className="mr-1" /> {job.salary || 'Not Specified'}
          </div>
        </div>
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
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <PhoneInput
                international
                countryCallingCodeEditable={false}
                defaultCountry="BD"
                value={phone}
                onChange={setPhone}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Location
              </label>
              <input
                id="location"
                value={`${personalInformation.currentAddress?.city}${
                  personalInformation.currentAddress?.state
                    ? ", " + personalInformation.currentAddress.state
                    : ""
                }, ${personalInformation.currentAddress?.country}`}
                disabled
                className="w-full p-2 border rounded-md bg-gray-100"
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Resume</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload or create your resume
            </label>
            <div className="mt-2 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
              <input
                id="resume"
                type="file"
                className="w-full md:w-auto p-2 border rounded-md flex-grow"
                onChange={(e) => setCV(e.target.files[0])}
              />
              <Link
                href="/resumebuilder"
                className="px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 whitespace-nowrap text-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3 className="text-sm">Create Resume</h3>
              </Link>
            </div>
          </div>
          {CV && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <p className="font-semibold">Selected Resume: {CV.name}</p>
            </div>
          )}
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Cover Letter</h3>
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
                onChange={() => handleCoverLetter("file")}
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
              className="w-full p-2 border rounded-md mt-2"
              onChange={handleFileChange}
            />
          )}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleClick}
            disabled={!CV || !job}
            className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ${
              !CV || !job ? "opacity-50 cursor-not-allowed" : ""
            }`}
            type="button"
          >
            Apply Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplyJob;