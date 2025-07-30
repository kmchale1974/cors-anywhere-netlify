const handler = async (event) => {
  const targetUrl = decodeURIComponent(event.path.replace("/.netlify/functions/cors-proxy/", ""));
  try {
    const response = await fetch(targetUrl, {
      method: event.httpMethod,
      headers: { ...event.headers, host: new URL(targetUrl).host }
    });
    const data = await response.text();
    return {
      statusCode: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': response.headers.get('content-type') || 'text/plain'
      },
      body: data
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: 'Error fetching ' + targetUrl + ': ' + err.message
    };
  }
};
export { handler };
