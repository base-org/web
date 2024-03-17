/*
  Coinbase Client Analytics Lite is currently loaded via a Docusaurus script tag configured in docusaurus.config.js
  and initialized via a Docusaurus client module in ./initCCA.ts. @coinbase/cookie-manager hooks cannot be used in
  a Docusaurus client module, so we are temporarily using the below cookie management functions. This implementation
  will be adjusted once CCA becomes open source, as we'll then be able to cease use of the CCA Lite script and move
  the CCA implementation out of a client module so @coinbase/cookie-manager hooks can be used.
*/

export function setCookie(cookieName: string, cookieValue: string, expiryDays: number) {
  const d = new Date();
  d.setTime(d.getTime() + expiryDays * 24 * 60 * 60 * 1000);
  let expires = 'expires=' + d.toUTCString();
  document.cookie = cookieName + '=' + cookieValue + ';' + expires + ';path=/';
}

export function getCookie(cookieName: string): string | undefined {
  let name = cookieName + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (const el of ca) {
    let c = el;
    while (c.startsWith(' ')) {
      c = c.substring(1);
    }
    if (c.startsWith(name)) {
      return c.substring(name.length, c.length);
    }
  }
  return undefined;
}

export function deserializeCookie(cookie: string): string | undefined {
  let parsedCookie: string | undefined;

  try {
    parsedCookie = JSON.parse(cookie) as string;
  } catch (e) {
    parsedCookie = cookie;
  }

  return parsedCookie;
}
