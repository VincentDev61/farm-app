import { FarmProvider } from '@/context/FarmContext'
import { useEffect, useState } from 'react';
import { fetchData } from '@/api';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  const [farms, setFarms] = useState<any>([]);

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const data = await fetchData();
        setFarms(data);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    fetchFarms();
  }, []);
  return (
    <FarmProvider initialFarms={farms}>
      <Component {...pageProps} initialFarms={farms} />
    </FarmProvider>
  )
}
