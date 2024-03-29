"use client"
import React, { useCallback, useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import  Link  from 'next/link';

const Companies = () => {

    const [companies, setCompanies] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All Industries');
    const [categories, setCategories ] = useState([]);
    const getCompanies = useCallback((id)=>{
        console.log(id);
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/companies`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
    });

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories`)
            .then(res => res.json())
            .then(data => {
                setCategories(data.data)
            })
            getCompanies(12);
    }, [selectedCategory])

    const handleCategoryChange = (event) => {
        setSelectedCategory(event)
    }
    console.log(selectedCategory)
    return (
        <div className='companies'>
            <div className="section-header companies-header">
                <h2>Browse For Companies</h2>
                <p>Lorem aliasg elit. Saepe, alias. Atqudolor?</p>
            </div>
            <div className="companies-content container">

                <Tabs className="companies-tabs">
                    <TabList className="companies-tablist">
                        <Tab onClick={() => handleCategoryChange('All Industries')} className={`${selectedCategory == 'All Industries' ? 'default-category' : ''}`}>All Industries</Tab>
                            {categories.map((category)=>{ 
                                return <Tab key={category.id} onClick={() => handleCategoryChange(category.id)} className={`${selectedCategory == category.id ? 'default-category' : ''}`}>{category.category_name}</Tab>
                            })}
                        <Tab onClick={() => handleCategoryChange('Other')} className={`${selectedCategory == 'Other' ? 'default-category' : ''}`}>Other</Tab>
                    </TabList>
                    <TabPanel className="companies-tabs-content">
                            {
                                companies.map(company => <div key={company.id} className='company-item'>
                                    <div className="company-item-content">
                                        <div className="company-item-content-banner">
                                            <img src={company.company_banner} alt="" />
                                        </div>
                                        <div className="company-item-content-main">
                                            <div className='main-items'>
                                                <img src={company.company_logo} alt="" />
                                                <div>
                                                    <Link href={""}><h3>{company.company_name}</h3></Link>
                                                    <p>Verified Profile</p>
                                                </div>
                                            </div>
                                            <div className='main-items'>
                                                <p>{company.company_category}</p>
                                                <p>Company Size: {company.company_size}</p>
                                            </div>
                                            <div className='main-items'>
                                                <p className='company_description'>{company.company_description.slice(0, 140)}...</p>
                                            </div>
                                            <div className="company-item-content-footer">
                                                <Link href={""}><button className='company-button company-details-button'>View Details</button></Link>
                                                <Link href={""}><button className='company-button company-jobs-button'>View Jobs</button></Link>

                                            </div>
                                        </div>

                                    </div>
                                </div>)
                            }
                        </TabPanel>
                        {categories.map((category)=>
                        <TabPanel className="companies-tabs-content" id={`${category.id}`}>
                            {
                                companies.map(company => <div key={`${company.id}`} className='company-item'>
                                    <div className="company-item-content">
                                        <div className="company-item-content-banner">
                                            <img src={company.company_banner} alt="" />
                                        </div>
                                        <div className="company-item-content-main">
                                            <div className='main-items'>
                                                <img src={company.company_logo} alt="" />
                                                <div>
                                                    <Link href={""}><h3>{company.company_name}</h3></Link>
                                                    <p>Verified Profile</p>
                                                </div>
                                            </div>
                                            <div className='main-items'>
                                                <p>{company.company_category}</p>
                                                <p>Company Size: {company.company_size}</p>
                                            </div>
                                            <div className='main-items'>
                                                <p className='company_description'>{company.company_description.slice(0, 140)}...</p>
                                            </div>
                                            <div className="company-item-content-footer">
                                                <Link href={""}><button className='company-button company-details-button'>View Details</button></Link>
                                                <Link href={""}><button className='company-button company-jobs-button'>View Jobs</button></Link>

                                            </div>
                                        </div>

                                    </div>
                                </div>)
                            }
                        </TabPanel>
                        )}
                                                <TabPanel className="companies-tabs-content">
                            {
                                companies.map(company => <div key={company.id} className='company-item'>
                                    <div className="company-item-content">
                                        <div className="company-item-content-banner">
                                            <img src={company.company_banner} alt="" />
                                        </div>
                                        <div className="company-item-content-main">
                                            <div className='main-items'>
                                                <img src={company.company_logo} alt="" />
                                                <div>
                                                    <Link href={""}><h3>{company.company_name}</h3></Link>
                                                    <p>Verified Profile</p>
                                                </div>
                                            </div>
                                            <div className='main-items'>
                                                <p>{company.company_category}</p>
                                                <p>Company Size: {company.company_size}</p>
                                            </div>
                                            <div className='main-items'>
                                                <p className='company_description'>{company.company_description.slice(0, 140)}...</p>
                                            </div>
                                            <div className="company-item-content-footer">
                                                <Link href={""}><button className='company-button company-details-button'>View Details</button></Link>
                                                <Link href={""}><button className='company-button company-jobs-button'>View Jobs</button></Link>

                                            </div>
                                        </div>

                                    </div>
                                </div>)
                            }
                        </TabPanel>

                </Tabs>

            </div>
        </div>
    );
};

export default Companies;