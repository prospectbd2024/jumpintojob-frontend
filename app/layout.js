import React from 'react'
import './globals.css'
import './responsive.css'
import '@/Home/WhyUs/WhyUs.css'
import '@/Components/AllJobs/AllJobs.css'
import '@/Components/Companies/Companies.css'
import '@/Layout/Header/Header.css'
import "@/Components/Login/Login.css"
import '@/Components/Register/Register.css'
import "@/Home/UserHome/UserHome.css"
import "@/Components/UserProfile/UserProfile.css"
import "@/Components/JobDetails/JobDetails.css"
import "@/Components/JobCategory/JobCategory.css"
import "@/Components/UserMyJobs/UserMyJobs.css"
import '@/EmployersComponents/ForEmployersHome/ForEmployersJobBanner/ForEmployersJobBanner.css'
import '@/EmployersComponents/ForEmployersHome/ForEmployersBanner/ForEmployersBanner.css'
import '@/EmployersComponents/ForEmployersHome/ForEmployersLiveData/ForEmployersLiveData.css'
import '@/EmployersComponents/ForEmployersPostJob/ForEmployersPostJob.css'
import '@/EmployersComponents/ManageJobs/ManageJobs.css'
import '@/ResumeBuilder/ResumeComponents/ResumeEducation/PreviewEducation.css'
import '@/ResumeBuilder/ResumeComponents/ResumeFinalize/ResumeFinalize.css'
import '@/ResumeBuilder/ResumeComponents/ResumeSteps/ResumeSteps.css'
import { UserProvider } from "@/Contexts/UserContext"
import './variables.css'
import JobContext from '@/Contexts/JobContext'
import { getServerSession } from "next-auth/next"
import { authOptions } from "app/api/auth/[...nextauth]/route"
import Provider from '@/UserContext/SessionProvider'
import CompanyContext from '@/Contexts/CompanyContext'
import CategoryContext from '@/Contexts/CategoryContext'
import UserProfileContext from '@/Contexts/UserProfileContext'

async function  layout({children}) {

  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body className='fou'>
      <UserProvider>
      <JobContext>
      <CompanyContext>
      <CategoryContext>
        <UserProfileContext>
      <Provider session={session}> 
            {children}
      </Provider>
        </UserProfileContext>
      </CategoryContext>
      </CompanyContext>
      </JobContext>
      </UserProvider>
        </body>
    </html>
  )
}

export default layout
