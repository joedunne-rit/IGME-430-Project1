const http = require('http');
const url = require('url');
const query = require('querystring');

const pageHandler = require('./pageResponses.js');
const mediaHandler = require('./mediaResponses.js');
const javaScriptHandler = require('./javascriptResponses.js');
// const favoritesHandler = require('./favoriteResponses.js');
const spellBookHandler = require('./spellbookResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    // page & style files
    '/': pageHandler.getIndex,
    '/home.html': pageHandler.getIndex,
    '/app.html': pageHandler.getApp,
    '/favorites.html': pageHandler.getFavorites,
    '/documentation.html': pageHandler.getDocumentation,
    '/styles/default-styles.css': pageHandler.getStyle,

    // javascript files
    '/app-header.js': javaScriptHandler.getAppHeader,
    '/app-footer.js': javaScriptHandler.getAppFooter,
    '/app-nav.js': javaScriptHandler.getAppNav,
    '/app.js': javaScriptHandler.getApp,
    '/favorites.js': javaScriptHandler.getFavorites,
    '/search-result.js': javaScriptHandler.getSearchResult,
    '/storage.js': javaScriptHandler.getStorage,
    '/firebase.js': javaScriptHandler.getFirebase,
    '/spell-item.js': javaScriptHandler.getSpellItem,

    // media files
    '/images/spellbook.png': mediaHandler.getSpellBook,
    '/images/spellbook-ui.png': mediaHandler.getUI,

    // other endpoints
    '/loadSpells': spellBookHandler.loadSpellList,
    '/notFound': pageHandler.notFound,
    '/searchSpells': spellBookHandler.search,
  },
  HEAD: {
    '/notFound': pageHandler.notFoundHead,
    '/loadSpells': spellBookHandler.loadSpellHead,
  },
  POST: {
    // '/addFavorite': favoritesHandler.addFavorite,
    '/saveSpells': spellBookHandler.addSpellList,
  },
};

const handlePost = (request, response, parsedURL) => {
  const body = [];
  request.on('error', (err) => {
    console.dir(err);
    response.statusCode = 400;
    response.end();
  });
  request.on('data', (chunk) => {
    body.push(chunk);
  });
  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const bodyParams = query.parse(bodyString);
    urlStruct[request.method][parsedURL.pathname](request, response, bodyParams);
  });
};

const onRequest = (request, response) => {
  const parsedURL = url.parse(request.url);
  console.log(parsedURL.pathname);

  if (!urlStruct[request.method]) {
    return urlStruct.HEAD['/notFound'](request, response);
  }

  if (urlStruct[request.method][parsedURL.pathname]) {
    if (request.method === 'POST') {
      return handlePost(request, response, parsedURL);
    }
    return urlStruct[request.method][parsedURL.pathname](request, response);
  }
  return urlStruct[request.method]['/notFound'](request, response);
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
