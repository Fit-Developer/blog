import { useState, useEffect } from "react";
export default function useFetch(url, method = "GET", value = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url, {
          method: method,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: method === "GET" ? null : JSON.stringify(value),
        });
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        // console.log({ error: error });
        setError(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []); // the empty array ensures that the effect only runs once
  return { data, error, loading };
  // code to come later
}
