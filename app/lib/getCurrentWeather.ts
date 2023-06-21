const url = process.env.BASE_URL;
const apiKey = process.env.API_KEY;

export default async function getCurrentWeather(searchTerm: string) {
    const searchParams = new URLSearchParams({
        location: searchTerm,
        apikey: `${apiKey}`,
    });

    const currentWeather = (
        await fetch(`${url}/realtime?` + searchParams)
    ).json();

    return currentWeather;
}
