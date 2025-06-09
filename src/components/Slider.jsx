/* eslint-disable no-unused-vars */
import { Splide, SplideSlide } from "@splidejs/react-splide";
export default function Slider({ slideContent, data, options = {} }) {
  const defaultOptions = {
    type: "loop",
    perPage: 5,
    perMove: 1,
    gap: "1rem",
    pagination: false,
    arrows: true,
    breakpoints: {
      640: { perPage: 1 },
      768: { perPage: 2 },
      1024: { perPage: 4 },
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    breakpoints: {
      ...defaultOptions.breakpoints,
      ...options?.breakpoints,
    },
  };
  return (
    <Splide options={mergedOptions}>
      {data?.map((item, index) => (
        <SplideSlide key={index}>{slideContent(item, index)}</SplideSlide>
      ))}
    </Splide>
  );
}
