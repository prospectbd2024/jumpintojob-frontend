"use client"
import React from 'react'
import { useCompanyContext } from '@/Contexts/CompanyContext';
import CompanyListView from '@/Components/Companies/CompanyListView';

function page() {
  const {companies} = useCompanyContext();
  return (
    <CompanyListView props={{companies}} />
  )
}

export default page