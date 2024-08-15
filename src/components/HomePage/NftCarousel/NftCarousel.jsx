import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NftCarousel = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_OPENSEA_API_KEY; // Ensure this is set in your .env file
  const collectionSlug = 'boredapeyachtclub';

  useEffect(() => {
    const fetchNfts = async () => {
      try {
        const response = await axios.get(
          'https://api.opensea.io/api/v2/collections/$collectionSlug',
          {
            params: {
              order_direction: 'desc',
              offset: '0',
              limit: '10',
              collection: collectionSlug,
            },
            headers: {
              'X-API-KEY': apiKey,
            },
          }
        );
        setNfts(response.data.assets);
      } catch (error) {
        setError('Error fetching NFTs');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNfts();
  }, [apiKey]);

  if (loading) return <p>Loading NFTs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="nft-display">
      <h2>Photography NFTs</h2>
      <div className="nft-list">
        {nfts.length > 0 ? (
          nfts.map((nft) => (
            <div key={nft.id} className="nft-item">
              <img
                src={nft.image_url || '/placeholder.png'}
                alt={nft.name}
                className="nft-image"
              />
              <div className="nft-info">
                <h3>{nft.name}</h3>
                <p>{nft.description}</p>
                <a
                  href={nft.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on OpenSea
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>No NFTs found</p>
        )}
      </div>
    </div>
  );
};

export default NftCarousel;
