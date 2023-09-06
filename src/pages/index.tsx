import React, { useEffect, useState } from 'react';
import { useFarmContext } from '@/context/FarmContext';
import FarmList from '@/components/FarmList';

const Home: React.FC = (initialFarms) => {
  const { farms } = useFarmContext();

  return (
    <div className='bg-white'>
      <div className='container md:w-[750px] mx-auto'>
        <p className='p-4 text-center text-4xl text-bold'>Farm List</p>
        <FarmList farms={farms} />
      </div>
    </div>
  );
};

export default Home;
