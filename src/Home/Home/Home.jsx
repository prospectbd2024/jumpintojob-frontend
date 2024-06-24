"use client"
import React, { useContext,useState,useEffect } from 'react';
import Banner from '../Banner/Banner';
import WhyUs from '../WhyUs/WhyUs';
import FeaturedJobs from '../FeaturedJobs/FeaturedJobs';
import ResumeHelp from '../ResumeHelp/ResumeHelp'; 
import { useUserContext } from '../../Contexts/UserContext';
import UserHome from '../UserHome/UserHome';
import FeaturedCompanies from '../UserHome/FeaturedCompanies';

const Home = () => {
    const { userData } = useUserContext();
    const [isClient,setClient] = useState(false);

    useEffect(() => {
        setClient(true)
      
    }, [])
    

    // console.log(userData)


    
    return (isClient&&
        <div>
            {userData ?
                <UserHome/>
                :
                <div>
                    <Banner></Banner>
                    <FeaturedJobs></FeaturedJobs>
                    <FeaturedCompanies props={{isLoggedIn : false}} />
                    <WhyUs></WhyUs>
                </div>
            }
            <ResumeHelp/>
        </div>
    );
};

export default Home;