import React from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import getCurrentWeather from '../../lib/getCurrentWeather';
import getForecast from '../../lib/getForecast';
import { v4 as uuidv4 } from 'uuid';
import Typography from '../../components/Typography';
import cn from 'classnames';

import openSans from '../../utils/fonts/openSans';

import styles from '../../components/Intro/Intro.module.scss';
import Chip from '../../components/Chip';

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

    const date = (target) => new Date(target);
    const modifiedForcast = await forecast.timelines.daily.map((el) => {
        let d = date(el.time);
        return `${d.getDate()}.${d.getMonth() + 1}: ${
            el.values.temperatureMax
        }`;
    });

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
                            <Chip
                                label='temp'
                                value={`${data.data.values.temperature}°C`}
                            />
                            <Chip
                                label='humidity'
                                value={`${data.data.values.humidity}%`}
                            />{' '}
                            <Chip
                                label='visibility'
                                value={`${data.data.values.visibility}%`}
                            />
                            <Chip
                                label='cloud-cover'
                                value={`${data.data.values.cloudCover}%`}
                            />
                            <Chip
                                label='w-dir'
                                value={`${data.data.values.windDirection}%`}
                            />
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
                            {modifiedForcast.map((d) => (
                                <Typography
                                    key={uuidv4()}
                                    variant='h3'
                                    className={openSans.className}
                                    align='left'>
                                    <Typography align='left'>
                                        <Chip
                                            label={d.split(':')[0]}
                                            value={`${d.split(':')[1]}°C`}
                                        />
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
