import cn from 'classnames';
import Link from 'next/link';

import openSans from '../../utils/fonts/openSans';
import { footerLinkList } from '../../utils/constants';

import Typography from '../Typography';

import styles from './Footer.module.scss';

// import Logo from '../Logo';classnames

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.leftColumn}>
                    {/* <Logo /> */}
                    <Typography
                        color='gray'
                        className={cn(styles.text, openSans.className)}
                        align='left'>
                        Social media validation business model canvas graphical
                        user interface launch party creative facebook iPad
                        twitter.
                    </Typography>
                    <Typography
                        color='gray'
                        className={cn(styles.copyright, openSans.className)}
                        align='left'>
                        All rights reserved.
                    </Typography>
                </div>
                <div className={styles.rightColumn}>
                    {Object.entries(footerLinkList).map(([key, list]) => (
                        <div className={styles.wrapper} key={key}>
                            <Typography
                                className={cn(openSans.className, styles.text)}
                                fontWeight='bold'
                                align='left'>
                                {key}
                            </Typography>
                            <ul className={styles.list}>
                                {list.map(({ id, href, text, isHiring }) => (
                                    <li key={id} className={styles.item}>
                                        <Link
                                            href={href}
                                            className={cn(
                                                openSans.className,
                                                styles.link
                                            )}>
                                            {text}
                                        </Link>
                                        {isHiring && (
                                            <span
                                                className={cn(
                                                    styles.hire,
                                                    openSans.className
                                                )}>
                                                Hiring!
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </footer>
    );
}

export default Footer;
