const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./responseResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/success': jsonHandler.getSuccess,
  '/badRequest': jsonHandler.getBadRequest,
  '/unauthorized': jsonHandler.getNotAllowed,
  '/forbidden': jsonHandler.getForbidden,
  '/internal': jsonHandler.getInternal,
  '/notImplemented': jsonHandler.getNotImplemented,
  notFound: jsonHandler.getBadRequest,
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);
  const acceptTypes = request.headers.accept.split(',');

  if (urlStruct[parsedUrl.pathname]) {
    if (params) {
      urlStruct[parsedUrl.pathname](request, response, acceptTypes, params);
    } else {
      urlStruct[parsedUrl.pathname](request, response, acceptTypes);
    }
  } else {
    urlStruct.notFound(request, response, params, acceptTypes);
  }
};

http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1: ${port}`);
