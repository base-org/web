export function truncateMiddle(
  str: string,
  charactersAtFront: number,
  charactersAtEnd: number,
): string {
  const truncationString = '…';
  const trimmed = str.trim();

  if (trimmed.length <= charactersAtFront + charactersAtEnd + truncationString.length) {
    return str;
  }

  const startOfEnd = trimmed.length - charactersAtEnd;
  const firstChars = trimmed.substring(0, charactersAtFront);
  const lastChars = trimmed.substring(startOfEnd);

  return firstChars + truncationString + lastChars;
}
