import { Inter } from 'next/font/google';
import React from 'react';
import Intro from './components/Intro';
import Order from './components/Search';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    return (
        <main>
            <Order />
            <Intro />
        </main>
    );
}
