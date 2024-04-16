"use client"
import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../UserContext/UserContext';
import { FaUserCircle } from "react-icons/fa";

const AboutMe = () => {
    const { userData,profile,setProfile } = useUserContext();

    const [avatar, setAvatar] = useState(null);
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [country, setCountry] = useState('');
    const [city, setCity] = useState(''); 
    const [state, setState] = useState(''); 
    const [street, setStreet] = useState(''); 
    const [postal_code, setPostalCode] = useState('');  
    


    const handleUpdateUserProfile = async (event) => {
        event.preventDefault()
        const updateUserProfile =new FormData();
        // updateUserProfile.append('avatar', avatar)
        updateUserProfile.append('country', country);
        updateUserProfile.append('city', city);
        updateUserProfile.append('state', state);
        updateUserProfile.append('street', street);
        updateUserProfile.append('postal_code', postal_code);
        updateUserProfile.append('_method', 'PUT');
        
        console.log(updateUserProfile);
        const userProfileResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/update`, {
            method: 'POST',
            headers: {

                'Conte-Type': 'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': `Bearer ${userData?.data?.access_token}`
            },
            body: updateUserProfile
        })
    
        const updatedData = await userProfileResponse.json();
        if (updatedData) {
            console.log("Data is updated", updatedData);

            setProfile(updatedData?.user)
           
        } else {
            console.log("Something is wrong with updating your data", updatedData)
        }
    }



    useEffect(()=>{
        setAvatar(profile?.avatar)
        setCity(profile?.city)
        setCountry(profile?.country)
        setFirstName(profile?.first_name)
        setLastName(profile?.last_name)
        setPostalCode(profile?.postal_code)
        setState(profile?.state)
        setStreet(profile?.street)
        console.log(profile);

    },[profile])

    return (
        <div className='user-profile-about-me'>
            <h2>Contact Information</h2>
            <form action="" >
                <div className="about-me-personal">
                    <div className='about-me-personal-header'>
                        <FaUserCircle/>
                        
                        <div>
                            <h4 suppressHydrationWarning={true}>{profile?.email}</h4>
                            <p>{profile?.user_type}</p>
                        </div>
                    </div>
                    <div className='about-me-inputs'>
                        <label htmlFor="first_name">First Name</label>
                        <input type="text" placeholder='Your First Name' id="first_name" name="firstName" value={first_name} readOnly />
                    </div>
                    <div className='about-me-inputs'>
                        <label htmlFor="last_name">Last Name</label>
                        <input type="text" placeholder='Your Last Name' id="last_name" name="lastName" value={last_name} readOnly />
                    </div>
                </div>
                <div className="about-me-address">
                    <h3>Location</h3>
                    <div className='about-me-inputs'>
                        <label htmlFor="countryid">Country</label>
                        <input type="text" placeholder='Your Country' id="countryid" name="country" value={country} onChange={(e) => setCountry(e.target.value)} />
                    </div>
                    <div className='about-me-inputs'>
                        <label htmlFor="streetid">Stress Address</label>
                        <input type="text" placeholder='Your Street Address' id="streetid" value={ street} name="street" onChange={(e) => setStreet(e.target.value)} />
                    </div>
                    <div className='about-me-inputs'>
                        <label htmlFor="cityid">City</label>
                        <input type="text" placeholder='Your City' id="cityid" name="city" value={ city} onChange={(e) => setCity(e.target.value)} />
                    </div>
                    <div className='about-me-inputs'>
                        <label htmlFor="stateid">State</label>
                        <input type="text" placeholder='Your State' id="stateid" name="state" value={ state} onChange={(e) => setState(e.target.value)} />
                    </div>
                    <div className='about-me-inputs'>
                        <label htmlFor="postal">Postal Code</label>
                        <input type="text" placeholder='Your Postal Code' id="postal" value={ postal_code} name="postal_code" onChange={(e) => setPostalCode(e.target.value)} />
                    </div>
                    <input type="button" value="save"   className='save-user-info-btn' onClick={handleUpdateUserProfile} />
                </div>
            </form>
        </div>
    );
};

export default AboutMe;