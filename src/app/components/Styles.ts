import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

export const GlobalStyle = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri&family=Poppins:wght@300;500;600;700&display=swap');

body {
 font-family: Poppins;
 margin: 0;
 padding: 0;
 box-sizing: border-box;
 background-color: aliceblue;
}
`;

export const AppContainer = styled.div`
  margin: 0 auto;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid purple; */
`;

export const CityDayWeatherWrapper = styled.div`
  width: 1400px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* background-color: red; */
`;

export const CityDayWeatherInformationDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const CityDayWeatherIconDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const NextDaysForecastContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NextDayForecastInformationDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
