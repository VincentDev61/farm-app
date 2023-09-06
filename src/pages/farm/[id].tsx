// pages/farm/[id].tsx
import React from 'react';
import { useRouter } from 'next/router';
import { farmsData } from '../../data';
import FarmDetails from '../../components/FarmDetails';
import { useFarmContext } from '@/context/FarmContext';

const FarmPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const context = useFarmContext();

  const farm = context.farms.find((farm) => farm.id === parseInt(id as string));
  return (
    <div>
      {farm ? <FarmDetails farm={farm} /> : <p>Farm not found.</p>}
    </div>
  );
};

export default FarmPage;
