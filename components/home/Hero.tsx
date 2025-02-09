import { FaLocationArrow } from "react-icons/fa6";
import Link from "next/link";

import MagicButton from "./MagicButton";
import { Spotlight } from "../ui/Spotlight";
import { TextGenerateEffect } from "../ui/TextGenerateEffect";

const Hero = () => {
  return (
    <div className="pb-20 pt-36">
      {/**
       *  UI: Spotlights
       *  Link: https://ui.aceternity.com/components/spotlight
       *
       *  Spotlight positioning:
       *  - First spotlight: Positioned top-left, full screen height
       *    - Mobile: -40px from top, -10px from left
       *    - Desktop: -20px from top, -32px from left
       *
       *  - Second spotlight: Positioned right side
       *    - 80% viewport height, 50% viewport width
       *    - 10px from top, aligned to right edge
       *
       *  - Third spotlight: Positioned center-left
       *    - 80% viewport height, 50% viewport width
       *    - 28px from top, 80px from left
       */}
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="purple"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      {/**
       *  UI: grid
       *  change bg color to bg-black-100 and reduce grid color from
       *  0.2 to 0.03
       */}
      <div
        className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]
       absolute top-0 left-0 flex items-center justify-center"
      >
        {/* Radial gradient for the container to give a faded look */}
        <div
          // chnage the bg to bg-black-100, so it matches the bg color and will blend in
          className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
         bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      </div>

      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <p className="uppercase tracking-widest text-xs text-center text-slate-300 max-w-100">
            Supplying Scientific Endeavours{" "}
            <span className="font-bold text-slate-100">since 1974 </span>
          </p>

          {/**
           *  Link: https://ui.aceternity.com/components/text-generate-effect
           *
           *  change md:text-6xl, add more responsive code
           */}
          <TextGenerateEffect
            words="UK Manufacturer of Ultra High Purity Solvents and Reagents"
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
          />

          <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
            {/* Hi! I&apos;m Adrian, a Next.js Developer based in Croatia. */}
            Rathburn Chemicals is a family-owned company specialising in the
            production of high quality solvents for your industrial and
            analytical needs.
          </p>

          <Link href="/products" aria-label="View product range">
            <MagicButton
              title="View product range"
              icon={<FaLocationArrow />}
              position="right"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
