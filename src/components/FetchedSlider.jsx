import { useEffect, useState } from "react";
import Slider from "../components/Slider";
import NoResults from "./NoResults";

export default function FetchedSlider({
  fetchFunction,
  endpoint,
  slideContent,
  options = {},
}) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchFunction(endpoint);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [endpoint, fetchFunction]);

  if (isLoading || !data || data.length === 0) {
    return <NoResults />;
  }

  return <Slider slideContent={slideContent} data={data} options={options} />;
}
