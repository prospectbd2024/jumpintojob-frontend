"use client";
import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { FaFileAlt, FaUserTie } from "react-icons/fa";
import {
  HiBriefcase,
  HiCog,
  HiMenu,
  HiOutlineUser,
  HiOutlineUserAdd,
  HiQuestionMarkCircle,
  HiX,
} from "react-icons/hi";
import { TbBell, TbLogout, TbSend, TbUserCircle } from "react-icons/tb";
import Swal from "sweetalert2";
import { usePathname, useRouter } from "next/navigation";
import { UserContext } from "@/Contexts/UserContext";
import { signOut } from "next-auth/react";
import Logo from "@/assets/Logo";

const Header = () => {
  const forEmployerNavigate = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = usePathname();
  const [activeMenu, setActiveMenu] = useState(location);
  const { userData, setUserData } = useContext(UserContext);

  const [userProfileClicked, setUserProfileClicked] = useState(false);
  const [isClient, setClient] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Global");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userProfileClicked && !event.target.closest(".user-profile-icon")) {
        setUserProfileClicked(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [userProfileClicked]);

  useEffect(() => {
    setClient(true);
  }, []);

  const toggleOption = () => {
    setSelectedOption(selectedOption === "Global" ? "Local" : "Global");
  };

  const toggleUserProfile = () => {
    setUserProfileClicked((prev) => !prev);
  };

  const handleActiveMenu = (e) => {
    setActiveMenu(e);
    setMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    forEmployerNavigate.push("/signin");
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "User logout successful!",
      showConfirmButton: false,
      timer: 1500,
    });
    setUserData(null);
    const token = userData?.data?.access_token;
    if (!token) {
      console.error("User token not available.");
      return;
    }
    try {
      const userLogoutResponse = await fetch(
        ${process.env.NEXT_PUBLIC_API_URL}/api/v1/logout,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            accept: "application/json",
            Authorization: Bearer ${token},
          },
        }
      );
      localStorage.removeItem("userData");
      await signOut();
      const userLogoutData = await userLogoutResponse.json();
      setUserData(null);
    } catch (error) {
      console.error("Logout failed:", error);
      alert(error);
    }
  };

  const handleSignoutAlert = async () => {
    if (userData) {
      const result = await Swal.fire({
        title: "You will be logged out from your job seeker account!",
        text: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
      });

      if (result.isConfirmed) {
        Swal.fire(
          "Welcome!",
          "To post jobs, create an employer account with your business email",
          "success"
        ).then(() => {
          handleLogout();
          forEmployerNavigate.push("/foremployers");
        });
      }
    } else {
      forEmployerNavigate.push("/foremployers");
    }
  };

  return (
    <>
      {isClient && (
        <div className="bg-white border-b border-gray-400 sticky top-0 left-0 z-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center cursor-pointer">
                <Link href="/" passHref>
                  <Logo className="w-24 h-8 sm:w-32 sm:h-10" fill="var(--primary-color)" />
                </Link>
              </div>
              <div className="hidden lg:flex items-center space-x-4">
                <NavLinks activeMenu={activeMenu} handleActiveMenu={handleActiveMenu} />
                <UserActions
                  userData={userData}
                  selectedOption={selectedOption}
                  toggleOption={toggleOption}
                  toggleUserProfile={toggleUserProfile}
                  userProfileClicked={userProfileClicked}
                  handleLogout={handleLogout}
                  handleSignoutAlert={handleSignoutAlert}
                />
              </div>
              <div className="lg:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
                >
                  {mobileMenuOpen ? (
                    <HiX className="h-8 w-8" />
                  ) : (
                    <HiMenu className="h-8 w-8" />
                  )}
                </button>
              </div>
            </div>
          </div>
          {/* Mobile menu */}
          <div
            className={`lg:hidden fixed inset-0 bg-white z-50 transition-transform duration-300 ease-in-out ${
              mobileMenuOpen ? "transform translate-x-0" : "transform -translate-x-full"
            }`}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
                >
                  <HiX className="h-8 w-8" />
                </button>
              </div>
              <div className="text-center">
                <NavLinks activeMenu={activeMenu} handleActiveMenu={handleActiveMenu} mobile />
                <MobileUserActions
                  userData={userData}
                  handleSignoutAlert={handleSignoutAlert}
                  handleLogout={handleLogout}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const NavLinks = ({ activeMenu, handleActiveMenu, mobile }) => {
  const links = [
    { href: "/", label: "Home" },
    { href: "/jobs", label: "Jobs" },
    { href: "/companies", label: "Companies" },
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`${
            activeMenu === link.href ? "text-blue-500" : "text-gray-800"
          } ${
            mobile
              ? "block px-4 py-3 text-2xl font-semibold hover:bg-blue-100 rounded-lg transition-colors duration-200"
              : ""
          }`}
          onClick={() => handleActiveMenu(link.href)}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
};

const UserActions = ({
  userData,
  selectedOption,
  toggleOption,
  toggleUserProfile,
  userProfileClicked,
  handleLogout,
  handleSignoutAlert,
}) => {
  return (
    <div className="flex items-center space-x-4">
      {userData ? (
        <>
          <GlobalLocalToggle selectedOption={selectedOption} toggleOption={toggleOption} />
          <TbBell className="text-2xl text-gray-600 hover:shadow-lg cursor-pointer" />
          <UserProfileDropdown
            userData={userData}
            toggleUserProfile={toggleUserProfile}
            userProfileClicked={userProfileClicked}
            handleLogout={handleLogout}
          />
          <Link
            href="/dashboard/appliedjobs"
            className="flex items-center gap-2 text-gray-800 hover:bg-blue-100 p-2 rounded"
          >
            <HiOutlineUser /> Dashboard
          </Link>
          <button
            className="flex items-center gap-2 text-gray-800 hover:bg-blue-100 p-2 rounded"
            onClick={handleSignoutAlert}
          >
            <TbSend /> Post a Job
          </button>
        </>
      ) : (
        <>
          <Link href="/signin" className="flex items-center gap-2">
            <HiOutlineUser /> Sign in
          </Link>
          <Link href="/signup" className="flex items-center gap-2">
            <HiOutlineUserAdd /> Register
          </Link>
        </>
      )}
      <Link href="/foremployers" className="flex items-center gap-2">
        <HiBriefcase /> For Employers
      </Link>
    </div>
  );
};

const MobileUserActions = ({ userData, handleSignoutAlert, handleLogout }) => {
  return (
    <div className="mt-6 space-y-4">
      {userData ? (
        <>
          <Link
            href="/dashboard/appliedjobs"
            className="block px-4 py-3 text-2xl font-semibold text-gray-800 hover:bg-blue-100 rounded-lg transition-colors duration-200"
          >
            Dashboard
          </Link>
          <button
            className="block w-full text-center px-4 py-3 text-2xl font-semibold text-gray-800 hover:bg-blue-100 rounded-lg transition-colors duration-200"
            onClick={handleSignoutAlert}
          >
            Post a Job
          </button>
          <button
            className="block w-full text-center px-4 py-3 text-2xl font-semibold text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
            onClick={handleLogout}
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          <Link
            href="/signin"
            className="block px-4 py-3 text-2xl font-semibold text-gray-800 hover:bg-blue-100 rounded-lg transition-colors duration-200"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="block px-4 py-3 text-2xl font-semibold text-gray-800 hover:bg-blue-100 rounded-lg transition-colors duration-200"
          >
            Register
          </Link>
        </>
      )}
      <Link
        href="/foremployers"
        className="block px-4 py-3 text-2xl font-semibold text-gray-800 hover:bg-blue-100 rounded-lg transition-colors duration-200"
      >
        For Employers
      </Link>
    </div>
  );
};

const GlobalLocalToggle = ({ selectedOption, toggleOption }) => {
  return (
    <label className="relative inline-block w-14 h-7">
      <input
        type="checkbox"
        className="opacity-0 w-0 h-0"
        onClick={toggleOption}
      />
      <span
        className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-cover bg-center rounded-full transition-transform duration-300"
        style={{
          backgroundImage: `url('${
            selectedOption === "Global"
              ? "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/world-map-in-blue-michael-tompsett.jpg"
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmB-yQ2zFUyD9BgDpBCSWKFDEDe4pYk2pOSoPQ8PEG&s"
          }')`,
        }}
      ></span>
      <span
        className="absolute left-1 top-1 w-5 h-5 bg-gray-400 rounded-full transition-transform duration-300 transform"
        style={{
          transform:
            selectedOption === "Global"
              ? "translateX(0)"
              : "translateX(26px)",
        }}
      ></span>
    </label>
  );
};

const UserProfileDropdown = ({
  userData,
  toggleUserProfile,
  userProfileClicked,
  handleLogout,
}) => {
  return (
    <div className="relative">
      <TbUserCircle
        className={`text-2xl text-gray-600 cursor-pointer ${
          userProfileClicked ? "shadow-lg" : ""
        }`}
        onClick={toggleUserProfile}
      />
      {userProfileClicked && (
        <div className="absolute top-10 right-0 w-72 bg-white shadow-lg rounded-lg p-5">
          <div className="mb-4">
            <h4 className="text-lg font-bold text-gray-800">
              Welcome {userData?.data?.user.first_name}!
            </h4>
            <p className="text-sm text-gray-800">{userData?.data?.user.email}</p>
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <UserProfileLink href="/userprofile/aboutme" icon={<FaUserTie />} label="Profile" />
            <UserProfileLink href="#" icon={<FaFileAlt />} label="Resume Build" />
            <UserProfileLink href="#" icon={<HiBriefcase />} label="My Jobs" />
            <UserProfileLink href="#" icon={<HiCog />} label="Settings" />
            <UserProfileLink href="#" icon={<HiQuestionMarkCircle />} label="Help Center" />
          </div>
          <button
            className="w-full text-red-700 border-t border-gray-300 py-2 text-center font-bold flex items-center justify-between"
            onClick={handleLogout}
          >
            Sign Out <TbLogout className="text-xl" />
          </button>
        </div>
      )}
    </div>
  );
};

const UserProfileLink = ({ href, icon, label }) => (
  <Link
    href={href}
    className="flex items-center gap-2 text-gray-800 hover:bg-blue-100 p-2 rounded"
  >
    {icon} {label}
  </Link>
);


export default Header;