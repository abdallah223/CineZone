import { useEffect, useState } from "react";
import Slider from "../components/Slider";
import NoResults from "./NoResults/NoResults";
import DotsLoader from "./Loaders/DotsLoader";
export default function FetchedSlider({
  fetchFunction,
  endpoint,
  slideContent,
  options = {},
  param = [],
}) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchFunction(endpoint, ...param);
        setData(result || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, fetchFunction]);

  if (isLoading) {
    return <DotsLoader />;
  }

  if (!data || data.length === 0) {
    return <NoResults />;
  }

  return <Slider slideContent={slideContent} data={data} options={options} />;
}
