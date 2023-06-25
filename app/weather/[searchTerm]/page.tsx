import React from 'react';

import { v4 as uuidv4 } from 'uuid';
import Typography from '../../components/Typography';
import cn from 'classnames';

import openSans from '../../utils/fonts/openSans';

import styles from '../../components/Intro/Intro.module.scss';
import Chip from '../../components/Chip';
import { get } from '../../axios';
import { WeatherContainer } from '../../../types';

type Props = {
    params: {
        searchTerm: string;
    };
};

export default async function SearchResults({ params: { searchTerm } }: Props) {
    const weatherData: WeatherContainer = await get(
        `${process.env.SERVER_URL}/${searchTerm}`
    );

    const data = await weatherData;
    const { forecast, weather } = data;
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
                        {weather.location.name}
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
                                value={`${weather.current.temp_c}°C`}
                            />
                            <Chip
                                label='humidity'
                                value={`${weather.current.humidity}%`}
                            />{' '}
                            <Chip
                                label='visibility'
                                value={`${weather.current.vis_km}km`}
                            />
                            <Chip
                                label='cloud'
                                value={`${weather.current.cloud}%`}
                            />
                            <Chip
                                label='w-dir'
                                value={`${weather.current.wind_dir}°`}
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
