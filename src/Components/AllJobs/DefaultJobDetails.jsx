import React from 'react';
import { HiOutlineCursorClick } from 'react-icons/hi';

function DefaultJobDetails() {
  return (
    <div className="text-center">
      <div className="mb-8">
        <img
          src="https://img.freepik.com/free-vector/man-search-hiring-job-online-from-laptop_1150-52728.jpg?w=1060&t=st=1691861591~exp=1691862191~hmac=972b280150a5093294a8636690684d858e166b77a44957ee43b427187a9271cd"
          alt=""
          className="max-w-[55%] mx-auto"
        />
      </div>
      <div>
        <h2 className="text-3xl font-semibold text-gray-900 mb-5">Start Your Career Today In The Top Companies!</h2>
        <p className="text-lg text-gray-900 mx-auto mb-6 w-4/6 leading-relaxed">
          Are you looking for a job? You can increase the chance of getting your desired job by subscribing to our Weekly Job alerts! Every week you will find be notified about a job that matches your previous searches.
        </p>
        <button className="bg-primary text-white font-bold text-lg py-2 px-6 rounded flex items-center gap-2 mx-auto transition-colors hover:bg-green-700">
          Subscribe Now <HiOutlineCursorClick className="text-lg" />
        </button>
      </div>
    </div>
  );
}

export default DefaultJobDetails;
