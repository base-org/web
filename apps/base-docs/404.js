const font =
  '<style type="text/css">@font-face { font-family: "CoinbaseFont"; src: url("/fonts/CoinbaseSans-Regular.woff2") format("woff2"); }</style>';

const cssFile = '<link rel="stylesheet" href="/css/404-styles.css">';

const h1 = '<h1>404 | This page could not be found</h1>';

const button = '<a class="back-link" href="/">Back to Base Docs</a>';

exports.html = `${font}${cssFile}${h1}<div class='button-container'>${button}</div>`;
