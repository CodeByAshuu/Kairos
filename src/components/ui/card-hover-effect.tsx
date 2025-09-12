import { cn } from "../../lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { Card, CardTitle, CardDescription } from "./card";

import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          href={item?.link}
          key={item?.link}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-muted dark:bg-muted block rounded-3xl shadow-2xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card className="rounded-2xl h-full w-full p-4 overflow-hidden bg-card border border-border group-hover:border-muted-foreground relative z-20">
            <div className="relative z-50">
              <div className="p-4">
                <CardTitle className="text-foreground font-bold tracking-wide mt-4">{item.title}</CardTitle>
                <CardDescription className="mt-8 text-muted-foreground tracking-wide leading-relaxed text-sm">{item.description}</CardDescription>
              </div>
            </div>
          </Card>
        </a>
      ))}
    </div>
  );
};