import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";


export const quotesApi = createApi({
    reducerPath: 'quotesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://favqs.com/api/qotd' }),
    endpoints: ( builder ) => ({
        getQuotes: builder.query({
            query: () => ``,
        }),
        updateQuotes: builder.mutation({
            query: () => '',
        })
    }),
});

export const { useGetQuotesQuery, useUpdateQuotesMutation } = quotesApi;