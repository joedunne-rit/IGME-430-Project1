const users = {};

const respond = (request, response, status, message) => {
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(message));
    response.end();
}

const addSpellList = (request, response, spellListData) => {
    const userName = spellListData.name;
    const listName = spellListData.list;
    const spellList = JSON.parse(spellListData.spells);
    const responseMessage = {
        message: 'User name and list name required'
    };

    if (!userName || !listName){
        responseMessage.id = 'missingParams';
        respond(request, response, 400, responseMessage);
        return;
    }
    
    //If username and list name already exist, just update spells
    if (users[userName]){
        if (users[userName][listName])
        {
            users[userName][listName] = spellList;
            //Send info to POST response method
            responseMessage.message = 'List updated';
            respond(request, response, 204, responseMessage)
            return;
        } else {
            //If username exists but list name doesnt, add new list name and spells
            users[userName][listName] = spellList;
            //send info
            responseMessage.message = 'New list saved';
            respond(request, response, 204, responseMessage)
            return;
        }
    }
    //Otherwise, create new user, spell list name, and write spells
    users[userName] = {
        [listName]: spellList
    };
    //send info
    responseMessage.message = 'New user/list created';
    respond(request, response, 201, responseMessage);
    return;
}

const loadSpellList = (request, response) => {
    const userName = request.headers.name;
    const listName = request.headers.list;
    if (users[userName]){
        if (users[userName][listName]){
        const listToLoad = users[userName][listName];
        response.writeHead(200, {'Content-Type':'application/json'});
        response.write(JSON.stringify(listToLoad));
        response.end();
        return;  
        }
    }
    const responseMessage = {message: 'data not found', id: 'notFound'};
    response.writeHead(404, {'Content-Type':'application/json'});
    response.write(JSON.stringify(responseMessage));
    response.end();
    return;
}

const loadSpellHead = (request, response) => {
    if (users[userName])
    {
        if (users[userName][listName]){response.writeHead(200, {'Content-Type':'application/json'});}
    } else { response.writeHead(404, {'Content-Type':'application/json'});}
    response.end();
}

module.exports.addSpellList = addSpellList;
module.exports.loadSpellList = loadSpellList;