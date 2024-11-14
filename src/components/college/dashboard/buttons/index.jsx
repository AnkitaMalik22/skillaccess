import { React } from "react";
import { LuMoveRight } from "react-icons/lu";
import { useSwiper } from "swiper/react";

export default function SlideNextButton() {
  const swiper = useSwiper();

  return (
    <button
      onClick={() => swiper.slideNext()}
      className="bg-blued w-10 h-10  rounded-full"
    >
      <LuMoveRight className="mx-auto text-2xl text-white" />
    </button>
  );
}
