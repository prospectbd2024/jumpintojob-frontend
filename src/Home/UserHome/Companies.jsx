import React from 'react'

import CompanyCard from '@/Components/Companies/CompanyCard';

function Companies({props}) {
    const {companies} = props;
  return (
    <div className="user-home-companies res-second-div">
    <h4>Featured Companies:</h4>
    {companies.length > 0 ?
        <div className='user-home-company'>
            {
                companies.slice(0, 3).map((company, index) =>  <CompanyCard props={{company , index}} />)

               
            }
        </div>
        :
        <div className=''>
            <h4 className=''>No Company Available</h4>
        </div>
    }
</div>
  )
}

export default Companies