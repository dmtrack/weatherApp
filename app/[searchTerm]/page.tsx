import React from 'react';
import { Metadata } from 'next';
import GetCurrentWeather from '../lib/getCurrentWeather';
import GetForecast from '../lib/getForecast';
import { v4 as uuidv4 } from 'uuid';
type Props = {
    params: {
        searchTerm: string;
    };
};

export async function generateMetaData({
    params: { searchTerm },
}: Props): Promise<Metadata> {
    const weatherData: Promise<WeatherType> = GetCurrentWeather(searchTerm);
    const data: WeatherType = await weatherData;
    // const displayTerm = searchTerm.replaceAll('%20', ' ');

    return {
        title: searchTerm,
        description: `Weather for ${searchTerm}`,
    };
}

export default async function SearchResults({ params: { searchTerm } }: Props) {
    const weatherData: Promise<WeatherType> = GetCurrentWeather(searchTerm);
    const data = await weatherData;
    const forecastData: Promise<ForecastType> = GetForecast(searchTerm);
    const forecast = await forecastData;

    return (
        <main className='bg-slate-200 mx-auto max-w-lg py-1 min-h-screen'>
            {
                <>
                    {' '}
                    <h1>City: {data.location.name}</h1>
                    <p>Temperature:{data.data.values.temperature}</p>
                    {forecast.timelines.daily.map((d) => (
                        <div key={uuidv4()}>
                            <p>Date: {d.time}</p>
                            <p> Temperature: {d.values.temperatureAvg}</p>
                        </div>
                    ))}
                </>
            }
        </main>
    );
}
