const { createServer } = require("http");
const { URL } = require("url");
const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  const url = event.rawUrl.replace(/^.*\/cors-proxy\//, '');
  try {
    const res = await fetch(url);
    const body = await res.text();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': res.headers.get('content-type') || 'text/plain'
      },
      body
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: `Error: ${err.message}`
    };
  }
};
