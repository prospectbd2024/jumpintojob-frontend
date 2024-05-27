"use client"
import React, { createContext, useContext, useState, useEffect ,useCallback} from 'react'
import { useUserContext } from './UserContext';
import axios from "axios"
import Swal from "sweetalert2";
const userProfileContext = createContext();
export const useUserProfileContext = () => useContext(userProfileContext);


function UserProfileContext({ children }) {
    const {userData} = useUserContext();

    const pdata = {
        "title": "",
        "firstName": "",
        "userType" : "",
        "lastName": "",
        "avatar": "", // Correcting 'avata' to 'avatar'
        "cvProfileImage": "",
        "email": "",
        "phone": "",
        "currentAddress": {
            "city": "",
            "state": "",
            "country": "",
            "postalCode": "" // Adding postal_code
        },
        "permanentAddress": {
            "city": "",
            "state": "",
            "country": "",
            "postalCode": "" // Adding postal_code
        },
        "dateOfBirth": "", // New field for date of birth
        "gender": "", // New field for gender
        "nationality": "", // New field for nationality
        "religion": "", // New field for religion
        "maritalStatus": "", // New field for marital status
        "summary": "",
        "mediaLinks": []
    }


      
    const getUserProfile = async (userData) => {
         
          // Make the GET request to fetch user profile data
          try{
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile/${userData?.data.user.user_id}`,
              {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${userData?.data?.access_token}`
                }
              }
            );
        
            // Print the response data
            // console.log(response.data.data );
            SetPersonalInformation(  response.data.data.payload.personalInformation);
            setEducations(response.data.data.payload.educations);
            setExperiences(response.data.data.payload.experiences);
            setSkills(response.data.data.payload.skills);
            setLanguages(response.data.data.payload.languages);
            setHobbies(response.data.data.payload.hobbies);
            manageMore(response.data.data.payload.others)

          }catch(e){
            console.log(e);
          }
         
      };
      

    const [jobType, setJobType] = useState('');
    const [otherPreferences, setOtherPreferences] = useState('');
    const [salaryExpectation, setSalaryExpectation] = useState('');
    const [currency, setCurrency] = useState('BDT'); // Default currency is USD
    const [preferredIndustry, setPreferredIndustry] = useState('');
    const [availability, setAvailability] = useState('');
    const [personalInformation, SetPersonalInformation] = useState(pdata);
    const [experiences, setExperiences] = useState([]);
    const [educations, setEducations] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [skills, setSkills] = useState([]);
    const [hobbies, setHobbies] = useState([])
    const [more, manageMore] = useState([]);
    const [userProfileData, setUserProfileData] = useState({ status: 'in-progress' });
    const [avatar, setAvatar] = useState(null);
    const [selectedAvatar, selectAvatar] = useState(null);

    const saveProfile = useCallback(
        async () => {
            console.log(userProfileData);
          try {
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile/update/${userData?.data.user.user_id}`,
              {
                payload: userProfileData,
                "_method" : "PUT"
              },
              {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${userData?.data?.access_token}`
                }
              }
            );
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Profile updated successfull!",
                showConfirmButton: false,
                timer: 1500,
              });
            console.log('Response:', response.data);
          } catch (error) {
            console.error('Error saving profile:', error);
            // Optionally, you can set an error state here if you want to display the error to the user
            // setError(error.message);
          }
        },
        [userProfileData, userData]
      );
    // update resume data
    useEffect(() => {
        setUserProfileData(prev => ({ ...prev, educations: educations }))
    }, [educations])

    useEffect(() => {
        setUserProfileData(prev => ({ ...prev, experiences: experiences }))
    }, [experiences])

    useEffect(() => {
        setUserProfileData(prev => ({ ...prev, skills: skills }))
    }, [skills])

    useEffect(() => {
        setUserProfileData(prev => ({ ...prev, languages: languages }))
    }, [languages])

    useEffect(() => {
        setUserProfileData(prev => ({ ...prev, hobbies: hobbies }))
    }, [hobbies])

    useEffect(() => {
        setUserProfileData(prev => ({ ...prev, personalInformation: personalInformation }))
         
    }, [personalInformation])

    useEffect(() => {
        setUserProfileData(prev => ({ ...prev, others: more, status: 'done' }))
    }, [more])

    useEffect(()=>{
        setUserProfileData(prev => ({ ...prev,  avata : selectedAvatar }))
    },[selectedAvatar])

    useEffect(()=>{
          // Call the function to get and print user profile
          getUserProfile(userData);

    },[userData])



    return (
        <userProfileContext.Provider value={{
           personalInformation, SetPersonalInformation, 
            experiences, setExperiences,
            educations, setEducations, 
            languages, setLanguages, 
            skills, setSkills,
            hobbies, setHobbies, 
            more, manageMore,
            jobType, setJobType, 
            otherPreferences, setOtherPreferences, 
            salaryExpectation, setSalaryExpectation, 
            currency, setCurrency, 
            preferredIndustry, setPreferredIndustry, 
            availability, setAvailability,
            userProfileData, setUserProfileData,
            avatar, setAvatar,
            selectedAvatar, selectAvatar,
            saveProfile
        }}>
            {children}
        </userProfileContext.Provider>
    )
}

export default UserProfileContext
