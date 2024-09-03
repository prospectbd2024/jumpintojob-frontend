import React from "react";
import "./globals.css";
import "./responsive.css";       
import "@/EmployersComponents/ForEmployersHome/ForEmployersLiveData/ForEmployersLiveData.css";
import "@/EmployersComponents/ForEmployersPostJob/ForEmployersPostJob.css"; 
import { UserProvider } from "@/Contexts/UserContext";
import "./variables.css";
import JobContext from "@/Contexts/JobContext";
import { getServerSession } from "next-auth/next";
import { authOptions } from "app/api/auth/[...nextauth]/route";
import Provider from "@/UserContext/SessionProvider";
import CompanyContext from "@/Contexts/CompanyContext";
import CategoryContext from "@/Contexts/CategoryContext";
import UserProfileContext from "@/Contexts/UserProfileContext";
import ApplicationContext from "@/Contexts/ApplicationContext";

async function layout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className="fou">
        <UserProvider>
          <JobContext>
            <CompanyContext>
              <CategoryContext>
                <UserProfileContext>
                  <ApplicationContext>
                    <Provider session={session}>{children}</Provider>
                  </ApplicationContext>
                </UserProfileContext>
              </CategoryContext>
            </CompanyContext>
          </JobContext>
        </UserProvider>
      </body>
    </html>
  );
}

export default layout;
