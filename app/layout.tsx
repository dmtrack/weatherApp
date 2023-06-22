import React from 'react';

import Header from './components/Header';
import Footer from './components/Footer';

import './styles/reset.scss';
import './styles/globals.scss';
import Search from './components/Search';

export const metadata = {
    title: 'wOracle',
    description: 'Here you can check a weather from oracle',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <body>
                <Header />
                <Search />
                {children}
                <Footer />
            </body>
        </html>
    );
}
