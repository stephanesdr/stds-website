import React, { useRef } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";

export const  StickyScroll = ({
  content,
}: {
  content: {
    school: string;
    city: string;
    certificate: string;
    note: string;
    yearStart: string;
    yearEnd: string;
  }[];
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    cardsBreakpoints.forEach((breakpoint, index) => {
      if (latest > breakpoint - 0.1 && latest <= breakpoint) {
        setActiveCard(() => index);
      }
    });
  });

  const backgroundColors = [
    "var(--neutral-800)",
    "var(--neutral-900)",
    "var(--neutral-950)",
    "var(--neutral-950)",
  ];
  const linearGradients = [
    // "linear-gradient(to bottom right, rgba(253,186,116,0.5), rgba(239,68,68,0.2))",
    "linear-gradient(to bottom right, rgba(240,171,252,0.7), rgba(239,68,68,0.4))",
    "linear-gradient(to bottom right, rgba(240,171,252,0.4), rgba(239,68,68,0.7))",
  ];
  return (
    <div className="flex flex-col w-full">
           
                {/* <h2 className="text-left font-sans text-base font-semibold p-8 text-black max-w-lg text-balance">3 university diplomas with honors in higher education and 2 professional training courses. +5 years of active experience in agency</h2> */}
         

        <motion.div
          animate={{
            // background: linearGradients[activeCard % linearGradients.length],
          }}
          transition={{
            ease: "linear",
            duration: .8
           }}
         className="w-full h-[27rem] md:h-[24rem] border border-[#F3F3F3] shadow   bg-gradient-to-bl bg-white  overflow-y-auto flex flex-row-reverse justify-end relative rounded-3xl overflow-hidden p-6 md:p-8 scrollbar-thin scrollbar-thumb-black scrollbar-track-orange-400  mb-4"
          ref={ref}
        >
        
          <div className="relative flex  items-start px-4">
            
            <div className="w-full">
              {content.map((item, index) => (
                <div key={item.school + index} className="mb-20">
                  <motion.h2
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: activeCard === index ? 1 : .2,
                    }}
                    className="text-black font-sans uppercase text-base font-semibold"
                  >
                    {item.school}
                  </motion.h2>
                  <motion.div
                    className="max-w-sm flex flex-col gap-1 text-black font-semibold space-y-4"
                    initial={{
                    opacity: 0,
                      }}
                      animate={{
                    opacity: activeCard === index ? 1 : .2,
                     }}
                  >
                      <p className="font-serif text-sm">{item.city}</p>
                        <span className="text-black font-serif uppercase text-sm md:hidden">
                          {item.yearStart} {item.yearEnd}
                        </span>
                      <p className="font-sans text-base">{item.certificate} <br />{item.note} </p>
                  </motion.div>
                </div>
              ))}
              <div className="h-10" />
            </div>
          </div>
          <motion.div
            // animate={{
            //   background: linearGradients[activeCard % linearGradients.length],
            // }}
            className="hidden lg:block h-60 w-56 rounded-md bg-transparent sticky top-0 overflow-hidden"
          >
          <div className="relative flex items-start px-4">
            <div className="w-full">
              {content.map((item, index) => (
                <div key={item.school + index} className="absolute top-0 left-0">
                  <motion.h2
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: activeCard === index ? 1 : 0,
                    }}
                    className="text-black font-serif uppercase text-lg"
                  >
                    {item.yearStart} <br />
                    {item.yearEnd}
                  </motion.h2>
        
                </div>
              ))}
              <div className="h-10" />
            </div>
          </div>
          </motion.div>
        </motion.div>
    </div>
  );
};
