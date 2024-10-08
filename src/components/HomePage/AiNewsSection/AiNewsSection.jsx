import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AiNewsSection = () => {
  const [aiNews, setAiNews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const apiKey = import.meta.env.VITE_NEWS_API_KEY;
      if (!apiKey) {
        throw new Error('API Key is missing. Please check your .env.local file.');
      }

      // Check local storage for cached news
      const cachedNews = localStorage.getItem('aiNews');
      if (cachedNews) {
        setAiNews(JSON.parse(cachedNews));
        setLoading(false);
        return;
      }

      // CoinMarketCap API endpoint for news
      const aiResponse = await axios.get(
        `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${apiKey}&limit=10`
      );

      // Assuming CoinMarketCap returns news articles within a `data` field
      const latestAiNews = aiResponse.data.data.slice(0, 10).map(coin => ({
        title: coin.name + ' - ' + coin.symbol,
        url: `https://coinmarketcap.com/currencies/${coin.slug}/`,
        urlToImage: coin.logo, // You might need to handle images differently depending on the API response
      }));

      setAiNews(latestAiNews);
      localStorage.setItem('aiNews', JSON.stringify(latestAiNews));
    } catch (error) {
      console.error('Error fetching AI news', error);
      setError('Error fetching AI news. Please try again later.');
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
    <div className="news-section-left">
      <div className="h2andlive">
        <h2>AI News</h2>
        <div className="live-indicator"></div>
      </div>
      {loading ? (
        <p>Loading AI news...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {aiNews.length > 0 ? (
            aiNews.map((article, index) => (
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
            <p>No AI news available at the moment.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default AiNewsSection;
