import { useState, useRef, useEffect, useCallback } from 'react';

export const useFetchApi = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError,setIsError] = useState(false);

  const fetchData = async () => {
    const api = 'https://api.openweathermap.org/data/2.5/weather?q=JOHOR&appid=db5e868c80035e683ce2af4d26f7ae2c';

    await fetch(api, { method: 'GET' })
    .then((res) => res.json())
    .then((data) => setData(data))
    .catch((error) => setIsError(error))
    .finally(() => setIsLoading(false));
  };


  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading, isError}
}

