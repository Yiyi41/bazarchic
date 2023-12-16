"use client";
import Image from "next/image";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
require("dotenv").config();

// import styled component
import {
  AppContainer,
  City,
  CurrentWeatherContainer,
  DescirptionWithIcon,
  ForecastInfo,
  Form,
  GlobalStyle,
  Input,
  NextDaysForecastContainer,
  Span,
  Temp,
  WeatherDetails,
  WeatherDetailsContainer,
  WeatherIconContainer,
  Wrapper
} from "./components/Styles";

// type import
import { WeatherDataType, GeometryType, DailyType } from "./util/types";

// make next/image responsive
const ResponsiveImage = styled(Image)`
  width: 185px;
  height: auto;

  @media screen and (max-width: 768px) {
    width: auto;
    max-width: 185px;
  }
`;

// get and formate date func
function getDate(timestamp: number | undefined) {
  let formattedDate = "";
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric"
  };
  if (timestamp) {
    const date = new Date(timestamp * 1000);
    formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  }

  return formattedDate;
}

// func define which weather icon to display
function IconToDispaly(weatherId: number) {
  let iconPath = "";
  if (weatherId > 500 && weatherId <= 531) {
    iconPath = "/assets/" + "rain" + ".svg";
  } else if ((weatherId >= 300 && weatherId <= 321) || weatherId == 500) {
    iconPath = "/assets/" + "cloud-drizzle-white" + ".svg";
  } else if (weatherId >= 200 && weatherId <= 232) {
    iconPath = "/assets/" + "thunderStorm" + ".svg";
  } else if (weatherId >= 600 && weatherId <= 622) {
    iconPath = "/assets/" + "snow" + ".svg";
  } else if (weatherId == 800) {
    iconPath = "/assets/" + "sun" + ".svg";
  } else if (weatherId >= 801 && weatherId <= 802) {
    iconPath = "/assets/" + "cloudy" + ".svg";
  } else if (weatherId >= 803 && weatherId <= 804) {
    iconPath = "/assets/" + "clouds" + ".svg";
  } else if (weatherId >= 701 && weatherId <= 781) {
    iconPath = "/assets/" + "mist" + ".svg";
  }

  return iconPath;
}

// get city location func
const fetchCityLocation = async (cityName: string): Promise<GeometryType> => {
  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}&q=${cityName}`
  );
  const data = await response.json();
  return data.results[0].geometry;
};

// get weather data func
const fetchWeater = async (
  lat: number,
  lng: number
): Promise<WeatherDataType> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&units=metric&exclude=hourly,minutely&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`
  );
  const data = await response.json();
  return data;
};

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherDataType>();
  const [dailyForcast, setDailyForcast] = useState<DailyType[]>();
  const [inputValue, setInputValue] = useState("");
  const [city, setCity] = useState("");

  const opencageQuery = useQuery({
    queryKey: ["opencageData", city], // the query depends on city value
    queryFn: () => fetchCityLocation(city),
    enabled: !!city //the query is enabled if city value existe
  });

  const weatherQuery = useQuery({
    queryKey: ["weatherData", opencageQuery.data], // the query depends on opencageQuery.data
    queryFn: () =>
      fetchWeater(opencageQuery.data!.lat, opencageQuery.data!.lng),
    enabled: !!opencageQuery.data //the query is enabled if opencageQuery.data existe
  });

  console.log(typeof opencageQuery.error);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(encodeURIComponent(e.currentTarget.value));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCity(inputValue);
    opencageQuery.refetch(); //refetch if input value change
    setInputValue("");
  };

  useEffect(() => {
    if (weatherQuery.data) {
      setWeatherData(weatherQuery.data);
      setDailyForcast(weatherQuery.data?.daily.slice(1, 5)); // filter data for easily displaying
    }
  }, [inputValue, weatherQuery.data]);

  return (
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
        <Wrapper>
          <CurrentWeatherContainer>
            <WeatherDetailsContainer>
              <WeatherDetails>
                <City>{city}</City>
                <Span>{getDate(weatherData?.current?.dt)}</Span>
              </WeatherDetails>
              <WeatherDetails>
                <Temp>{Math.round(weatherData?.daily[0].temp.day!)} °C</Temp>{" "}
                <Span>
                  {Math.round(weatherData?.daily[0].temp.min!)} /{" "}
                  {Math.round(weatherData?.daily[0].temp.max!)} °C
                </Span>
                <DescirptionWithIcon>
                  <Image
                    src={IconToDispaly(weatherData?.daily[0].weather[0].id!)}
                    width={30}
                    height={30}
                    alt="weather icon"
                    priority
                  />
                  <Span>{weatherData?.daily[0].weather[0].description}</Span>
                </DescirptionWithIcon>
              </WeatherDetails>
              <WeatherDetails>
                <Span>
                  Wind: {Math.round(weatherData?.current.wind_speed!)} km/h
                </Span>
                <Span>Humidity: {weatherData?.current?.humidity} %</Span>
              </WeatherDetails>
            </WeatherDetailsContainer>
            <WeatherIconContainer>
              <ResponsiveImage
                src={IconToDispaly(weatherData?.current?.weather[0].id!)}
                width={150}
                height={150}
                alt="weather icon"
                sizes="(max-width: 768px) 90px, 120px"
                priority
              />
            </WeatherIconContainer>
          </CurrentWeatherContainer>
          <NextDaysForecastContainer>
            {dailyForcast?.map((dayWeather, index) => (
              <ForecastInfo key={index}>
                <Span>{getDate(dayWeather.dt)}</Span>
                <Span>
                  <Image
                    src={IconToDispaly(dayWeather.weather[0].id!)}
                    width={50}
                    height={50}
                    alt="weather icon"
                  />
                </Span>
                <Span>{dayWeather.weather[0].description}</Span>
                <Span>
                  {Math.round(dayWeather.temp.min)} /{" "}
                  {Math.round(dayWeather.temp.max)} °C
                </Span>
              </ForecastInfo>
            ))}
          </NextDaysForecastContainer>
        </Wrapper>
      ) : (
        ""
      )}
    </AppContainer>
  );
}
