'use client';
import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const rows = new Array(150).fill(1);
  const cols = new Array(100).fill(1);
  let colors = [
    // "#FF00F0",
    "#FFFFFF",

  ];
  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div
      style={{
        transform: `translate(-42%,-80%) scale(1.8) rotate(0) translateZ(0)`,
      }}
      className={cn(
        "absolute flex w-full h-full z-0 ",
        className
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row` + i}
          className="w-10 h-10 rounded-full relative"
        >
          {cols.map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: `var(${getRandomColor()})`,
                transition: { duration: 0 },
              }}
              animate={{
                transition: { duration: 0 },
              }}
              key={`col` + j}
              className="w-8 h-8 rounded-none relative"
            >
              {/* {j % 0.5 === 0 && i % 0.5 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="0.2"
                  stroke="gray"
                  className="absolute h-4 w-20 -top-[14px] -left-[22px] text-black  pointer-events-none"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              ) : null} */}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
