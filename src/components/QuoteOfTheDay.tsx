import { useEffect, useState } from 'react';

import useTheme from '@hooks/useTheme';

interface Quote {
  id: number;
  quote: string;
  author: string;
}

const FALLBACK_QUOTE: Quote = {
  id: 0,
  quote: 'The only way to do great work is to love what you do.',
  author: 'Steve Jobs',
};

const QuoteOfTheDay = () => {
  const { hideQuote } = useTheme();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuote = async () => {
      const today = new Date().toDateString();
      const storedQuoteData = localStorage.getItem('daily_quote');

      if (storedQuoteData) {
        const { date, quote: storedQuote } = JSON.parse(storedQuoteData);
        if (date === today) {
          setQuote(storedQuote);
          setLoading(false);
          return;
        }
      }

      try {
        const response = await fetch('https://dummyjson.com/quotes/random');
        if (!response.ok) throw new Error('Failed to fetch quote');
        const data = await response.json();

        const newQuote: Quote = {
          id: data.id,
          quote: data.quote,
          author: data.author,
        };

        localStorage.setItem(
          'daily_quote',
          JSON.stringify({
            date: today,
            quote: newQuote,
          }),
        );

        setQuote(newQuote);
      } catch (error) {
        console.error('Error fetching quote:', error);
        setQuote(FALLBACK_QUOTE);
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, []);

  if (loading || hideQuote) return null;

  return (
    <div className="animate-fade-in mx-auto max-w-2xl px-4 text-center">
      <div className="relative rounded-xl border border-white/20 bg-black/20 p-6 shadow-lg backdrop-blur-md transition-all hover:bg-black/30">
        <blockquote className="relative">
          <p className="text-lg font-medium text-white/90 italic drop-shadow-md md:text-xl">
            "{quote?.quote}"
          </p>
          <footer className="mt-3 text-sm font-medium text-white/70 drop-shadow-sm">
            — {quote?.author}
          </footer>
        </blockquote>
      </div>
    </div>
  );
};

export default QuoteOfTheDay;
