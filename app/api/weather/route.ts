import { NextResponse } from 'next/server';

const url = process.env.BASE_URL;
const apiKey = process.env.API_KEY;

export async function GET(request: Request) {
    const searchData = request.url.slice(request.url.lastIndexOf('/') + 1);

    const searchParams = new URLSearchParams({
        location: 'Moscow',
        apikey: `${apiKey}`,
    });
    const currentWeather = await fetch(`${url}/realtime?` + searchParams);
    console.log('test', currentWeather.json());
    return NextResponse.json(currentWeather);
}
