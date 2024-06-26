"use client";

import React, { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { TbLocation } from "react-icons/tb";
import { TiWeatherPartlySunny } from "react-icons/ti";
import SearchBar from "./SearchBar";
import axios from "axios";
import { useAtom } from "jotai";
import { loadingCityAtom, placeAtom } from "@/app/atom";

type Props = { location?: string };

export default function Navbar({ location }: Props) {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [place, setPlace] = useAtom(placeAtom);
  const [_, setLoadingCity] = useAtom(loadingCityAtom);

  const handleChange = async (value: string) => {
    setCity(value);
    if (value.length >= 3) {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
        );
        const suggestions = res?.data?.list.map((item: any) => item.name);
        setSuggestions(suggestions);
        setError("");
        setShowSuggestions(true);
      } catch (err) {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (value: string) => {
    setCity(value);
    setShowSuggestions(false);
  };

  const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    setLoadingCity(true);
    e.preventDefault();

    if (suggestions.length == 0) {
      setError("Location not found...");
      setLoadingCity(false);
    } else {
      setError("");
      setTimeout(() => {
        setLoadingCity(false);
        setPlace(city);
        setShowSuggestions(false);
      }, 500);
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          setLoadingCity(true);
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
          );
          setTimeout(() => {
            setLoadingCity(false);
            setPlace(response?.data?.name);
          }, 500);
        } catch (err) {
          setLoadingCity(false);
        }
      });
    }
  };

  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
      <div className="h-[80px] w-full flex items-center justify-between  max-w-7xl px-3 mx-auto">
        <p className="flex items-center justify-center gap-2">
          <h2 className="text-gray-500 text-3xl">Next Weather</h2>
          <TiWeatherPartlySunny className="text-4xl mt-1 text-gray-300 ml-1" />
        </p>
        <section className="flex gap-2 items-center justify-end">
          <IoLocationOutline
            className="text-2xl text-gray-400 hover:opacity-80 cursor-pointer"
            title="Current Location"
            onClick={handleCurrentLocation}
          />
          <TbLocation className="text-2xl text-gray-400" />
          <p className="text-slate-900/80 text-sm">{location}</p>
          <div className="relative hidden md:flex">
            <SearchBar
              value={city}
              onChange={(e) => handleChange(e.target.value)}
              onSubmit={handleSubmitSearch}
            />
            <SuggestionBox
              {...{
                showSuggestions,
                suggestions,
                handleSuggestionClick,
                error,
              }}
            />
          </div>
        </section>
      </div>
    </nav>
  );
}

function SuggestionBox({
  showSuggestions,
  suggestions,
  handleSuggestionClick,
  error,
}: {
  showSuggestions: boolean;
  suggestions: string[];
  handleSuggestionClick: (item: string) => void;
  error: string;
}) {
  return (
    <>
      {((showSuggestions && suggestions.length > 1) || error) && (
        <ul className="mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 py-2 px-2">
          {error && suggestions.length < 1 && (
            <li className="text-red-500 p-1">{error}</li>
          )}
          {suggestions.map((suggestion, i) => (
            <li
              className="cursor-pointer p-1 rounded hover:bg-gray-200"
              key={i}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
