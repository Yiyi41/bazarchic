export type WeatherType = [
  {
    id: number;
    main: string;
    description: string;
    icon: string;
  }
];

export type CurrentType = {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  temp: number;
  uvi: number;
  visibility: number;
  weather: WeatherType;
  wind_deg: number;
  wind_speed: number;
};

export type TempType = {
  day: number;
  eve: number;
  max: number;
  min: number;
  morn: number;
  night: number;
};

export type FeelsLikeType = {
  day: number;
  night: number;
  eve: number;
  morn: number;
};

export type DailyType = {
  clouds: number;
  dew_point: number;
  dt: number;
  humidity: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  uvi: number;
  visibility: number;
  wind_deg: number;
  wind_speed: number;
  temp: TempType;
  weather: WeatherType;
  feels_like: FeelsLikeType;
};

export type WeatherDataType = {
  current: CurrentType;
  daily: DailyType[];
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
};

export type GeometryType = {
  lat: number;
  lng: number;
};
