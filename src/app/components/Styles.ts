import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

// .darkBlue {
//   background-image: linear-gradient(
//     360deg,
//     rgb(85, 217, 233),
//     rgb(18, 12, 102)
//   );
//   color: #f3f6f8;
// }

// mobile: 683px,
//   tablet: 992px,
//   laptop: 1366px,

export const GlobalStyle = createGlobalStyle`

body {
 margin: 0;
 padding: 0;
 box-sizing: border-box;
 /* background-image: linear-gradient(
    365deg,
    rgb(68, 144, 190),
    rgb(255, 249, 252)
  ); */
}
`;

export const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
    365deg,
    rgb(68, 144, 190),
    rgb(255, 249, 252)
  );
`;

export const Wrapper = styled.div`
  width: 800px;
  max-width: 90%;

  height: auto;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 2px 2px 9px #659bb2;

  @media (max-width: 768px) {
    box-shadow: none;
  }
`;

export const Form = styled.form`
  width: 100%;
  max-width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
  @media (max-width: 380px) {
    flex-direction: column;
  }
`;

export const Input = styled.input<{
  $inputWidth?: string;
  $color?: string;
}>`
  width: ${(props) => props.$inputWidth || "160px"};
  color: ${(props) => props.$color || "black"};
  height: 45px;
  border: none;
  border-radius: 10px;
  font-size: 1.1em;
  background-color: white;
  text-align: center;

  @media (max-width: 768px) {
    height: 35px;
    font-size: 0.9em;
  }
`;

export const CurrentWeatherContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 0px 0px;
  color: white;
`;

export const WeatherDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  > *:not(:last-child) {
    border-bottom: 1px solid lightgray;
  }
`;

export const WeatherDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 2.5em;
  margin-left: 2.5em;
  padding: 0.8em;
  align-items: flex-start;

  @media (max-width: 768px) {
    margin-left: 0;
    line-height: 2.2em;
  }
`;

export const DescirptionWithIcon = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

export const WeatherIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    > *img {
      width: 50px;
    }
  }
`;

export const NextDaysForecastContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 0px 0px;
  > *:not(:last-child) {
    border-right: 1px solid lightgray;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: inherit;
    justify-content: center;
    gap: 25px;
    > *:not(:last-child) {
      border-right: none;
      border-bottom: 1px solid lightgray;
    }
  }
`;

export const ForecastInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-items: center;
  }
`;

export const City = styled.span`
  font-size: 2.8em;
  &::first-letter {
    text-transform: capitalize;
  }
  @media (max-width: 768px) {
    font-size: 2em;
  }
`;

export const Temp = styled.span`
  font-size: 3em;
  @media (max-width: 768px) {
    font-size: 2.8em;
  }
`;

export const Span = styled.span`
  font-size: 1.2em;

  &::first-letter {
    text-transform: capitalize;
  }
  @media (max-width: 768px) {
    font-size: 1.1em;
    text-align: center;
  }
`;

//modal component

export const ModalContainer = styled.div`
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;

export const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
`;

export const ModalClose = styled.span`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
`;

export const ModalMessage = styled.p``;
