"use client";

import Image from "next/image";
import {
  AppContainer,
  CityDayWeatherIconDiv,
  CityDayWeatherInformationDiv,
  CityDayWeatherWrapper,
  GlobalStyle,
  NextDayForecastInformationDiv,
  NextDaysForecastContainer
} from "./components/Styles";

export default function Home() {
  return (
    <AppContainer>
      <GlobalStyle />
      <CityDayWeatherWrapper>
        {/* <CityDayWeatherInformationDiv></CityDayWeatherInformationDiv>
        <CityDayWeatherIconDiv></CityDayWeatherIconDiv> */}
        CityDayWeatherWrapper
      </CityDayWeatherWrapper>
      <NextDaysForecastContainer>
        <NextDayForecastInformationDiv></NextDayForecastInformationDiv>
      </NextDaysForecastContainer>
    </AppContainer>
  );
}
