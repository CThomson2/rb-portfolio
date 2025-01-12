/**
 * Experience Component
 *
 * A responsive component that displays inventory management options as interactive cards.
 * Each card can be clicked to toggle between a preview state (showing an image and description)
 * and an expanded state (showing a list of actions/options).
 *
 * Key Features:
 * - Dynamic height adjustment for consistent card sizing
 * - Smooth transitions between preview/expanded states
 * - Responsive layout with grid system
 * - Animated text header
 * - Moving border animation on cards
 */

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

import { workExperience } from "@/content/main";
import { Button } from "../ui/MovingBorders";
import { TextGenerateEffect } from "../ui/TextGenerateEffect";

import styles from "./grid.module.css";

const Experience = () => {
  // Track which card is currently expanded (null if none)
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  // Maintain consistent height across all cards based on tallest content
  const [maxHeight, setMaxHeight] = useState<number>(300);

  // Array of refs to access card DOM elements for height calculations
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // console.log("workExperience:", workExperience);
  console.log("cardRefs:", cardRefs);

  /**
   * Handles card click events
   * Toggles the active state of the clicked card:
   * - If clicking the active card, deactivates it
   * - If clicking an inactive card, makes it active
   */
  const handleCardClick = (id: number) => {
    setActiveCardId((prevId) => (prevId === id ? null : id));
  };

  const handleMouseLeave = () => {
    setActiveCardId(null);
  };

  /**
   * Effect hook to update maxHeight whenever a card's active state changes
   * This ensures all cards maintain the same height as the tallest card,
   * preventing layout shifts when expanding/collapsing content
   */
  useEffect(() => {
    console.log("useEffect triggered. activeCardId:", activeCardId);
    // Get array of card heights by mapping over refs and accessing offsetHeight, defaulting to 0 if card ref is null
    console.log("cardRefs.current:", cardRefs.current);
    const heights = cardRefs.current.map((card) => card?.offsetHeight || 0);
    console.log("Card heights:", heights);
    // const newMaxHeight = Math.max(...heights);
    // console.log("New maxHeight:", newMaxHeight);
    setMaxHeight(Math.max(...heights));
    console.log("\n\n");
  }, [activeCardId]);

  return (
    <div className="py-20 w-full">
      {/* Animated header with text generation effect */}
      <h1 className="heading">
        <TextGenerateEffect
          words="Inventory Management"
          className="text-center text-[30px] md:text-4xl xl:text-5xl"
        />
      </h1>

      {/* Responsive grid layout for cards */}
      <div className={`w-full mt-12 grid grid-cols-1 xl:grid-cols-4 gap-10`}>
        {/* Map through work experience data to create interactive cards */}
        {workExperience.map((card, index) => (
          <Button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            onMouseLeave={handleMouseLeave}
            duration={Math.floor(Math.random() * 10000) + 10000}
            borderRadius="1.75rem"
            style={{
              height: maxHeight,
              background: "rgb(4,7,29)",
              backgroundColor:
                "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
              borderRadius: `calc(1.75rem* 0.96)`,
            }}
            className={`${styles.card} flex-1 text-black dark:text-white border border-neutral-200 dark:border-slate-700 transform transition-all duration-300 hover:scale-[0.98] hover:shadow-[0_0_10px_rgba(255,255,255,1)] hover:border-white hover:bg-slate-900/90 focus:outline-none focus:ring-4 focus:ring-purple-500`}
            ref={(el: HTMLDivElement | null) => {
              if (el) {
                cardRefs.current[index] = el;
              }
            }}
          >
            {/* Card content container with responsive layout */}
            <div
              className={`flex xl:flex-row flex-col w-full xl:items-center p-2 py-6 gap-2`}
            >
              {/* Show thumbnail only in preview state and on xl screens */}
              {activeCardId !== card.id && (
                <Image
                  src={card.thumbnail}
                  alt={card.thumbnail}
                  width={128}
                  height={128}
                  className="hidden xl:block xl:w-32"
                />
              )}
              {/* Card text content with conditional rendering based on active state */}
              <div className="min-w-[300px] w-full xl:m-1 h-full flex flex-col justify-center overflow-hidden">
                <h1 className="text-center text-xl md:text-2xl font-bold">
                  {card.title}
                </h1>
                {activeCardId === card.id ? (
                  // Expanded state: show action items list
                  <ul
                    className={`text-start text-white-100 mt-3 font-semibold ${styles["card-links"]}`}
                  >
                    {card.content.map((item) => (
                      <li key={item.id} className="my-2 h-8">
                        <item.icon className="mr-2" />
                        {item.description}
                      </li>
                    ))}
                  </ul>
                ) : (
                  // Preview state: show description
                  <p className="text-start text-white-100 mt-3 font-semibold">
                    {card.description}
                  </p>
                )}
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Experience;

/* Card Component renders on active, i.e. when the card is clicked */
const Card = ({
  title,
  content,
  children,
}: {
  title: React.ReactNode;
  content: {
    id: number;
    description: string;
    link: string;
    icon: React.ElementType;
  }[];
  children?: React.ReactNode;
}) => {
  return <div></div>;
};
