import React from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import getCurrentWeather from '../lib/getCurrentWeather';
import getForecast from '../lib/getForecast';
import { v4 as uuidv4 } from 'uuid';

type Props = {
    params: {
        searchTerm: string;
    };
};

// export async function generateMetaData({ params: { searchTerm } }: Props) {
//     const weatherData: Promise<WeatherType> = getCurrentWeather(searchTerm);
//     const data = await weatherData;

//     return {
//         title: data.location.name,
//         description: `Weather for ${data.location.name}`,
//     };
// }

export default async function SearchResults({ params: { searchTerm } }: Props) {
    const weatherData: Promise<WeatherType> = getCurrentWeather(searchTerm);
    const data = await weatherData;
    const forecastData: Promise<ForecastType> = getForecast(searchTerm);
    const forecast = await forecastData;

    return (
        <main>
            {
                <>
                    {' '}
                    <h1>{data.location.name.split(',')[0]}</h1>
                    <p>Temperature:{data.data.values.temperature}</p>
                    {forecast.timelines.daily.map((d) => (
                        <div key={uuidv4()}>
                            <div>Date: {d.time}</div>
                            <div> Temperature: {d.values.temperatureAvg}</div>
                        </div>
                    ))}
                </>
            }
        </main>
    );
}

export const revalidate = 60;
