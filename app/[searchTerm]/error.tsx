'use client'; // Error components must be Client components

import { useEffect } from 'react';
import Link from 'next/link';
import Typography from '../components/Typography';
import styles from '../components/Intro/Intro.module.scss';
import openSans from '../utils/fonts/openSans';

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <>
            <section className={styles.section}>
                <div className={styles.topContainer}>
                    <Typography
                        variant='h3'
                        align='center'
                        className={openSans.className}
                        color='dark-blue'>
                        404 | Something went wrong..
                    </Typography>
                </div>
            </section>
        </>
    );

    // return (
    //     <main className='bg-slate-200 mx-auto max-w-lg py-1 px-4 min-h-screen'>
    //         <h2 className='my-4 text-2xl font-bold'>Something went wrong!</h2>
    //         <button
    //             className='mb-4 p-4 bg-red-500 text-white rounded-xl'
    //             onClick={
    //                 // Attempt to recover by trying to re-render the segment
    //                 () => reset()
    //             }>
    //             Try again
    //         </button>
    //         <p className='text-xl'>
    //             Or go back to{' '}
    //             <Link href='/' className='underline'>
    //                 Home 🏠
    //             </Link>
    //         </p>
    //     </main>
    // );
}
