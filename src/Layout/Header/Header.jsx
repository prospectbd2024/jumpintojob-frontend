"use client";
import React, { useState, useContext, useEffect } from "react";
import Link from "next/link"; 
import { 
  HiMenu, 
  HiX,
} from "react-icons/hi"; 
import Swal from "sweetalert2";
import { usePathname, useRouter } from "next/navigation";
import { UserContext } from "@/Contexts/UserContext";
import { signOut } from "next-auth/react";
import Logo from "@/assets/Logo";
import NavLinks from "./NavLinks";
import MobileUserActions from "./MobileUserActions";
import UserActions from "./UserActions";

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

  // Update activeMenu when the location changes
  useEffect(() => {
    setActiveMenu(location);
  }, [location]);

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

  const handleLogoClick = () => {
    setActiveMenu('/');
  };

  const handleLogout = async () => { 
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/logout`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem("userData");
      await signOut(); 
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
        <div className="bg-white shadow-sm sticky top-0 left-0 z-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center cursor-pointer">
                <Link href="/" passHref onClick={handleLogoClick}>
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

export default Header;