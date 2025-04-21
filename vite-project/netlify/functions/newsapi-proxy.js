
const fetch = require('node-fetch'); // Node.js fetch module, needed for calling the API

exports.handler = async function(event, context) {
    const apiKey = process.env.VITE_NEWS_API_KEY;
  
  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data), 
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error fetching data from NewsAPI', error: error.message }),
    };
  }
};
