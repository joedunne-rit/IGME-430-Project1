const users = {};
const urlBase = 'https://api.open5e.com/spells';

// Constructs a response based on the required status/message
const respond = (request, response, status, message) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(message));
  response.end();
};

// Saves a new spell list under a username and list name
const addSpellList = (request, response, spellListData) => {
  const userName = spellListData.name;
  const listName = spellListData.list;
  const spellList = JSON.parse(spellListData.spells);
  const responseMessage = {
    message: 'User name and list name required',
  };

  if (!userName || !listName) {
    responseMessage.id = 'missingParams';
    respond(request, response, 400, responseMessage);
    return;
  }

  // If username and list name already exist, just update spells
  if (users[userName]) {
    if (users[userName][listName]) {
      users[userName][listName] = spellList;
      // Send info to POST response method
      responseMessage.message = 'List updated';
      respond(request, response, 204, responseMessage);
      return;
    }
    // If username exists but list name doesnt, add new list name and spells
    users[userName][listName] = spellList;
    // send info
    responseMessage.message = 'New list saved';
    respond(request, response, 204, responseMessage);
    return;
  }
  // Otherwise, create new user, spell list name, and write spells
  users[userName] = {
    [listName]: spellList,
  };
  // send info
  responseMessage.message = 'New user/list created';
  respond(request, response, 201, responseMessage);
};

// Takes a currently saved list and sends it back in a response
const loadSpellList = (request, response) => {
  const params = new URLSearchParams(request.url);
  const userName = params.get('/loadSpells?name');
  const listName = params.get('list');
  console.log(userName);
  console.log(listName);
  if (users[userName]) {
    if (users[userName][listName]) {
      const listToLoad = users[userName][listName];
      response.writeHead(200, { 'Content-Type': request.headers.accept });
      response.write(JSON.stringify(listToLoad));
      response.end();
      return;
    }
  }
  const responseMessage = { message: 'data not found', id: 'notFound' };
  response.writeHead(404, { 'Content-Type': request.headers.accept });
  response.write(JSON.stringify(responseMessage));
  response.end();
};

// Same as previous method, but only returns the header
const loadSpellHead = (request, response) => {
  const params = new URLSearchParams(request.url);
  const userName = params.get('/loadSpells?name');
  const listName = params.get('list');
  if (users[userName]) {
    if (users[userName][listName]) { response.writeHead(200, { 'Content-Type': request.headers.accept }); }
  } else { response.writeHead(404, { 'Content-Type': request.headers.accept }); }
  response.end();
};

// Searches for spells and returns data
const search = async (request, response) => {
    const params = new URLSearchParams(request.url);
    let constructedURL = params.get('/searchSpells?url');
    if(params.get('dnd_class') != null)
    {constructedURL = constructedURL + `&dnd_class=${params.get('dnd_class')}`;}
    if(params.get('school') != null)
    {constructedURL = constructedURL + `&school=${params.get('school')}`;}
    if(params.get('level_int__iexact') != null)
    {constructedURL = constructedURL + `&level_int__iexact=${params.get('level_int__iexact')}`;}
    if(params.get('concentration') != null)
    {constructedURL = constructedURL + `&concentration=${params.get('concentration')}`;}
    constructedURL = constructedURL + `&limit=${params.get('limit')}`;
    const url = urlBase + constructedURL;
    console.log(url);

    // await ("stay on this line") until the first promise is resolved, meaning the data has downloaded
    // note: default limit for open5e is 50 results unless otherwise specified
    const response2 = await fetch(url);

    // await ("stay on this line") until the second promise is resolved, meaning we now have a JSON object
    const searchResult = await response2.json();
    
    response.writeHead(200, { 'Content-Type': request.headers.accept });
    response.write(JSON.stringify(searchResult));
    response.end();
}

module.exports.addSpellList = addSpellList;
module.exports.loadSpellList = loadSpellList;
module.exports.loadSpellHead = loadSpellHead;
module.exports.search = search;
