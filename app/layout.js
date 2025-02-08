import React from "react";
import "./globals.css";
import "@/EmployersComponents/ForEmployersHome/ForEmployersLiveData/ForEmployersLiveData.css";
import "@/EmployersComponents/ForEmployersPostJob/ForEmployersPostJob.css";
import { UserProvider } from "@/Contexts/UserContext";
import "./variables.css";
import "./style.css";
import JobContext from "@/Contexts/JobContext";
import { getServerSession } from "next-auth/next";
import { authOptions } from "app/api/auth/[...nextauth]/route";
import Provider from "@/UserContext/SessionProvider";
import CompanyContext from "@/Contexts/CompanyContext";
import CategoryContext from "@/Contexts/CategoryContext";
import UserProfileContext from "@/Contexts/UserProfileContext";
import ApplicationProvider from "@/Contexts/ApplicationContext"; // Correct import
import { CandidatesProvider } from "@/Contexts/CandidatesContext";
import { InterviewsProvider } from '@/Contexts/InterviewsContext';
import DashboardContext from "@/Contexts/DashboardContext";

async function Layout({ children }) {
    const session = await getServerSession(authOptions);

    return (
        <html lang="en">
            <body className="fou">
                <UserProvider>
                    <DashboardContext>
                        <JobContext>
                            <CompanyContext>
                                <CategoryContext>
                                    <UserProfileContext>
                                        <ApplicationProvider> {/* Use ApplicationProvider here */}
                                            <CandidatesProvider>
                                                <InterviewsProvider>
                                                    <Provider session={session}>{children}</Provider>
                                                </InterviewsProvider>
                                            </CandidatesProvider>
                                        </ApplicationProvider>
                                    </UserProfileContext>
                                </CategoryContext>
                            </CompanyContext>
                        </JobContext>
                    </DashboardContext>
                </UserProvider>
            </body>
        </html>
    );
}

export default Layout;