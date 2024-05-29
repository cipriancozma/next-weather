"use client";

import Navbar from "@/components/Navbar";
import axios from "axios";
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

  console.log(data);
  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
    </div>
  );
}
