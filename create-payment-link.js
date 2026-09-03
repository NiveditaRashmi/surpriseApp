// create-payment-link.js
// Run once with: node create-payment-link.js

const KEY_ID = 'rzp_test_TXHBWnErfQ0lpH';       // from Settings > API Keys
const KEY_SECRET = 'wBglOkgeA5CiwcbjsmuTk98f';

const auth = Buffer.from(`${KEY_ID}:${KEY_SECRET}`).toString('base64');

fetch('https://api.razorpay.com/v1/payment_links', {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${auth}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    upi_link: false,
    amount: 1000,          // in paise — 1000 = INR 10.00, matching your screenshot
    currency: 'INR',
    description: 'Date dress',
    callback_url: 'https://surprise-hubb.netlify.app/ending',  // <-- replace with your real deployed URL
    callback_method: 'get'
  })
})
  .then(res => res.json())
  .then(data => {
    console.log('New Payment Link:', data.short_url);
  })
  .catch(err => console.error('Error:', err));