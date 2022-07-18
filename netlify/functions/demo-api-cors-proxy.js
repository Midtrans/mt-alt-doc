const fetch = require('node-fetch');
/**
 * Cors Proxy to forward frontend API call to Midtrans API endpoint
 * implementation based on: https://github.com/Glifery/cors-proxy/blob/master/handler.js
 */
exports.handler = async function (event, context) {
  return new Promise(async (resolve, reject) => {
    let params = event.queryStringParameters;
    let { Host, host, Origin, origin, ...headers } = event.headers;

    console.log(event);
    console.log(`Got request with params:`, params);

    if (!params.url) {
      const errorResponse = {
        statusCode: 400,
        body: "Unable get url from 'url' query parameter",
      };
      resolve(errorResponse);
      return;
    }
    
    /**
     * @HACK: this CORS Proxy currently only allow request addressed to the whitelisted domains.
     * This is to avoid potential unathorized CORS requests from non Midtrans domain.
     * But the downside is call from our own dev env (localhost) will also be expected to 
     * be rejected.
     */
    let targetHostname = (new URL(params.url)).hostname;
    if(!targetHostname.includes("midtrans.co") && !targetHostname.includes("veritrans.co")){
      const errorResponse = {
        statusCode: 400,
        body: "Target URL Hostname is not allowed",
      };
      resolve(errorResponse);
      return;
    }

    const requestParams = Object.entries(params)
      .reduce((acc, param) => {
        if (param[0] !== 'url') acc.push(param.join('='));
        return acc;
      }, [])
      .join('&');

    const url = `${params.url}${requestParams}`;
    const hasBody = /(POST|PUT)/i.test(event.httpMethod);
    try {
      const res = await fetch(url, {
        method: event.httpMethod,
        timeout: 20000,
        body: hasBody ? event.body : null,
        headers,
      });
      console.log(`Got response from ${url} ---> {statusCode: ${res.status}}`);

      let proxyResponse = {
        statusCode: res.status,
        headers: {
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
          'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
          'content-type': res.headers['content-type'] || 'text/html',
        },
      };

      const body = await res.text();
      proxyResponse.body = body;
      resolve(proxyResponse);
    } catch (err) {
      console.error(`Caught error: `, err);

      reject(err);
      return;
    }
  });
};