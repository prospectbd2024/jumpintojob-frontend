"use client"
import React, { useState, useEffect } from 'react';
import styles from './ResumeBuilder.module.css';

const ResumeMainSkeleton = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
 
                <>
                    <div className={styles.header}>
                        <div className={styles.logo}></div>
                        <div className={styles.jobBoardButton}></div>
                    </div>
                    <div className={styles.stepIndicator}>
                        {[...Array(7)].map((_, index) => (
                            <div key={index} className={styles.step}>
                                <div className={styles.stepNumber}></div>
                                <div className={styles.stepLabel}></div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.templateSelection}>
                        <h2 className={styles.selectionTitle}></h2>
                        <div className={styles.templateGrid}>
                            {[...Array(4)].map((_, index) => (
                                <div key={index} className={styles.templateItem}>
                                    <div className={styles.templateImage}></div>
                                    <div className={styles.templateName}></div>
                                </div>
                            ))}
                        </div>
                        <div className={styles.nextButton}></div>
                    </div>
                </>
            
    );
};

export default ResumeMainSkeleton;