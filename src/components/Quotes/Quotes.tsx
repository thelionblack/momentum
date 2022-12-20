import React from 'react';
import {useGetQuotesQuery, useUpdateQuotesMutation} from "../../store/slices/quotesSlice/quotesApi";

const Quotes = () => {
    const { data, isFetching, refetch, ...r } = useGetQuotesQuery('');


    const handlerUpdateQuotes = () => {
        refetch();
    }

    return (
        <>
            <div
                className={isFetching ? `loader animation` : 'loader'}
                onClick={handlerUpdateQuotes}
            >loading</div>
            <figure className="quote">
                <blockquote>{!isFetching ? data.quote.author : '...'}</blockquote>
                <figcaption>{!isFetching ? data.quote.body : '...'}</figcaption>
            </figure>
        </>
    );
};

export default Quotes;