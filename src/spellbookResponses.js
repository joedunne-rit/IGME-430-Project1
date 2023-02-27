const users = {};

const addSpellList = (request, response, spellListData) => {
    const userName = spellListData.userName;
    const listName = spellListData.listName;
    const spellList = spellListData.spells;
    
    //If username and list name already exist, just update spells
    if (users[userName][listName]){
        users[userName][listName] = spellList;
        //Send info to POST response method
        return;
    }
    //If username exists but list name doesnt, add new list name and spells
    if (users[userName]){
        users[userName][listName] = spellList;
        //send info
        return;
    }
    //Otherwise, create new user, spell list name, and write spells
    users[userName] = {
        [listName]: spellList
    };
    //send info
    return;
}

const loadSpellList = (request, response, data) => {
    if (!users[data.userName][data.listName]){
        const responseMessage = {message: 'data not found'};
        response.writeHead(401, {'Content-Type':'application/json'});
        response.write(responseMessage);
        response.end();
        return;
    }
    const listToLoad = users[data.userName][data.listName];
    const listResponse = {spellList: listToLoad};
    response.writeHead(200, {'Content-Type':'application/json'});
    response.write(JSON.stringify(listResponse));
    response.end();
    return;
}

module.exports.addSpellList = addSpellList;
module.exports.loadSpellList = loadSpellList;