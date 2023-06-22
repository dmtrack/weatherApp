import React from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import getCurrentWeather from '../lib/getCurrentWeather';
import getForecast from '../lib/getForecast';
import { v4 as uuidv4 } from 'uuid';
import Typography from '../components/Typography';
import cn from 'classnames';

import openSans from '../utils/fonts/openSans';
import manrope from '../utils/fonts/manrope';

import styles from '../components/Intro/Intro.module.scss';

type Props = {
    params: {
        searchTerm: string;
    };
};

export default async function SearchResults({ params: { searchTerm } }: Props) {
    const weatherData: Promise<WeatherType> = getCurrentWeather(searchTerm);
    const data = await weatherData;
    const forecastData: Promise<ForecastType> = getForecast(searchTerm);
    const forecast = await forecastData;

    return (
        <>
            <section className={styles.section}>
                <div className={styles.topContainer}>
                    <Typography
                        variant='h3'
                        align='left'
                        className={openSans.className}
                        color='gray'>
                        {data.location.name.split(',')[0]},{' '}
                        {data.location.name.split(',')[1]}
                    </Typography>
                </div>
                <div className={styles.mainContainer}>
                    <div className={styles.weatherBlock}>
                        <div className={styles.textWrapper}>
                            <Typography
                                align='left'
                                variant='p'
                                className={cn(styles.text, openSans.className)}
                                color='dark-blue'>
                                Today
                            </Typography>
                        </div>
                        <Typography
                            className={cn(
                                openSans.className,
                                styles.infoBlocks
                            )}
                            align='left'>
                            temp: <p>{data.data.values.temperature}°C</p>
                            humidity: <p>{data.data.values.humidity}%</p>
                            visibility: <p>{data.data.values.visibility}%</p>
                            cloud-cover: <p>{data.data.values.cloudCover}%</p>
                            wind-direction:{' '}
                            <p>{data.data.values.windDirection}°</p>
                            wind-speed: <p>{data.data.values.windSpeed}</p>
                        </Typography>
                    </div>
                    <div className={styles.wrapper}>
                        <div className={styles.textWrapper}>
                            <Typography
                                align='left'
                                variant='p'
                                className={cn(styles.text, openSans.className)}
                                color='dark-blue'>
                                5-days forecast
                            </Typography>
                        </div>
                        <div
                            className={cn(styles.forecast, openSans.className)}>
                            {forecast.timelines.daily.map((d) => (
                                <Typography
                                    key={uuidv4()}
                                    variant='h3'
                                    className={openSans.className}
                                    align='left'>
                                    <Typography align='left'>
                                        Date: {d.time}
                                    </Typography>
                                    <Typography align='left'>
                                        {' '}
                                        temp: {d.values.temperatureAvg} °C
                                    </Typography>
                                </Typography>
                            ))}{' '}
                        </div>
                    </div>
                </div>
                <div className={styles.line} />
            </section>
        </>
    );
}

export const revalidate = 60;
