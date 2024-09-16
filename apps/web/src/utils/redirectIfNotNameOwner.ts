import { BaseName } from '@coinbase/onchainkit/identity';
import {
  getBasenameAddress,
  getBasenameEditor,
  getBasenameOwner,
} from 'apps/web/src/utils/usernames';
import { redirect } from 'next/navigation';

export async function redirectIfNotNameOwner(username: BaseName) {
  const address = await getBasenameAddress(username);
  const editor = await getBasenameEditor(username);
  const owner = await getBasenameOwner(username);

  // Domain does have address or editor (ie: doesn't exist)
  if (!address || !editor || !owner) {
    redirect(`/name/not-found?name=${username}`);
  }
}
