"use client";

import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import { WeatherIcon } from "@/components/WeatherIcon";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelcius";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { useQuery } from "react-query";

export default function Home() {
  const { isLoading, error, data } = useQuery("weatherData", async () => {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=iasi&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&cnt=56`
    );
    return data;
  });

  if (isLoading) {
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-pulse">Loading...</p>
      </div>
    );
  }

  const dayDate = data?.list[0];

  console.log(data);
  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        <section className="space-y-4">
          <div className="space-y-2">
            <h2 className="flex gap-1 text-2xl items-end">
              <p>{format(parseISO(dayDate?.dt_txt ?? ""), "EEEE")}</p>
              <p className="text-lg">
                ({format(parseISO(dayDate?.dt_txt ?? ""), "dd.MM.yyyy")})
              </p>
            </h2>
            <Container className="gap-10 px-6 items-center">
              <div className="flex flex-col px-4">
                <span className="text-5xl">
                  {convertKelvinToCelsius(dayDate?.main?.temp ?? 0)}°C
                </span>
                <p className="text-xs space-x-1 whitespace-nowrap">
                  <span>Feels like</span>
                </p>
                <p className="text-xs space-x-2">
                  <span>
                    {convertKelvinToCelsius(dayDate?.main?.temp_min ?? 0)}°C↓
                  </span>
                  <span>
                    {convertKelvinToCelsius(dayDate?.main?.temp_max ?? 0)}°C↑
                  </span>
                </p>
              </div>
              <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                {data?.list.map((el: any, i: number) => {
                  return (
                    <div
                      key={i}
                      className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
                    >
                      <p className="whitespace-nowrap">
                        {format(parseISO(el?.dt_txt), "h:mm a")}
                      </p>
                      <WeatherIcon iconName={el?.weather[0]?.icon} />
                      <p> {convertKelvinToCelsius(el?.main?.temp ?? 0)}°C</p>
                    </div>
                  );
                })}
              </div>
            </Container>
          </div>
        </section>
        <section></section>
      </main>
    </div>
  );
}
