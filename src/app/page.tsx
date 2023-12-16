"use client";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
require("dotenv").config();

// import styled component
import { AppContainer, Form, GlobalStyle, Input } from "./components/Styles";

// type import
import { WeatherDataType, DailyType } from "./util/types";
import Modal from "./components/Modal";
import WeatherInfo from "./components/WeatherInfo";
import { fetchCityLocation, fetchWeater } from "./util/functions";

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherDataType | null>();
  const [dailyForcast, setDailyForcast] = useState<DailyType[]>();
  const [inputValue, setInputValue] = useState("");
  const [city, setCity] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

  console.log(opencageQuery.data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(encodeURIComponent(e.currentTarget.value));
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
      setDailyForcast(weatherQuery.data?.daily.slice(1, 5)); // filter data for easily displaying
    }
  }, [inputValue, opencageQuery.data, weatherQuery.data]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AppContainer>
        <GlobalStyle />
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Your favrite city"
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
        <Modal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
      </AppContainer>
    </>
  );
}
