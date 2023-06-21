import React from 'react';
import { Metadata } from 'next';
import GetCurrentWeather from '../lib/getCurrentWeather';
import GetForecast from '../lib/getForecast';

type Props = {
    params: {
        searchTerm: string;
    };
};

export async function generateMetaData({ params: { searchTerm } }: Props) {
    const weatherData: Promise<WeatherType> = GetCurrentWeather(searchTerm);
    const data = await weatherData;
    const displayTerm = searchTerm.replaceAll('%20', ' ');

    if ('error' in data) {
        return {
            title: 'Not Found',
        };
    }

    return {
        title: displayTerm,
        description: `Weather for ${displayTerm}`,
    };
}

export default async function SearchResults({ params: { searchTerm } }: Props) {
    const weatherData: Promise<WeatherType> = GetCurrentWeather(searchTerm);
    // const forecastData = GetForecast(searchTerm, 5);
    const data = await weatherData;
    // const forecast = await forecastData;
    // console.log('forecast', forecast);
    if ('error' in data)
        return (
            <main className='bg-slate-200 mx-auto max-w-lg py-1 min-h-screen'>
                <h2 className='p-2 text-xl'>{searchTerm} Not Found</h2>
            </main>
        );

    return (
        <main className='bg-slate-200 mx-auto max-w-lg py-1 min-h-screen'>
            {
                <>
                    {' '}
                    <h1>City: {data.location.name}</h1>
                    <p>Temperature:{data.data.values.temperature}</p>
                </>
            }
        </main>
    );
}
