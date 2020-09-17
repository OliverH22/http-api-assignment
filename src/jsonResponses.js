const respondJSON = (request, response, status, object, acceptedTypes) => {
  const head = {
    'Content-Type': acceptedTypes,
  };
    
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <id>${object.id}</id>`;
    responseXML = `${responseXML} <output>${object.message}</output>`;
    responseXML = `${responseXML} </response>`;

    response.writeHead(status, head);
    response.write(responseXML);
    response.end();
  } else {
    response.writeHead(status, head);
    response.write(JSON.stringify(object));
    response.end();
  }
};

const respondJSONMeta = (request, response, status, acceptedTypes) => {
  const head = {
    'Content-Type': acceptedTypes,
  };
  response.writeHead(status, head);
  response.end();
};

const getSuccess = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  respondJSON(request, response, 200, responseJSON);
};


const getGoodRequest = (request, response, acceptedTypes) => respondJSONMeta(request, response, 200, acceptedTypes);

const getBadRequest = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!acceptedTypes.valid || acceptedTypes.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true',
    responseJSON.id = 'badRequest';

    return respondJSON(request, response, 400, responseJSON);
  }
  return respondJSON(request, response, 200, responseJSON);
};

const getBadRequest = (request, response, acceptedTypes) => respondJSONMeta(request, response, 400, acceptedTypes);

const getNotFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON);
};

const getNotFoundRequest = (request, response, acceptedTypes) => respondJSONMeta(request, response, 404, acceptedTypes);

const getNotAllowed = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'Success, Now have access',
    id: 'Success',
  };
  if (!params || params !== 'yes') {
    responseJSON.message = 'You are blocked from access',
    responseJSON.id = 'unauthorized';

    return respondJSON(request, response, 401, responseJSON, acceptedTypes);
  }
  return respondJSON(request, response, 200, responseJSON, acceptedTypes);
};

const getNotAllowedRequest = (request, response, acceptedTypes) => respondJSONMeta(request, response, 401, acceptedTypes);

const getForbidden = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'Forbidden Access',
    id: 'Forbidden',
  };
  return respondJSON(request, response, 403, responseJSON, acceptedTypes);
};

const getForbiddenRequest = (request, response, acceptedTypes) => respondJSONMeta(request, response, 403, acceptedTypes);

const getInternal = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'An Internal Error',
    id: 'Internal Error',
  };
  return respondJSON(request, response, 500, responseJSON, acceptedTypes);
};

const getInternalRequest = (request, response, acceptedTypes) => respondJSONMeta(request, response, 500, acceptedTypes);

const notImplemented = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'Items have not been created',
    id: 'Not Implemented',
  };
  return respondJSON(request, response, 501, responseJSON, acceptedTypes);
};

const getNotImplementedRequest = (request, response, acceptedTypes) => respondJSONMeta(request, response, 501, acceptedTypes);

module.exports.getSuccess = getSuccess;
module.exports.getBadRequest = getBadRequest;
module.exports.getNotFound = getNotFound;
module.exports.getNotAllowed = getNotAllowed;
module.exports.getForbidden = getForbidden;
module.exports.getInternal = getInternal;
module.exports.getNotImplemented = getNotImplemented;
