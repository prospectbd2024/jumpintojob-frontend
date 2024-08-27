import React, { useContext } from "react";
import { HiArrowSmRight } from "react-icons/hi";
import Link from "next/link";
import { UserContext } from "@/Contexts/UserContext";

const ForEmployersWhyUs = () => {
  const { userData } = useContext(UserContext);

  return (
    <section className="why-us py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="image-container">
            <img
              src="https://img.freepik.com/free-photo/front-distanced-view-young-beautiful-lady-grey-shirt-talking-discussing-something-with-young-man-inside-office-during-daytime-building-job-activity_140725-15733.jpg?w=360&t=st=1693581041~exp=1693581641~hmac=1873ad2bae465c0bf918ae7f1e4ce5a3a808bf78b009c3544e37d294bba6ef43"
              alt="Office Discussion"
              className="rounded-lg w-full h-auto object-cover md:h-[625px]"
            />
          </div>
          <div className="content flex flex-col gap-8">
            <h2 className="text-4xl font-semibold text-gray-800 text-center">
              Why Job Portal Is A Good Choice For Your Company?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores nulla amet excepturi quo nihil quasi. Lorem ipsum dolor sit amet consectetur
            </p>
            <div className="benefits grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
              <div className="benefit flex items-center gap-4">
                <img
                  src="https://demo-egenslab.b-cdn.net/html/jobes/preview/assets/images/icon/job2.svg"
                  alt="No Charge Icon"
                  className="bg-blue-100 p-4 rounded-full animate-pulse" // Added subtle animation
                />
                <h4 className="text-xl font-medium">No Charge</h4>
              </div>
              <div className="benefit flex items-center gap-4">
                <img
                  src="https://demo-egenslab.b-cdn.net/html/jobes/preview/assets/images/icon/companies.svg"
                  alt="Verified Candidates Icon"
                  className="bg-blue-100 p-4 rounded-full animate-pulse"
                />
                <h4 className="text-xl font-medium">Verified Candidates</h4>
              </div>
              <div className="benefit flex items-center gap-4 sm:flex">
                <img
                  src="https://demo-egenslab.b-cdn.net/html/jobes/preview/assets/images/icon/job2.svg"
                  alt="Remote Workers Icon"
                  className="bg-blue-100 p-4 rounded-full animate-pulse"
                />
                <h4 className="text-xl font-medium">Remote Workers</h4>
              </div>
              <div className="benefit flex items-center gap-4 sm:flex">
                <img
                  src="https://demo-egenslab.b-cdn.net/html/jobes/preview/assets/images/icon/job2.svg"
                  alt="Quality Candidates Icon"
                  className="bg-blue-100 p-4 rounded-full animate-pulse"
                />
                <h4 className="text-xl font-medium">Quality Candidates</h4>
              </div>
            </div>
            <div className="text-center">
              {userData && (
                <>
                  <Link href="/foremployers/postjobs">
                    <a className="call-to-action inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition duration-300">
                      Post a Job <HiArrowSmRight className="ml-2 text-xl" />
                    </a>
                  </Link>
                  <Link href="/foremployers/register">
                    <a className="call-to-action inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full mt-4 transition duration-300">
                      Create Account <HiArrowSmRight className="ml-2 text-xl" />
                    </a>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForEmployersWhyUs;