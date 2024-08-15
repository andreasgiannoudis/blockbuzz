import React, { useEffect } from 'react';
import HeroSection from './HeroSection/HeroSection';
import AiNewsSection from './AiNewsSection/AiNewsSection';
import BlockchainNewsSection from './BlockchainNewsSection/BlockchainNewsSection';
import CryptoNews from './CryptoNews/CryptoNews';
import NftCarousel from './NftCarousel/NftCarousel';
import CryptoStats from './Cryptostats/CryptoStats';
import StatsSection from './StatsSection/StatsSection';
import CTANewsletter from './CTANewsletter/CTANewsletter';
import RoadmapSection from './RoadmapSection/RoadmapSection';



import anime from 'animejs';

const HomePage = () => {
  useEffect(() => {
    anime({
      targets: '.news-section .news-section-left, .news-section .news-section-right',
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutQuad',
      delay: anime.stagger(300), // 300 mseconds delay between animations of each section
    });
  }, []);

  return (
    <main className="main-content">
      <HeroSection />
      <div className="news-section">    
          <AiNewsSection />       
          <BlockchainNewsSection id="news"/>
          <CryptoNews />
      </div>
      {/* <NftCarousel /> */}
      <CryptoStats id='crypto' />
      <StatsSection id='stats'/>
      <RoadmapSection />
      <CTANewsletter />
    </main>
  );
};

export default HomePage;
