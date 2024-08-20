import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BlockchainNewsSection = ({ id }) => {
  const [blockchainNews, setBlockchainNews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const apiKey = import.meta.env.VITE_NEWS_API_KEY;
      if (!apiKey) {
        throw new Error('API Key is missing. Please check your .env.local file.');
      }

      // Check local storage for cached news
      const cachedNews = localStorage.getItem('blockchainNews');
      if (cachedNews) {
        setBlockchainNews(JSON.parse(cachedNews));
        setLoading(false);
        return;
      }

      // Using CoinMarketCap API for news (adjust the endpoint if necessary)
      const blockchainResponse = await axios.get(
        `https://pro-api.coinmarketcap.com/v1/cryptocurrency/news?CMC_PRO_API_KEY=${apiKey}&limit=10`
      );

      // Assuming the API returns articles in a `data` array
      const latestBlockchainNews = blockchainResponse.data.data.slice(0, 10).map(article => ({
        title: article.title,
        url: article.url,
        urlToImage: article.image_url, // Assuming there's an image URL field
      }));

      setBlockchainNews(latestBlockchainNews);
      localStorage.setItem('blockchainNews', JSON.stringify(latestBlockchainNews));
    } catch (error) {
      console.error('Error fetching Blockchain news', error);
      setError('Error fetching Blockchain news. Please try again later.');
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
    <div className="news-section-right" id={id}>
      <div className="h2andlive">
        <h2>Blockchain News</h2>
        <div className="live-indicator"></div>
      </div>
      {loading ? (
        <p>Loading Blockchain news...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {blockchainNews.length > 0 ? (
            blockchainNews.map((article, index) => (
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

export default BlockchainNewsSection;
