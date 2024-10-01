"use client";
import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { UserContext } from "@/Contexts/UserContext";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Logo from "@/assets/Logo";
import { TbBell, TbSend, TbBriefcase, TbLogout, TbUserCircle, TbClipboardList, TbMessage2, TbHome2, TbUsers, TbMenu2, TbX } from "react-icons/tb";
import { HiBriefcase, HiCog, HiQuestionMarkCircle, HiOutlineUserAdd, HiOutlineUser } from "react-icons/hi";

const ForEmployersHeader = () => {
  const [isClient, setClient] = useState(false);
  const activeMenu = usePathname();
  const { userData, setUserData } = useContext(UserContext);
  const [userProfileClicked, setUserProfileClicked] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setClient(true);
  }, []);

  const handleLogout = async (e) => {
    localStorage.removeItem("userData");
    const token = userData?.data?.access_token;
    if (!token) {
      console.error("User token not available.");
      return;
    }
    try {
      setUserData(null);

      const userLogoutResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      await signOut();
      router.push("/signin");
      const userLogoutData = await userLogoutResponse.json();
      // alert("Logout Successfull!")
      setUserLoggedout(userLogoutData);
    } catch (error) {
      console.error("Logout failed:", error);
      alert(error);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const MenuItem = ({ href, icon: Icon, text }) => (
    <Link
      href={href}
      className={`${
        activeMenu === href ? "bg-blue-100 text-blue-600" : "text-gray-800 hover:bg-blue-50"
      } flex items-center gap-2 p-2 rounded-lg transition-colors duration-200`}
      onClick={closeMobileMenu}
    >
      <Icon className="text-xl" />
      <span className="whitespace-nowrap">{text}</span>
    </Link>
  );

  return isClient && (
    <header className="bg-white shadow-md sticky top-0 left-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2 group">
            <Logo className="w-24 h-8 sm:w-32 sm:h-10 transition-transform duration-300 group-hover:scale-105" fill="var(--primary-color)" />
            <div className="hidden sm:flex flex-col">
              {/* <span className="text-blue-600 text-xs font-medium">Find Top Talent</span> */}
              <span className="text-primary-color font-semibold text-lg leading-tight">For Employers</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden xl:flex items-center space-x-1 2xl:space-x-6">
            <MenuItem href="/foremployers" icon={TbHome2} text="Home" />
            <MenuItem href="/foremployers/postjobs" icon={TbSend} text="Post a Job" />
            <MenuItem href="/candidates" icon={TbClipboardList} text="Candidates" />
            <MenuItem href="" icon={TbMessage2} text="Message" />
            <MenuItem href="/" icon={TbUsers} text="For Workers" />

            {userData?.data ? (
              <div className="flex items-center space-x-4">
                <TbBell className="w-6 h-6 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-200" />
                <div className="relative">
                  <TbUserCircle
                    onClick={() => setUserProfileClicked(!userProfileClicked)}
                    className="w-6 h-6 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-200"
                  />
                  {userProfileClicked && (
                    <div className="absolute top-10 right-0 w-72 bg-white shadow-lg rounded-lg p-5">
                      {/* ... (keep the existing user profile dropdown content) */}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <MenuItem href="/foremployers/register" icon={HiOutlineUserAdd} text="Register" />
                <MenuItem href="/foremployers/signin" icon={HiOutlineUser} text="Sign In" />
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="xl:hidden text-gray-600 hover:text-blue-600 focus:outline-none transition-colors duration-200"
            onClick={toggleMobileMenu}
          >
            <TbMenu2 className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-lg transform ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out xl:hidden`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <span className="text-xl font-semibold text-gray-800">Menu</span>
          <button
            className="text-gray-600 hover:text-blue-600 focus:outline-none transition-colors duration-200"
            onClick={closeMobileMenu}
          >
            <TbX className="w-6 h-6" />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          <MenuItem href="/foremployers" icon={TbHome2} text="Home" />
          <MenuItem href="/foremployers/postjobs" icon={TbSend} text="Post a Job" />
          <MenuItem href="/candidates" icon={TbClipboardList} text="Candidates" />
          <MenuItem href="" icon={TbMessage2} text="Message" />
          <MenuItem href="/" icon={TbUsers} text="For Workers" />
          {!userData?.data && (
            <>
              <MenuItem href="/foremployers/register" icon={HiOutlineUserAdd} text="Register" />
              <MenuItem href="/foremployers/signin" icon={HiOutlineUser} text="Sign In" />
            </>
          )}
        </nav>
        {userData?.data && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
            <button
              className="w-full text-red-600 font-medium py-2 px-4 rounded-lg hover:bg-red-50 transition-colors duration-200 flex items-center justify-center space-x-2"
              onClick={handleLogout}
            >
              <TbLogout className="text-xl" />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default ForEmployersHeader;