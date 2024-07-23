export class JsonParseError extends Error {
  body: string;

  innerError: Error;

  constructor(innerError: Error, body: string) {
    super(`error: ${innerError.message} payload: ${body}`);
    this.innerError = innerError;
    this.body = body;
  }
}

export function parseJsonThrowingDescriptiveError(raw: string): unknown {
  try {
    return JSON.parse(raw);
  } catch (e) {
    throw new JsonParseError(e, raw);
  }
}
