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

// opencage data type
export type LicensesType = [
  {
    name: string;
    url: string;
  }
];

export type RateType = { limit: number; remaining: number; reset: number };

export type DMSType = {
  lat: string;
  lng: string;
};

export type MercatorType = {
  x: number;
  y: number;
};

export type CodeType = {
  code: String;
};

export type NuitType = {
  NUTS0: CodeType;
  NUTS1: CodeType;
  NUTS2: CodeType;
  NUTS3: CodeType;
};

export type OSMType = {
  edit_url: string;
  note_url: string;
  url: string;
};

export type UN_M49Type = {
  regions: {
    DE: string;
    EUROPE: string;
    WESTERN_EUROPE: string;
    WORLD: string;
  };
  statistical_groupings: [string];
};

export type CurrencyType = {
  alternate_symbols: [];
  decimal_mark: string;
  html_entity: string;
  iso_code: string;
  iso_numeric: string;
  name: string;
  smallest_denomination: number;
  subunit: string;
  subunit_to_unit: number;
  symbol: string;
  symbol_first: number;
  thousands_separator: string;
};

export type RoadinfoType = {
  drive_on: string;
  road: string;
  speed_in: string;
};

export type SunType = {
  rise: {
    apparent: number;
    astronomical: number;
    civil: number;
    nautical: number;
  };
  set: {
    apparent: number;
    astronomical: number;
    civil: number;
    nautical: number;
  };
};

export type TiemzoneType = {
  name: string;
  now_in_dst: number;
  offset_sec: number;
  offset_string: string;
  short_name: string;
};

export type What3wordsType = {
  words: string;
};

export type AnnotationsType = {
  DMS: DMSType;
  MGRS: string;
  Maidenhead: string;
  Mercator: MercatorType;
  NUTS: NuitType;
  OSM: OSMType;
  UN_M49: UN_M49Type;
  callingcode: number;
  currency: CurrencyType;
  flag: string;
  geohash: string;
  qibla: number;
  roadinfo: RoadinfoType;
  sun: SunType;
  timezone: TiemzoneType;
  what3words: What3wordsType;
};

export type BoundsType = {
  northeast: {
    lat: number;
    lng: number;
  };
  southwest: {
    lat: number;
    lng: number;
  };
};

// export type ComponentsType = {
//     ISO_3166-1_alpha-2: string,
//     ISO_3166-1_alpha-3: "DEU",
//     ISO_3166-2: [
//     "DE-NI"
//     ],
//     _category: string,
//     _type: string,
//     city: string,
//     city_district: "Vahrenwald-List",
//     continent: "Europe",
//     country: "Allemagne",
//     country_code: "de",
//     county: "Région de Hanovre",
//     house_number: "2",
//     office: "Design Offices",
//     political_union: "European Union",
//     postcode: "30165",
//     road: "Philipsbornstraße",
//     state: "Basse-Saxe",
//     suburb: "Vahrenwald"

// }

export type GeometryType = {
  lat: number;
  lng: number;
};

export type ResultsType = {
  annotations: AnnotationsType;
  bounds: BoundsType;
  components: {};
  confidence: number;
  formatted: string;
  geometry: GeometryType;
};

export type LocationDataType = {
  documentation: string;
  licenses: LicensesType;
  rate: RateType;
  results: ResultsType[];
  status: {};
  stay_informed: {};
  thanks: string;
  timestamp: {};
  total_results: 1;
};
