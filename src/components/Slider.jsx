/* eslint-disable no-unused-vars */
import { Splide, SplideSlide } from "@splidejs/react-splide";
export default function Slider({ slideContent, data, options = {} }) {
  const defaultOptions = {
    type: "loop",
    perPage: 4,
    perMove: 1,
    pagination: false,
    arrows: true,
    breakpoints: {
      450: {
        perPage: 1,
        focus: 0,
        gap: "1rem",
        padding: { right: "20%", left: "0" },
      },
      640: { perPage: 2, focus: "center" },
      768: {
        perPage: 2,
        focus: 0,
        gap: "1rem",
        padding: { right: "20%", left: "0" },
      },
      1024: {
        perPage: 3,
        focus: 0,
        gap: "1rem",
        padding: { right: "20%", left: "0" },
      },
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
