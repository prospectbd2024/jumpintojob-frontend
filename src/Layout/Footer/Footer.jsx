import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaArrowRight,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-primary-color via-primary- via-indigo-600 to-purple-700 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 text-center sm:text-left">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-900 via-indigo-700 to-purple-900">
              Jump Into Job
            </h2>
            <p className="text-gray-300 text-sm">
              Discover your next career opportunity with ease. Browse jobs,
              explore salaries, and find your perfect fit.
            </p>
            <div className="flex justify-center sm:justify-start space-x-4">
              {[FaFacebook, FaInstagram, FaTwitter, FaYoutube].map(
                (Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors duration-300 transform hover:scale-110"
                  >
                    <Icon size={24} />
                  </a>
                )
              )}
            </div>
          </div>

          {[
            {
              title: "Quick Links",
              items: [
                "Job Search",
                "Companies",
                "Salary Info",
                "Career Advice",
              ],
            },
            {
              title: "Resources",
              items: [
                "About Us",
                "Contact",
                "FAQ",
                "Privacy Policy",
                "Terms of Service",
              ],
            },
          ].map((section, idx) => (
            <div key={idx} className="space-y-4 text-center sm:text-left">
              <h3 className="text-xl font-semibold">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center justify-center sm:justify-start group"
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

          <div className="space-y-4 text-center sm:text-left">
            <h3 className="text-xl font-semibold">Stay Updated</h3>
            <p className="text-gray-300 text-sm">
              Subscribe to our newsletter for the latest job opportunities and
              career tips.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow sm:w-auto md:max-w-xs"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-primary-color to-purple-900 hover:from-blue-600 hover:to-purple-800 px-4 py-2 rounded-md transition-all duration-300 transform hover:scale-105 w-full sm:w-auto md:w-auto md:max-w-xs lg:max-w-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="mt-6 pt-8 border-t border-gray-700">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Jump Into Job. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
