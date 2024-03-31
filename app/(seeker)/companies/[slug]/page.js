"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link';
import { useUserContext } from '@/UserContext/UserContext';

function Page() {
    const { slug } = useParams();
    const [company, setCompany] = useState({});
    const UserContext = useUserContext();
    let bearerToken = '';
    useEffect(()=>{
        bearerToken = UserContext.userData.data.access_token;
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/company/show/${slug}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${bearerToken}`
            }
        })
        .then((resp)=> resp.json())
        .then((data)=> {
            setCompany(data.data)
        })
    },[])

    return (
        <div key={company.name} className="company-item">
            <div className="company-item-content">
                <div className="company-item-cover company-cover">
                    <img src={company.cover_image} alt="" className="company-cover-image" />
                </div>
                <div className="company-item-details">
                    <div className="company-logo company-logo-container">
                        <img src={company.logo} alt="" className="company-logo-image" />
                        <div className="company-info company-info-container">
                                <h3 className="company-title">{company.name}</h3>
                            <p className="company-status">Verified Profile</p>
                        </div>
                    </div>
                    <div className="company-category">
                        <p className="company-category-text">{company.category? company.category :''}</p>
                        {company.size && <p className="company-size">Company Size: {company.size}</p>}
                    </div>
                </div>
                <div className="company-description company-description-container">
                    <p className="company-description-text">{company.description ? company.description : ''}</p>
                </div>
            </div>
        </div>
    )
}

export default Page;
