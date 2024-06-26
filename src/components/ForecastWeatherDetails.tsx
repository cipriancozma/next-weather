import React from "react";
import Container from "./Container";
import { WeatherIcon } from "./WeatherIcon";
import WeatherDetails, { WeatherDetailProps } from "./WeatherDetails";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelcius";

export interface ForecastWeatherDetailsProps extends WeatherDetailProps {
  weatherIcon: string;
  date: string;
  day: string;
  temp: number;
  feels_like: number;
  min_temp: number;
  max_temp: number;
  description: string;
}

export default function ForecastWeatherDetails(
  props: ForecastWeatherDetailsProps
) {
  const {
    weatherIcon = "02d",
    date = "02.06",
    day = "Monday",
    temp,
    min_temp,
    max_temp,
    feels_like,
    description,
  } = props;

  return (
    <Container classID="gap-4">
      <section className="flex gap-4 items-center px-4">
        <div className="flex flex-col gap-1 items-center">
          <WeatherIcon iconName={weatherIcon} />
          <p>{date}</p>
          <p className="text-sm">{day}</p>
        </div>
        <div className="flex flex-col px-4">
          <span className="text-5xl">
            {convertKelvinToCelsius(temp ?? 0)}°C
          </span>
          <p className="text-xs space-x-1 whitespace-nowrap">
            <span>Feels like</span>
            <span>{convertKelvinToCelsius(feels_like ?? 0)}°C</span>
          </p>
          <p className="capitalize">{description}</p>
        </div>
      </section>
      <section className="overflow-x-auto flex justify-between gap-4 px-4 w-full pr-10">
        <WeatherDetails {...props} />
      </section>
    </Container>
  );
}
