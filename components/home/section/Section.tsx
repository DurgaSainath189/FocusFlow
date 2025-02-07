"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { VideoContainer } from "../video/VideoContainer";
import Image from "next/image";
import { HomePageImage } from "@/types/extended";
import { ImagesCarousel } from "../carousel/ImagesCarousel";
import { useIsVisible } from "@/hooks/useIsVisible";

interface Props {
  reverse?: boolean;
  title: string;
  desc: string;
  images: HomePageImage[];
  id?: string;
}

export const Section = ({ reverse, title, desc, images, id }: Props) => {
  const { isVisible, ref } = useIsVisible();
  return (
    <section
      id={id}
      ref={ref}
      className={`mt-24 md:mt-52 lg:mt-80 flex flex-col justify-between items-center gap-6 md:gap-10 ${
        reverse ? "lg:flex-row" : "lg:flex-row-reverse"
      }`}
    >
      <div className="w-full lg:w-2/5 flex flex-col gap-1 sm:gap-4">
        <h2 className="font-semibold lg:text-4xl text-2xl sm:text-3xl">
          {title}
        </h2>
        <p className="lg:text-2xl text-base mt-8 sm:mt-4 sm:text-lg md:text-xl text-muted-foreground">
          {desc}
        </p>
      </div>
      <div className="w-full lg:w-3/5 relative isolate group">
        <ImagesCarousel images={images} />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-2xl sm:-top-72"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className={`relative left-1/2 aspect-[1155/678] w-[40rem] -translate-x-1/2 rotate-[25deg] bg-gradient-to-tr from-[#4eff5a] to-[#0a5f03] transition-opacity duration-500 sm:left-[calc(50%-20rem)] sm:w-[68rem] blur-xl group-hover:opacity-90 dark:group-hover:opacity-70 ${
              isVisible
                ? "opacity-90 dark:opacity-70"
                : "opacity-50 dark:opacity-40"
            }`}
          />
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-2xl sm:-top-72"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className={`relative left-1/2 aspect-[1155/678] w-[40rem] -translate-x-1/2 rotate-[25deg] bg-gradient-to-tr from-[#45cb43] to-[#187a04] transition-opacity duration-500 sm:left-[calc(50%-20rem)] sm:w-[68rem] blur-xl group-hover:opacity-90 dark:group-hover:opacity-70 ${
              isVisible
                ? "opacity-90 dark:opacity-70"
                : "opacity-50 dark:opacity-40"
            }`}
          />
        </div>
      </div>
    </section>
  );
};
