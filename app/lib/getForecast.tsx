const url = process.env.BASE_URL;
const apiKey = process.env.API_KEY;

export default async function GetForecast(searchTerm: string, days: number) {
    const searchParams = new URLSearchParams({
        key: `${apiKey}`,
        q: searchTerm,
        days: String(days),
        alerts: 'no',
        aqi: 'no',
    });
    const urlTest = `${url}/current.json?` + searchParams;
    console.log(urlTest);

    const fiveDayForecast = (
        await fetch(`${url}/current.json?` + searchParams)
    ).json();

    return fiveDayForecast;
}
