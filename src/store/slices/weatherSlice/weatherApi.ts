import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";


export const weatherApi = createApi({
    reducerPath: 'weatherApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.openweathermap.org/data/2.5/weather?q=Minsk&lang=ru&appid=d848b27ed150b45324fd96c7d2b6fa16&units=metric' }),
    endpoints: ( builder ) => ({
        getWeather: builder.query({
            query: () => ``,
        }),
    }),
});

export const { useGetWeatherQuery } = weatherApi;