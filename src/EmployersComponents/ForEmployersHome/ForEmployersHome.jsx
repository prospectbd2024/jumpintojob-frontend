import React from 'react';
import ForEmployersBanner from './ForEmployersBanner/ForEmployersBanner';
import ForEmployersProcess from './ForEmployersProcess/ForEmployersProcess';
import ForEmployersLiveData from './ForEmployersLiveData/ForEmployersLiveData';
import ForEmployersWhyUs from './ForEmployersWhyUs/ForEmployersWhyUs';
import ForEmployersJobBanner from './ForEmployersJobBanner/ForEmployersJobBanner';

const ForEmployersHome = () => {
    return (
        <div className="bg-gray-50">
            <ForEmployersBanner />
            <ForEmployersLiveData />
            <div className="py-16 sm:py-24">
                <ForEmployersProcess />
            </div>
            <div className="bg-white py-16 sm:py-24">
                <ForEmployersWhyUs />
            </div>
            <ForEmployersJobBanner />
        </div>
    );
};

export default ForEmployersHome;