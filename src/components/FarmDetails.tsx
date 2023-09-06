import React from 'react';
import Farm from '../types';
import GoogleMapReact from 'google-map-react';
import CustomMap from './CustomMap';
import { useRouter } from 'next/router';

interface FarmDetailsProps {
  farm: Farm | null;
}

const FarmDetails: React.FC<FarmDetailsProps> = ({ farm }) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back(); // This function navigates back to the previous page.
  };

  const managementAreasGeoJSON = JSON.parse(farm?.managementAreasGeoJSON);
  return (
    <div className='container md:w-[750px] mx-auto'>
      <div className='flex flex-col items-center m-4'>
        <div className='w-full p-4'>
          <p className='text-4xl text-bold'>Project {managementAreasGeoJSON[0]['properties']['projID']}</p>
        </div>
        <div className='w-full h-[300px] p-4'>
          <CustomMap farm={farm} options={{ zoom: 14, zoomControl: true, showMarker: true }} />
        </div>
        <div className='w-full p-4'>
          <p>
            <span>Project ID : </span>
            <br />
            <span className='font-bold'>{managementAreasGeoJSON[0]['properties']['projID']}</span>
          </p>
          {
            managementAreasGeoJSON[0]['properties']['Region'] &&
            <p>
              <span>Region : </span>
              <br />
              <span className='font-bold'>{managementAreasGeoJSON[0]['properties']['Region']}</span>
            </p>
          }
        </div>
        <div className='w-full p-4 bottom-0'>
          <button className='rounded-md bg-indigo-500 text-white px-2 py-1' onClick={handleGoBack}>Go Back</button>
        </div>
      </div>
    </div>
  );
};

export default FarmDetails;
