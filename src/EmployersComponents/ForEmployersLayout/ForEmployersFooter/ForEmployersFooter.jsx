import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaArrowRight } from 'react-icons/fa';

const ForRecruitersFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-primary-color via-primary- via-indigo-600 to-purple-700 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-6 col-span-1 sm:col-span-2 text-center sm:text-left">
            <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-900 via-indigo-700 to-purple-900">
              Jump Into Job Recruiters
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Empower your hiring process with Jump Into Job Recruiters. Post jobs, manage applicants, discover top talent, and gain insights into the latest hiring trends - all in one place.
            </p>
            <div className="flex justify-center sm:justify-start space-x-6">
              {[FaFacebook, FaInstagram, FaTwitter, FaYoutube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                >
                  <Icon size={28} />
                </a>
              ))}
            </div>
          </div>

          {[
            {
              title: 'Recruiting Resources',
              items: ['Post a Job', 'Recruiting Tips', 'Employer Branding'],
            },
            {
              title: 'Hiring Solutions',
              items: ['Applicant Tracking', 'Interview Scheduling', 'Talent Search'],
            },
            {
              title: 'Industry Insights',
              items: ['Hiring Trends', 'Salary Surveys', 'Workplace Culture'],
            },
          ].map((section, idx) => (
            <div key={idx} className="space-y-4 text-center sm:text-left">
              <h3 className="text-xl font-semibold text-gray-100">{section.title}</h3>
              <ul className="space-y-3">
                {section.items.map((item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center justify-center sm:justify-start group"
                    >
                      <span className="border-b border-transparent group-hover:border-white pb-1">
                        {item}
                      </span>
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
      <div className="mt-12 pt-8 border-t border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center space-y-4">
            <p className="text-gray-300 text-sm text-center">
              &copy; {currentYear} Jump Into Job Recruiters. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['FAQ', 'Contact Us', 'Terms of Service', 'Privacy', 'About Us'].map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-300 hover:text-white text-sm transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ForRecruitersFooter;