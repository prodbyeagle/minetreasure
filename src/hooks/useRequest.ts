import { useState, useEffect } from 'react';
import type { GitHubData } from '@/types/types';

/**
 * A hook to perform a GET request to the specified URL.
 * @param url The URL to fetch.
 * @returns An array with the first element being the data returned from the fetch,
 * or null, and the second element being a boolean indicating whether the fetch has completed.
 */
const useRequest = (url: string): [GitHubData | null, boolean] => {
     const [data, setData] = useState<GitHubData | null>(null);
     const [loaded, setLoaded] = useState(false);

     useEffect(() => {
          const fetchData = async () => {
               try {
                    const response = await fetch(url);
                    if (!response.ok) {
                         throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const jsonData = await response.json();
                    setData(jsonData);
                    setLoaded(true);
               } catch (error) {
                    console.error('Error fetching data:', error);
                    setData(null);
                    setLoaded(true);
               }
          };

          fetchData();
     }, [url]);

     return [data, loaded];
};

export default useRequest;