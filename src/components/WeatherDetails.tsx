import React from "react";
import { FiDroplet } from "react-icons/fi";
import { ImMeter } from "react-icons/im";
import { LuEye, LuSunrise, LuSunset } from "react-icons/lu";
import { MdAir } from "react-icons/md";

type Props = {};

export enum WeatherDetailType {
  VISIBILITY = "Visibility",
  HUMIDITY = "Humidity",
  WIND_SPEED = "Wind Speed",
  AIR_PRESSURE = "Air Pressure",
  SUNRISE = "Sunrise",
  SUNSET = "Sunset",
}

export interface WeatherDetailProps {
  details: {
    [key in WeatherDetailType]?: string;
  };
}

const iconsMap = {
  [WeatherDetailType.VISIBILITY]: <LuEye />,
  [WeatherDetailType.HUMIDITY]: <FiDroplet />,
  [WeatherDetailType.WIND_SPEED]: <MdAir />,
  [WeatherDetailType.AIR_PRESSURE]: <ImMeter />,
  [WeatherDetailType.SUNRISE]: <LuSunrise />,
  [WeatherDetailType.SUNSET]: <LuSunset />,
};

const defaultValues = {
  [WeatherDetailType.VISIBILITY]: "100km",
  [WeatherDetailType.HUMIDITY]: "50%",
  [WeatherDetailType.WIND_SPEED]: "10km/h",
  [WeatherDetailType.AIR_PRESSURE]: "1013hPa",
  [WeatherDetailType.SUNRISE]: "6:00 AM",
  [WeatherDetailType.SUNSET]: "6:00 PM",
};

export default function WeatherDetails({ details }: WeatherDetailProps) {
  return (
    <>
      {Object.values(WeatherDetailType).map((info) => (
        <SingleWeatherDetail
          key={info}
          icon={iconsMap[info]}
          information={info}
          value={details[info] || defaultValues[info]}
        />
      ))}
    </>
  );
}

export interface SingleWeatherDetailProps {
  information: string;
  icon: React.ReactNode;
  value: string;
}

function SingleWeatherDetail({
  information,
  icon,
  value,
}: SingleWeatherDetailProps) {
  return (
    <div className="flex flex-col justify-between gap-2 items-center text-xs font-semibold text-black/80">
      <p className="whitespace-nowrap">{information}</p>
      <div className="text-3xl">{icon}</div>
      <p>{value}</p>
    </div>
  );
}
