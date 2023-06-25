import { NextResponse } from 'next/server';
import getCurrentWeather from '../../../lib/getCurrentWeather';
import getForecast from '../../../lib/getForecast';

export async function GET(request: Request) {
    const searchTerm = request.url.slice(request.url.lastIndexOf('/') + 1);

    const currentWeatherData = getCurrentWeather(searchTerm);
    const currentForecastData = getForecast(searchTerm);

    const [currentWeather, currentForecast] = await Promise.all([
        currentWeatherData,
        currentForecastData,
    ]);

    const weather = await currentWeather;
    const forecast = await currentForecast;

    return NextResponse.json({ weather: weather, forecast: forecast });
}
