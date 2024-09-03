"use client";
import React, { useContext } from "react";
import { HiArrowSmRight } from "react-icons/hi";
import Link from "next/link";

import { UserContext } from "@/Contexts/UserContext";

const ForEmployersWhyUs = () => {
  const { userData } = useContext(UserContext);
  return (
    <div className="py-24">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="flex gap-5">
          <img
            className="w-[370px] h-[625px] rounded-lg"
            src="https://img.freepik.com/free-photo/front-distanced-view-young-beautiful-lady-grey-shirt-talking-discussing-something-with-young-man-inside-office-during-daytime-building-job-activity_140725-15733.jpg?w=360&t=st=1693581041~exp=1693581641~hmac=1873ad2bae465c0bf918ae7f1e4ce5a3a808bf78b009c3544e37d294bba6ef43"
            alt="Employer"
          />
          <div className="flex flex-col gap-5">
            <img
              className="h-[385px] w-[750px] rounded-lg"
              src="https://media.istockphoto.com/id/635978146/photo/find-new-ways-to-stimulate-your-mind.jpg?s=612x612&w=0&k=20&c=ALL_ZWqBzoLjgjInuc7a-rGc44gmQJZoX7ZmpW8hyJI="
              alt="Stimulate Your Mind"
            />
            <img
              className="h-[220px] w-[750px] rounded-lg"
              src="https://media.istockphoto.com/id/598134426/photo/coworkers-in-synch.jpg?s=612x612&w=0&k=20&c=U6d_51KMV53bGW97WZosrLHCHYmsq6WNE5D52ENo8Ic="
              alt="Coworkers"
            />
          </div>
        </div>
        <div className="space-y-8">
          <h2 className="text-4xl font-bold text-gray-800">
            Why Job Portal Is A Good Choice For Your Company?
          </h2>
          <p className="text-lg text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Asperiores nulla amet excepturi quo nihil quasi. Lorem ipsum dolor
            sit amet consectetur.
          </p>
          <div className="grid grid-cols-2 gap-8 relative">
            <div className="absolute top-20 left-0 w-4/5 h-0.5 bg-gray-300 rounded-full my-[-15px]"></div>
            <div className="absolute top-[-5px] left-[225px] h-[110%] w-0.5 bg-gray-300 rounded-full"></div>
            {[
              { src: "https://demo-egenslab.b-cdn.net/html/jobes/preview/assets/images/icon/job2.svg", title: "No Charge" },
              { src: "https://demo-egenslab.b-cdn.net/html/jobes/preview/assets/images/icon/companies.svg", title: "Verified Candidates" },
              { src: "https://demo-egenslab.b-cdn.net/html/jobes/preview/assets/images/icon/job2.svg", title: "Remote Workers" },
              { src: "https://demo-egenslab.b-cdn.net/html/jobes/preview/assets/images/icon/job2.svg", title: "Quality Candidates" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-12 p-4 bg-blue-100 rounded-full"
                />
                <h4 className="text-xl font-medium">{item.title}</h4>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            {userData && (
              <>
                <Link href="/foremployers/postjobs">
                  <button className="bg-green-500 text-white py-3 px-6 rounded-md font-bold flex items-center gap-2 hover:bg-green-600 transition-all duration-300">
                    Post a Job <HiArrowSmRight className="text-2xl transition-transform duration-300 transform hover:translate-x-2" />
                  </button>
                </Link>
                <Link href="/foremployers/register">
                  <button className="bg-green-500 text-white py-3 px-6 rounded-md font-bold flex items-center gap-2 hover:bg-green-600 transition-all duration-300">
                    Create Account <HiArrowSmRight className="text-2xl transition-transform duration-300 transform hover:translate-x-2" />
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForEmployersWhyUs;
