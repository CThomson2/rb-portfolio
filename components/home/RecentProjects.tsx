"use client";

import { FaLocationArrow } from "react-icons/fa6";
import Image from "next/image";
import { projects } from "@/content/main";
import { PinContainer } from "../ui/Pin";

const QueryForms = () => {
  return (
    <div className="py-20">
      <h1 className="heading">
        All of your paperwork{" "}
        <span className="text-[#78c4ff]">in one place</span>
      </h1>
      <div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-10">
        {projects.map((item) => (
          <div
            className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw]"
            key={item.id}
          >
            <PinContainer
              title="/ui.aceternity.com"
              href="https://twitter.com/mannupaaji"
            >
              <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[20vh] lg:h-[30vh] mb-10">
                <div
                  className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                  style={{ backgroundColor: "#13162D" }}
                >
                  <Image
                    src="/bg.png"
                    alt="Background image"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="z-10 absolute bottom-0">
                  <Image
                    src={item.img}
                    alt={`Project ${item.id} cover`}
                    width={100}
                    height={100}
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                {item.title}
              </h1>

              <p
                className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2 text-[#BEC1DD] my-[1vh]"
                style={{
                  margin: "1vh 0",
                }}
              >
                {item.description}
              </p>

              <div className="flex items-center justify-between mt-7 mb-3">
                <div className="flex items-center">
                  {item.iconLists.map((icon, index) => (
                    <div
                      key={index}
                      className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                      style={{
                        transform: `translateX(-${5 * index + 2}px)`,
                      }}
                    >
                      <Image
                        src={icon}
                        alt="icon5"
                        className="p-2"
                        width={40}
                        height={40}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-center items-center">
                  <p className="flex lg:text-xl md:text-xs text-sm text-purple">
                    Check Live Site
                  </p>
                  <FaLocationArrow className="ms-3" color="#CBACF9" />
                </div>
              </div>
            </PinContainer>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QueryForms;
