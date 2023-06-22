import cn from 'classnames';
import Image from 'next/image';

import openSans from '../../utils/fonts/openSans';
import manrope from '../../utils/fonts/manrope';

import Typography from '../Typography';

import introImage from '../../assets/images/intro-image.png';

import styles from './Intro.module.scss';
import Search from '../SearchOld/Search';

function Intro() {
    return (
        <section className={styles.section}>
            <div className={styles.topContainer}>
                <Typography
                    variant='p'
                    className={cn(styles.text, openSans.className)}
                    color='gray'>
                    Blog
                </Typography>
                {/* <Search /> */}
                <Typography
                    variant='h2'
                    className={manrope.className}
                    color='dark-blue'>
                    Thoughts and words about our world
                </Typography>
            </div>
            <div className={styles.mainContainer}>
                <Image
                    src={introImage}
                    width='0'
                    height='0'
                    alt='intro'
                    priority
                    className={styles.image}
                />
                <div className={styles.wrapper}>
                    <div className={styles.textWrapper}>
                        <Typography
                            color='dark-blue'
                            fontWeight='bold'
                            className={openSans.className}>
                            Category
                        </Typography>
                        <Typography
                            color='gray'
                            fontWeight='regular'
                            className={openSans.className}
                            align='left'>
                            June 22, 2023
                        </Typography>
                    </div>
                    <Typography
                        variant='h2'
                        className={manrope.className}
                        align='left'>
                        Pitch termsheet backing validation focus release.
                    </Typography>
                </div>
            </div>
            <div className={styles.line} />
        </section>
    );
}

export default Intro;