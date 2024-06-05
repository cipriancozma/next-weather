"use client";

import Container from "@/components/Container";
import ForecastWeatherDetails from "@/components/ForecastWeatherDetails";
import Navbar from "@/components/Navbar";
import WeatherDetails, { WeatherDetailType } from "@/components/WeatherDetails";
import { WeatherIcon } from "@/components/WeatherIcon";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelcius";
import { convertWindSpeed } from "@/utils/convertWindSpeed";
import axios from "axios";
import { format, fromUnixTime, parseISO } from "date-fns";
import { useAtom } from "jotai";
import { useQuery } from "react-query";
import { loadingCityAtom, placeAtom } from "./atom";
import { useEffect } from "react";

export default function Home() {
  const [place, setPlace] = useAtom(placeAtom);
  const [loadingCity, _] = useAtom(loadingCityAtom);

  const { isLoading, error, data, refetch } = useQuery(
    "weatherData",
    async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&cnt=56`
      );
      return data;
    }
  );

  useEffect(() => {
    refetch();
  }, [place, refetch]);

  if (isLoading) {
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-pulse">Loading...</p>
      </div>
    );
  }

  const dayDate = data?.list[0];
  const city = data?.city;

  const uniqueDates = [
    ...new Set(
      data?.list.map(
        (entry: any) => new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    ),
  ];

  const firstInfoForEachDate = uniqueDates.map((date) => {
    return data?.list.find((entry: any) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    });
  });

  const formatWeatherDetails = (dayDate: any) => ({
    [WeatherDetailType.VISIBILITY]: `${dayDate?.visibility / 1000} km`,
    [WeatherDetailType.HUMIDITY]: `${dayDate?.main?.humidity}%`,
    [WeatherDetailType.WIND_SPEED]: `${convertWindSpeed(
      dayDate?.wind?.speed ?? 1.6
    )}`,
    [WeatherDetailType.AIR_PRESSURE]: `${dayDate?.main?.pressure} hPa`,
    [WeatherDetailType.SUNRISE]: `${format(
      fromUnixTime(city?.sunrise ?? 1717208269),
      "H:mm"
    )}`,
    [WeatherDetailType.SUNSET]: `${format(
      fromUnixTime(city?.sunset ?? 1717264648),
      "H:mm"
    )}`,
  });

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar location={city?.name} />
      {loadingCity ? (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-center text-xl animate-pulse ">Loading...</p>
        </div>
      ) : (
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
            <div className="flex gap-4">
              <Container className="w-fit justify-center flex-col px-4 items-center">
                <p className="capitalize text-center">
                  {dayDate?.weather[0]?.description}
                </p>
                <WeatherIcon iconName={dayDate?.weather[0]?.icon ?? ""} />
              </Container>
              <Container className="bg-yellow-300/80 px-6 gap-4 justify-between overflow-x-auto">
                <WeatherDetails details={formatWeatherDetails(dayDate)} />
              </Container>
            </div>
          </section>
          <section className="flex w-full flex-col gap-4">
            <p className="text-2xl">7 days Forecast</p>
            {firstInfoForEachDate.map((d, i) => (
              <ForecastWeatherDetails
                key={i}
                description={d?.weather[0].description ?? ""}
                weatherIcon={d?.weather[0].icon ?? "01d"}
                date={format(parseISO(d?.dt_txt ?? ""), "dd.MM")}
                day={format(parseISO(d?.dt_txt ?? ""), "EEEE")}
                feels_like={d?.main.feels_like ?? 0}
                temp={d?.main.temp ?? 0}
                min_temp={d?.main.temp_min ?? 0}
                max_temp={d?.main.temp_max ?? 0}
                details={formatWeatherDetails(d)}
              />
            ))}
          </section>
        </main>
      )}
    </div>
  );
}
