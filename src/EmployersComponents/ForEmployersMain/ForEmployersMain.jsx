import React from 'react';
import ForEmployersHeader from '../ForEmployersLayout/ForEmployersHeader/ForEmployersHeader';
import ForEmployersFooter from '../ForEmployersLayout/ForEmployersFooter/ForEmployersFooter';
import ForEmployersHome from '../ForEmployersHome/ForEmployersHome';
import Footer from '@/Layout/Footer/Footer';


const ForEmployersMain = ({children}) => {
    return (
        <div>
            <ForEmployersHeader/>
            <>{children}</>
            <Footer/>
            
        </div>
    );
};

export default ForEmployersMain;