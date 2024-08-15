import React, { useEffect, useRef } from 'react';

const StatsSection = ({id}) => {
  const statsRef = useRef([]);
  
  const stats = [
    { title: 'Blockchain', value: 5000, description: 'Active Blockchain Projects', icon: '🔗' },
    { title: 'NFTs', value: 10000000, description: 'NFTs Minted', icon: '🎨' },
    { title: 'AI', value: 1200, description: 'AI Research Papers Published', icon: '🤖' },
    { title: 'Crypto', value: 4000, description: 'Cryptocurrencies Available', icon: '💰' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = entry.target.dataset.index;
          animateValue(statsRef.current[index], 0, stats[index].value, 2000);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 }); //it triggers when 50% of the element is visible

    statsRef.current.forEach((statElement) => {
      if (statElement) {
        observer.observe(statElement);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [stats]);

  const animateValue = (element, start, end, duration) => {
    let startTime = null;
    
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      element.textContent = Math.floor(progress * (end - start) + start).toLocaleString() + '+';
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  return (
    <section className="stats-section" id={id}>
      <div className="container">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <h3 className="stat-title">{stat.title}</h3>
            <p
              className="stat-value"
              ref={(el) => (statsRef.current[index] = el)}
              data-index={index}
            >
              0
            </p>
            <p className="stat-description">{stat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
