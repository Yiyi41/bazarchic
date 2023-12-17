"use client";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
require("dotenv").config();
import { ThemeProvider } from "styled-components";

// import styled component
import { AppContainer, Form, GlobalStyle, Input } from "./components/Styles";

// type import
import { WeatherDataType, DailyType } from "./util/types";
import Modal from "./components/Modal";
import WeatherInfo from "./components/WeatherInfo";
import { fetchCityLocation, fetchWeater } from "./util/functions";

export const theme = {
  backgrounds: {
    light: "linear-gradient(365deg, rgb(68, 144, 190), rgb(255, 249, 252))",
    dark: "linear-gradient(365deg, rgb(85, 217, 233), rgb(18, 12, 102))"
  }
};

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherDataType | null>();
  const [dailyForcast, setDailyForcast] = useState<DailyType[]>();
  const [inputValue, setInputValue] = useState("");
  const [city, setCity] = useState("");
  const [appTheme, setAppTheme] = useState("light");

  const opencageQuery = useQuery({
    queryKey: ["opencageData", city], // the query depends on city value
    queryFn: () => fetchCityLocation(city),
    enabled: !!city, //the query is enabled if city value existe
    retry: false
  });

  const weatherQuery = useQuery({
    queryKey: ["weatherData", opencageQuery.data], // the query depends on opencageQuery.data
    queryFn: () =>
      fetchWeater(opencageQuery.data!.lat, opencageQuery.data!.lng),
    enabled: !!opencageQuery.data, //the query is enabled if opencageQuery.data existe
    retry: false
  });

  // console.log(opencageQuery.error);

  console.log(weatherQuery.data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCity(inputValue);
    setWeatherData(null);
    opencageQuery.refetch(); //refetch if input value change
    setInputValue("");
  };

  useEffect(() => {
    if (weatherQuery.data) {
      setWeatherData(weatherQuery.data);
      setDailyForcast(weatherQuery.data?.daily.slice(1, 5)); // narrow data for easily displaying
      // check from api response if the current time of the city is day or night
      if (weatherQuery.data.current.weather[0].icon.includes("n") === true)
        setAppTheme("dark");
    } else {
      setAppTheme("light");
    }
  }, [weatherQuery.data]);


  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AppContainer
        $background={
          appTheme === "dark"
            ? "linear-gradient(365deg, rgb(85, 217, 233), rgb(18, 12, 102))"
            : "linear-gradient(365deg, rgb(68, 144, 190), rgb(255, 249, 252))"
        }
      >
        <GlobalStyle />
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            pattern="[A-Za-z ]*"
            title="It was an imaginary city 😉"
            value={inputValue}
            onChange={handleChange}
            placeholder="your favrite city"
          />
          <Input
            type="submit"
            $inputWidth="150px"
            value="Search weather"
            $color="#3e95bc"
          />
        </Form>

        {weatherData ? (
          <WeatherInfo
            weatherData={weatherData}
            dailyForcast={dailyForcast}
            city={city}
          />
        ) : (
          ""
        )}
      </AppContainer>
    </>
  );
}
