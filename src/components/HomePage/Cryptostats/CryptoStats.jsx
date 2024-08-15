import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function CryptoStats({id}) {
  const [btcData, setBtcData] = useState(null);
  const [ethData, setEthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCryptoData = async () => {
    try {
      const [btcResponse, ethResponse] = await Promise.all([
        axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart', {
          params: {
            vs_currency: 'usd',
            days: '1', // Last 24 hours
            localization: 'false',
          }
        }),
        axios.get('https://api.coingecko.com/api/v3/coins/ethereum/market_chart', {
          params: {
            vs_currency: 'usd',
            days: '1', // Last 24 hours
            localization: 'false',
          }
        })
      ]);

      setBtcData(btcResponse.data);
      setEthData(ethResponse.data);
    } catch (error) {
      setError('Error fetching cryptocurrency data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
    const intervalId = setInterval(fetchCryptoData, 60000); // Fetch every 10 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  if (loading) return <p>Loading cryptocurrency data...</p>;
  if (error) return <p>{error}</p>;

  const calculatePercentageChange = (data) => {
    if (!data.prices || data.prices.length < 2) return 0;

    const startPrice = data.prices[0][1];
    const endPrice = data.prices[data.prices.length - 1][1];
    return ((endPrice - startPrice) / startPrice * 100).toFixed(2);
  };

  const getChartData = (data, label) => ({
    labels: data.prices.map(price => new Date(price[0]).toLocaleTimeString()),
    datasets: [
      {
        label,
        data: data.prices.map(price => price[1]),
        fill: false,
        borderColor: '#4bc0c0',
        tension: 0.1
      }
    ]
  });

  return (
    <div className="crypto-stats" id={id}>
      <div className="crypto-section">
        <h2>Bitcoin (BTC)</h2>
        <p>Current Price: ${btcData?.prices[btcData.prices.length - 1][1].toLocaleString()}</p>
        <p>Change (24h): {calculatePercentageChange(btcData)}%</p>
        <p>{calculatePercentageChange(btcData) > 0 ? '🚀 Price is up!' : '📉 Price is down!'}</p>
        <Line data={getChartData(btcData, 'BTC Price Over Last 24 Hours')} />
      </div>
      <div className="crypto-section">
        <h2>Ethereum (ETH)</h2>
        <p>Current Price: ${ethData?.prices[ethData.prices.length - 1][1].toLocaleString()}</p>
        <p>Change (24h): {calculatePercentageChange(ethData)}%</p>
        <p>{calculatePercentageChange(ethData) > 0 ? '🚀 Price is up!' : '📉 Price is down!'}</p>
        <Line data={getChartData(ethData, 'ETH Price Over Last 24 Hours')} />
      </div>
    </div>
  );
}

export default CryptoStats;
