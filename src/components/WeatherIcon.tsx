import React from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";

type Props = {};

export const WeatherIcon = (
  props: React.HTMLProps<HTMLDivElement> & { iconName: string }
) => {
  return (
    <div {...props} className={cn("relative h-20 w-20")}>
      <Image
        src={`https://openweathermap.org/img/wn/${props?.iconName}@2x.png`}
        width={100}
        height={100}
        alt="weather-icon"
        className="absolute h-full w-full"
      />
    </div>
  );
};
