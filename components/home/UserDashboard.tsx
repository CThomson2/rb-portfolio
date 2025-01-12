import React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "@/components/ui/CanvasRevealEffect";
import { userDashboard } from "@/content/main";
import styles from "./grid.module.css";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";
import { Spotlight } from "@/components/ui/Spotlight";
import Image from "next/image";

const DashboardGrid = () => {
  return (
    <section className="w-full py-20 relative" id="dashboard">
      <h1 className="heading">
        <TextGenerateEffect
          words="What would you like to do?"
          className="text-center text-[30px] md:text-4xl lg:text-5xl"
        />
        {/* What would <span className="text-purple">you</span> like to do? */}
      </h1>
      <Spotlight
        className="h-screen -top-80 -left-10 md:-left-32 md:-top-50"
        fill="white"
      />
      <Spotlight className="h-[80vh] w-[50vw] top-10 left-full" fill="purple" />
      <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
      {/* <div className="my-20 grid grid-cols-1 md:grid-cols-2 gap-4 w-full"> */}
      <div className={`my-20 ${styles.grid} w-full`}>
        {userDashboard.map((option) => (
          <Card
            key={option.id}
            title={<AceternityIcon option={option.title} />}
            content={option.content}
            thumbnail={option.thumbnail}
            // link={option.link}
          >
            <CanvasRevealEffect
              animationSpeed={option.animationSpeed}
              containerClassName={`${option.bgColor} rounded-3xl overflow-hidden`}
              colors={option.colors || [[125, 211, 252]]}
              dotSize={option.dotSize || 2}
            />
          </Card>
        ))}
      </div>
    </section>
  );
};

export default DashboardGrid;

// className={`${styles.card} group/canvas-card flex items-center justify-center w-full
// mx-auto p-4 relative h-[25rem] rounded-3xl`}
// // style={{
// //   background: "rgb(4,7,29)",
// //   backgroundColor:
// //     "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
// //   width: "100%",
// // }}

const Card = ({
  title,
  content,
  thumbnail,
  children,
}: {
  title: React.ReactNode;
  content: {
    id: number;
    description: string;
    link: string;
    icon: React.ElementType;
  }[];
  thumbnail: string;
  children?: React.ReactNode;
}) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`${styles.card} border border-black/[0.2] group/canvas-card flex items-center justify-center
       dark:border-white/[0.2] w-full mx-auto p-4 relative h-[25rem] rounded-3xl`}
      // className={`${styles.card} group/canvas-card flex items-center justify-center w-full mx-auto p-4 relative h-[25rem] rounded-3xl`}
      // style={{
      //   background: "rgb(4,7,29)",
      //   backgroundColor:
      //     "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      //   width: "100%",
      // }}
    >
      <Icon className="absolute h-10 w-10 -top-3 -left-3 dark:text-white text-black opacity-30" />
      <Icon className="absolute h-10 w-10 -bottom-3 -left-3 dark:text-white text-black opacity-30" />
      <Icon className="absolute h-10 w-10 -top-3 -right-3 dark:text-white text-black opacity-30" />
      <Icon className="absolute h-10 w-10 -bottom-3 -right-3 dark:text-white text-black opacity-30" />

      {hovered && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0 flex flex-col justify-center items-center"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      )}

      <div className="flex lg:flex-col justify-center flex-col lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-2 elative z-20 px-10">
        <div
          className="text-center group-hover/canvas-card:-translate-y-4 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] 
          group-hover/canvas-card:opacity-0 transition duration-200 min-w-40 mx-auto flex items-center justify-center"
        >
          {title}
        </div>
        {/* <h2
            className="dark:text-white text-center text-3xl opacity-0 group-hover/canvas-card:opacity-100
         relative z-10 text-black mt-4  font-bold group-hover/canvas-card:text-white 
         group-hover/canvas-card:-translate-y-2 transition duration-200"
          >
            {title}
          </h2> */}
        {/* add this one for the description */}
        {hovered && (
          <>
            {/* <Image
              src={thumbnail}
              alt="Thumbnail"
              width={128}
              height={128}
              className="lg:w-32 md:w-20 w-16"
            /> */}
            <div
              className="text-3xl opacity-0 group-hover/canvas-card:opacity-100
         relative z-10 mt-2 group-hover/canvas-card:text-white text-center
         group-hover/canvas-card:-translate-y-2 transition duration-200 h-full"
              style={{ color: "#E4ECFF" }}
            >
              <ul className={`list-none flex flex-col ${styles["card-links"]}`}>
                {content.map((item) => (
                  <Link href={item.link} key={item.id}>
                    <li className="my-2 cursor-pointer transition-colors duration-200 flex-grow">
                      <item.icon className="mr-2" />
                      {item.description}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const AceternityIcon = ({ option }: { option: string }) => {
  return (
    <div>
      <button
        type="button"
        className="relative inline-flex overflow-hidden rounded-full p-[2px]"
      >
        <span
          className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite]
         bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
        />
        <span
          className="inline-flex h-full w-full min-w-60 cursor-pointer items-center 
        justify-center rounded-full bg-slate-950 px-10 py-4 text-purple backdrop-blur-3xl font-bold text-2xl"
        >
          {option}
        </span>
      </button>
    </div>
  );
};

export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
