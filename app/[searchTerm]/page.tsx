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

    const time = await new Date();
    console.log(time);

    return (
        <>
            <section className={styles.section}>
                <div className={styles.topContainer}>
                    <Typography
                        color='gray'
                        fontWeight='regular'
                        className={openSans.className}
                        align='left'>
                        123{' '}
                    </Typography>

                    <Typography
                        variant='h2'
                        className={manrope.className}
                        color='dark-blue'>
                        {data.location.name.split(',')[0]}
                    </Typography>
                    <Typography
                        variant='p'
                        className={manrope.className}
                        align='left'>
                        Temperature:{data.data.values.temperature}{' '}
                    </Typography>
                </div>
                <div className={styles.mainContainer}>
                    <div className={styles.wrapper}>
                        <div className={styles.textWrapper}>
                            <Typography
                                variant='p'
                                className={cn(styles.text, openSans.className)}
                                color='dark-blue'>
                                5-days forecast
                            </Typography>
                        </div>
                        <Typography
                            variant='h3'
                            className={manrope.className}
                            align='left'>
                            {forecast.timelines.daily.map((d) => (
                                <div key={uuidv4()}>
                                    <div>Date: {d.time}</div>
                                    <div>
                                        {' '}
                                        Temperature: {d.values.temperatureAvg}
                                    </div>
                                </div>
                            ))}{' '}
                        </Typography>
                    </div>
                </div>
                <div className={styles.line} />
            </section>
        </>
    );
}

export const revalidate = 60;
