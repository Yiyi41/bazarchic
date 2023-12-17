import React from "react";
import Image from "next/image";
import styled from "styled-components";

// import styled components
import {
  City,
  CurrentWeatherContainer,
  DescirptionWithIcon,
  ForecastInfo,
  NextDaysForecastContainer,
  Span,
  Temp,
  WeatherDetails,
  WeatherDetailsContainer,
  WeatherIconContainer,
  Wrapper
} from "./Styles";


// import types
import { DailyType, WeatherDataType } from "../util/types";

// import functions
import { IconToDispaly, getDate } from "../util/functions";

// make next/image responsive
const ResponsiveImage = styled(Image)`
  width: 185px;
  height: auto;

  @media screen and (max-width: 768px) {
    width: auto;
    max-width: 185px;
  }
`;

interface WeatherInfoProps {
  weatherData: WeatherDataType;
  dailyForcast: DailyType[] | undefined;
  city: string;
}

export default function WeatherInfo({
  weatherData,
  dailyForcast,
  city
}: WeatherInfoProps) {
  return (
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
  );
}
