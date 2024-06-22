import React, { useEffect, useState } from 'react';
import './FeaturedCompanies.css'
import Link from 'next/link';
import { useCompanyContext } from '@/Contexts/CompanyContext';
import CompanyCard from '@/Components/Companies/CompanyCard';
import CompanyListView from '@/Components/Companies/CompanyListView';

const FeaturedCompanies = () => {

    const {companies } = useCompanyContext();

    return (
        <div className='featured-company-section'>
            <div className="featured-company-content container companies-tabs-content">
                <div className="featured-companies-header section-header">
                    <h2>Featured companies on Jump Into Job</h2>
                </div>
                {companies.length > 0 ?
                    <div>
                        <div className="featured-company-content-items">
                            {
                                companies?.slice(0, 6).map((company,index) => <>
                                     <CompanyCard key={index}  props={{company}} />
                                </>)
                            }
                            
                        </div>
                        <div className="featured-companies-showmore">
                            <Link href="/companies"><button>Show More Companies</button></Link>
                        </div>
                    </div>
                    :
                    <div className='no-jobs-available'>
                        <h4 className=''>No Company Available</h4>
                    </div>
                }
            </div>
        </div>
    );
};

export default FeaturedCompanies;