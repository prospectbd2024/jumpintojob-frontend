import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaArrowRight } from 'react-icons/fa';

const ForEmployersFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="space-y-6 col-span-1 sm:col-span-2">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Jump Into Job
            </h2>
            <p className="text-gray-300 text-sm">
              With Jump Into Job you can browse for jobs, view local and national salary information, discover companies, and learn about the job market in a specific city.
            </p>
            <div className="flex space-x-4">
              {[FaFacebook, FaInstagram, FaTwitter, FaYoutube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110"
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>

          {[
            {
              title: 'Resume',
              items: ['Create a Resume', 'Resume Examples', 'Resume Templates'],
            },
            {
              title: 'Cover Letter',
              items: ['Create a Cover Letter', 'Cover Letter Examples', 'Cover Letter Templates'],
            },
            {
              title: 'Career Blogs',
              items: ['Job Interview', 'Interview Tips', 'Job Search', 'Career Plan'],
            },
            {
              title: 'Support',
              items: ['FAQ', 'Contact Us', 'Terms of Service', 'Privacy', 'About Us'],
            },
          ].map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h3 className="text-xl font-semibold">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                    >
                      <span>{item}</span>
                      <FaArrowRight
                        className="ml-2 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300"
                        size={12}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-700">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            &copy; Copyright {currentYear} - Jump Into Job. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ForEmployersFooter;