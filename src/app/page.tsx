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
import { WeatherDataType, GeometryType } from "./util/types";

// make next/image responsive
const ResponsiveImage = styled(Image)`
  width: 150px;
  height: auto;

  @media screen and (max-width: 768px) {
    width: auto;
  }
`;

// get date func
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
    iconPath = "/assets/" + "mist" + ".png";
  }

  return iconPath;
}

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherDataType>();
  const [locationData, setLocationData] = useState<GeometryType>();
  const [isLoading, setIsLoading] = useState(true);
  const [city, setCity] = useState("");

  const opencageURL = `https://api.opencagedata.com/geocode/v1/json?key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}&q=${city}`;

  const openWeatherURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${locationData?.lat}&lon=${locationData?.lng}&units=metric&exclude=hourly,minutely&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(encodeURIComponent(e.currentTarget.value));
  };

  // fetch city location from opencage api
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(opencageURL);
      const data = await response.json();
      setLocationData(data.results[0].geometry);
    } catch (error) {
      console.log(error);
    }
  };

  const { data } = useQuery({
    queryKey: ["weatherData"],
    queryFn: () => fetch(openWeatherURL).then((res) => res.json()),
    enabled: !!locationData
  });

  useEffect(() => {
    if (data) {
      setWeatherData(data);
      setIsLoading(true);
    }
  }, [data]);

  // get exact number of days's forecast to display
  const dailyForcast = weatherData?.daily.slice(1, 5);

  return (
    <AppContainer>
      <GlobalStyle />
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
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
      {weatherData && (
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
                sizes="(max-width: 768px) 90px, 150px"
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
      )}
    </AppContainer>
  );
}
