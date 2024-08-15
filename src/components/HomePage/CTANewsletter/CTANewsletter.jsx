import React, { useState } from 'react';

function CTANewsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    //client-side validation logic
    if (!emailIsValid(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    //sanitize and send the email to the server
    const sanitizedEmail = sanitizeInput(email);

    //call to a backend service for subscription
    subscribeToNewsletter(sanitizedEmail);
  };

  const emailIsValid = (email) => {
    //simple regex for validating email format
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const sanitizeInput = (input) => {
    const tempDiv = document.createElement('div');
    tempDiv.textContent = input;
    return tempDiv.innerHTML;
  };

  const subscribeToNewsletter = (email) => {
    console.log('Subscribed with:', email);
  };

  return (
    <section className="cta-newsletter">
      <div className="container">
        <h2 className="cta-title">Stay Updated with Our Newsletter</h2>
        <p className="cta-description">
          Subscribe to our newsletter to get the latest news, updates, and insights about web3, blockchain, and crypto directly to your inbox.
        </p>
        <form className="cta-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="cta-input"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="cta-button">Subscribe</button>
        </form>
      </div>
    </section>
  );
}

export default CTANewsletter;
