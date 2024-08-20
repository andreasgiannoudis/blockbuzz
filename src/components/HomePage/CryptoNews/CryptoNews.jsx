import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CryptoNews = () => {
  const [cryptoNews, setCryptoNews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const apiKey = import.meta.env.VITE_NEWS_API_KEY;
      if (!apiKey) {
        throw new Error('API Key is missing. Please check your .env.local file.');
      }

      // Check local storage for cached news
      const cachedNews = localStorage.getItem('cryptoNews');
      if (cachedNews) {
        setCryptoNews(JSON.parse(cachedNews));
        setLoading(false);
        return;
      }

      // Fetching cryptocurrency news from CoinMarketCap API
      const cryptoResponse = await axios.get(
        `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${apiKey}&limit=10`
      );

      // Mapping the response to match the expected structure
      const latestCryptoNews = cryptoResponse.data.data.map((crypto) => ({
        title: crypto.name + " (" + crypto.symbol + ") - Latest Update",
        url: `https://coinmarketcap.com/currencies/${crypto.slug}/`,
        urlToImage: `https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`,
      }));

      setCryptoNews(latestCryptoNews);
      localStorage.setItem('cryptoNews', JSON.stringify(latestCryptoNews));
    } catch (error) {
      console.error('Error fetching Cryptocurrency news', error);
      setError('Error fetching Cryptocurrency news. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();

    // Set up interval to fetch news every 60 seconds
    const intervalId = setInterval(fetchNews, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="news-section-right">
      <div className="h2andlive">
        <h2>Cryptocurrency News</h2>
        <div className="live-indicator"></div>
      </div>
      {loading ? (
        <p>Loading Cryptocurrency news...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {cryptoNews.length > 0 ? (
            cryptoNews.map((article, index) => (
              <li key={index}>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.urlToImage && (
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className="news-image"
                    />
                  )}
                  <p>{article.title}</p>
                </a>
              </li>
            ))
          ) : (
            <p>No news available at the moment.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default CryptoNews;
