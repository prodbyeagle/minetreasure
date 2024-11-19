import { useState, useEffect } from 'react';

interface GitHubData {
     repo_owner: string;
     repo_name: string;
     commit_sha: string;
     commit_ref: string;
     commit_msg: string;
}

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