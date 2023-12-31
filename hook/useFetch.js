import { useState, useEffect } from "react";
import axios from "axios";


const useFetch = (endpoint, query) => {
  // const rapidApiKey = process.env.RAPID_API_KEY
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: { ...query },
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      setData(response.data.data);
      console.log(response.data);
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(false);
    fetchData();
  }

  return { data, isLoading, error, refetch };
}
export default useFetch;




