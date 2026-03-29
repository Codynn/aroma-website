"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
  const value = props.value || props.defaultValue || [0, 0];
  
  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center py-4",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-[#7D8F7B]/20">
        <SliderPrimitive.Range className="absolute h-full bg-[#77923B]" />
      </SliderPrimitive.Track>
      
      {/* Handle 1 */}
      <SliderPrimitive.Thumb asChild>
        <motion.div
          whileTap={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="block h-6 w-6 rounded-full border-2 border-[#77923B] bg-white shadow-lg cursor-grab active:cursor-grabbing focus:outline-none"
        />
      </SliderPrimitive.Thumb>

      {/* Handle 2 */}
      <SliderPrimitive.Thumb asChild>
        <motion.div
          whileTap={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="block h-6 w-6 rounded-full border-2 border-[#77923B] bg-white shadow-lg cursor-grab active:cursor-grabbing focus:outline-none"
        />
      </SliderPrimitive.Thumb>
    </SliderPrimitive.Root>
  )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }