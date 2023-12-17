import { GeometryType, WeatherDataType } from "./types";

// get and formate date func
export function getDate(timestamp: number | undefined) {
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
export function IconToDispaly(weatherId: number) {
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
export const fetchCityLocation = async (
  cityName: string
): Promise<GeometryType> => {
  encodeURIComponent(cityName);
  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}&q=${cityName}`
  );
  const data = await response.json();
  return data.results[0].geometry;
};

// get weather data func
export const fetchWeather = async (
  lat: number,
  lng: number
): Promise<WeatherDataType> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&units=metric&exclude=hourly,minutely&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`
  );
  const data = await response.json();
  return data;
};
