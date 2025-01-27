"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    links: {
      id: number;
      name: string;
      link: string;
    }[];
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        // also set true for the initial state
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  const handleNavItemClick = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <div className="fixed z-[5000] top-0 inset-x-0 w-full">
      <AnimatePresence mode="wait">
        <motion.div
          initial={{
            opacity: 1,
            y: -100,
          }}
          animate={{
            y: visible ? 0 : -100,
            opacity: visible ? 1 : 0,
          }}
          transition={{
            duration: 0.2,
          }}
          className={cn(
            "flex max-w-fit md:min-w-[70vw] lg:min-w-fit mx-auto mt-10 px-10 py-5 rounded-lg items-center justify-center space-x-4",
            className
          )}
          style={{
            backdropFilter: "blur(16px) saturate(180%)",
            backgroundColor: "rgba(17, 25, 40, 0.75)",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.125)",
          }}
        >
          {navItems.map((navItem: any, idx: number) => (
            <div key={`nav-item-${idx}`} className="relative">
              <button
                onClick={() => handleNavItemClick(navItem.name)}
                className={cn(
                  "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
                )}
              >
                <span className="block sm:hidden">{navItem.icon}</span>
                <span className="text-sm !cursor-pointer">{navItem.name}</span>
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {activeDropdown === navItem.name && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5"
                  >
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                    >
                      {navItem.links.map((link: any, id: number) => (
                        <a
                          key={id}
                          href={link.link}
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                          role="menuitem"
                        >
                          {link.name}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
