import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuthors = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const { data } = await axios.get('/api/authors');
        setAuthors(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  return { authors, loading, error };
};

export default useAuthors;