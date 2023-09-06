import React from 'react';
import Farm from '../types';
import CustomMap from './CustomMap';
import Link from 'next/link';

interface FarmListProps {
  farms: Farm[];
}

const FarmList: React.FC<FarmListProps> = ({ farms }) => {
  const openWebsite = (url: string) => {
    alert('open a new link : ' + url);
    // window.open(url, '_blank');
  }
  return (
    <div>
      {
        farms.map((farm) => (
          <div key={farm.id} className='flex flex-col md:flex-row items-center m-4 border-b-2'>
            <div className='w-full md:w-1/2 lg:w-1/4 mx-4' style={{ height: '150px', width: '200px' }}>
              <CustomMap farm={farm} options={{ zoom: 12 }} />
            </div>
            <div className='w-full md:w-1/2 lg:w-3/4 p-4 farm-content'>
              <p className='text-xl font-bold'>
                <span className="material-icons text-indigo-500">home</span>
                <span>{farm.name}</span>
              </p>
              <p>
                <span className="material-icons text-indigo-500">place</span>
                <span>{farm.address}</span>
              </p>
              <p>
                <span className="material-icons text-indigo-500">call</span>
                <span>{farm.phone}</span>
              </p>
              <p>
                <span className="material-icons text-indigo-500">email</span>
                <span>{farm.email}</span>
              </p>
              <p>
                <button className='rounded-md bg-indigo-500 text-white px-2 py-1' onClick={() => openWebsite(farm.website)}>Go to Website</button>
                <Link href={`/farm/${farm.id}`}>
                  <button className='rounded-md bg-white px-2 py-1 border-indigo-500 border-2 text-indigo-500'>View summary</button>
                </Link>
              </p>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default FarmList;
