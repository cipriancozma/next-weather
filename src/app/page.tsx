"use client";

import Navbar from "@/components/Navbar";
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
        <section>
          <div>
            <h2 className="flex gap-1 text-2xl items-end">
              <p>{format(parseISO(dayDate?.dt_txt ?? ""), "EEEE")}</p>
              <p className="text-lg">
                ({format(parseISO(dayDate?.dt_txt ?? ""), "dd.MM.yyyy")})
              </p>
            </h2>
          </div>
        </section>
        <section></section>
      </main>
    </div>
  );
}
