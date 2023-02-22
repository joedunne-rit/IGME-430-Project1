const fs = require('fs');

const spellBook = fs.readFileSync(`${__dirname}/../media/spellbook.png`);
const ui = fs.readFileSync(`${__dirname}/../media/spellbook-ui.png`);

const getSpellBook = (request, response) => {
    response.writeHead(200, {'Content-Type':'image/png'});
    response.write(spellBook);
    response.end();
}

const getUI = (request,response) => {
    response.writeHead(200, {'Content-Type':'image/png'});
    response.write(ui);
    response.end();
}

module.exports.getSpellBook = getSpellBook;
module.exports.getUI = getUI;