const http = require('http');
const url = require('url');
// const query = require('querystring');

const pageHandler = require('./pageResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    '/': pageHandler.getIndex,
    '/style.css': pageHandler.getStyle,
    '/notFound': pageHandler.notFound,
  },
  HEAD: {
    '/notFound': pageHandler.notFoundHead
  },
  POST: {

  },
};

const onRequest = (request, response) => {
  const parsedURL = url.parse(request.url);
  console.log(parsedURL.pathname);

  if (!urlStruct[request.method]) {
    return urlStruct.HEAD['/notFound'](request, response);
  }

  if (urlStruct[request.method][parsedURL.pathname]) {
    return urlStruct[request.method][parsedURL.pathname](request, response);
  }
  return urlStruct[request.method]['/notFound'](request, response);
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
