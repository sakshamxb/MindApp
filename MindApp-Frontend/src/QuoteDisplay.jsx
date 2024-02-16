import React, { useState, useEffect } from 'react';

function QuoteDisplay() {
  const [quote, setQuote] = useState({ quoteText: '', quoteAuthor: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch('https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en');
        if (!response.ok) {
          throw new Error(`Error fetching quote: ${response.status}`);
        }
        const data = await response.json();
        setQuote({ quoteText: data.quoteText, quoteAuthor: data.quoteAuthor });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuote();
  }, []);

  return (
    <div>
      {isLoading && <p>Loading quote...</p>}
      {error && <p>Error: {error}</p>}
      {!isLoading && !error && (
        <div>
          <p>{quote.quoteText}</p>
          <span>- {quote.quoteAuthor}</span>
        </div>
      )}
    </div>
  );
}

export default QuoteDisplay;
