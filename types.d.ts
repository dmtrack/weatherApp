type SearchResultType = Promise<WeatherType> | Promise<ErrorType>;

type WeatherType = {
    data: {
        time: string;
        values: {
            cloudBase: number;
            cloudCeiling: null;
            cloudCover: number;
            dewPoint: number;
            freezingRainIntensity: number;
            humidity: number;
            precipitationProbability: number;
            pressureSurfaceLevel: number;
            rainIntensity: number;
            sleetIntensity: number;
            snowIntensity: number;
            temperature: number;
            temperatureApparent: number;
            uvHealthConcern: number;
            uvIndex: number;
            visibility: number;
            weatherCode: number;
            windDirection: number;
            windGust: number;
            windSpeed: number;
        };
    };
    location: {
        lat: number;
        lon: number;
        name: string;
        type: string;
    };
};

type ErrorType = {
    code: number;
    type: string;
    message: string;
};