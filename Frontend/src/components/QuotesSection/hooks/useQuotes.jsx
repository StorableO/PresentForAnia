import { useCallback, useEffect, useState } from "react";
import QuoteService from "../services/QuoteService";
import { quotesData } from "../../ResourcesInfo/quotes";

export const useQuotes = (initialFilters = {}) =>{
    const [quotes, setQuotes] = useState([]);
    const [loading, setloading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState(initialFilters);

    const fetchQuotes = useCallback( async () =>{
        setloading(true);
        setError(null);
        try{
            const response = await QuoteService.getAll({
                ...filters
            });
            setQuotes(response.data);
        }catch(err){
            setError(err.message);
            throw err;
        }finally{
            setloading(false);
        }

    }, [filters])

    useEffect(() => {
        fetchQuotes();
    }, [fetchQuotes]);

    const addQuote = async (quoteData) =>{
        setloading(true);
        setError(null);
        try{
            const response = await QuoteService.create(quoteData);
            await fetchQuotes();
            return response.data;
        }catch(err){
            setError(err.message);
            throw err;
        }finally{
            setloading(false)
        }
    }
    const getQuote = async (id) => {
        setloading(true);
        setError(null);
        try{
            const response = await QuoteService.getById(id);
            return response.data;
        }catch(err){
            setError(err.message);
            throw err;
        }finally{
            setloading(false);
        }

    }
    const deleteQuote = async (id) => {
        setloading(true);
        setError(null);
        try{
            const response = await QuoteService.delete(id);
            await fetchQuotes();
        }catch(err){
            setError(err.message);
            throw err;
        }finally{
            setloading(false);
        }
    }
    const likeQuote = async (id) => {
        try {
            const response = await quoteService.like(id);
            setQuotes(prev => prev.map(quote  =>
                quote.id === id ? {...quote, likes: response.data.likes} : quote
            ))
            return response.data;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };
    const updateFilters = (newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };
    const resetFilters = () => {
        setFilters({});
    };
    return {
        quotes,
        loading,
        error,
        filters,
        addQuote,
        deleteQuote,
        likeQuote,
        fetchQuotes,
        updateFilters,
        resetFilters
    };


    // useEffect(() => {

    // })

}

