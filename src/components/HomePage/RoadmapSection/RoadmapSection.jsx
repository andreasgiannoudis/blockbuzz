import React from 'react';

function RoadmapSection() {
  const roadmapItems = [
    {
      projectVersion: 'Version 1',
      description: 'This version includes the initial launch features such as AI news, Blockchain news, BTC/ETH prices, Crypto stats, and a newsletter CTA.',
      features: [
        'AI, Blockchain, Cryptocurrency news',
        'Crypto prices',
        'Crypto stats',
        'Newsletter'
      ],
      isActive: true
    },
    {
      projectVersion: 'Version 2',
      description: 'Future version with enhanced features and additional sections like a user dashboard, in-depth analytics, and community forums.',
      features: [
        'User Dashboard',
        'Advanced Analytics',
        'Mobile Optimization',
        'More Integrations'
      ],
      isActive: false 
    }
  ];

  return (
    <section className="roadmap-section">
      <div className="container">
        <h2>BlockBuzz Roadmap</h2>
        <div className="roadmap-container">
          {roadmapItems.map((item, index) => (
            <div
              key={index}
              className={`roadmap-item ${item.isActive ? 'active' : 'inactive'}`}
            >
              <h3>{item.projectVersion}</h3>
              <p>{item.description}</p>
              <ul className="features-list">
                {item.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RoadmapSection;
