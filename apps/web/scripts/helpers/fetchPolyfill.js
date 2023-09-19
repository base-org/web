// fetch-polyfill.js
function fetch(...args) {
  return import('node-fetch').then(({ default: _fetch }) => _fetch(...args));
}

if (!globalThis.fetch) {
  globalThis.fetch = fetch;
  globalThis.Headers = fetch.Headers;
  globalThis.Request = fetch.Request;
  globalThis.Response = fetch.Response;
}
