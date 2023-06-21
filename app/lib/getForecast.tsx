const url = process.env.BASE_URL;
const apiKey = process.env.API_KEY;

export default async function getForecast(searchTerm: string) {
    const searchParams = new URLSearchParams({
        apikey: `${apiKey}`,
        location: searchTerm,
        timesteps: '1d',
    });
    const urlTest = `${url}/forecast?` + searchParams;

    const fiveDayForecast = (
        await fetch(`${url}/forecast?` + searchParams)
    ).json();

    return fiveDayForecast;
}
