import { getAccessToken } from 'apps/web/src/utils/googleApi/googleApiOAuth2';

const spreadsheetId = '1iI0enA0PoynuptKUkqFBPDH5dN4fLEDJI2ss9FWiTZo';

type GetValuesResponseType = {
  majorDimension: 'ROWS' | 'COLUMNS';
  range: string;
  values: string[][];
};

type GetBatchValuesResponseType = {
  spreadsheetId: string;
  valueRanges: GetValuesResponseType[];
};

export default async function getApplicationStatusByBasename(basename: string | undefined) {
  const applicationRowIndexes = await getApplicationsByBasename(basename);
  if (applicationRowIndexes.length === 0) {
    return null;
  }
  let url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?`;
  for (const rowIndex of applicationRowIndexes) {
    url += `ranges=A${rowIndex}:L${rowIndex}&`;
  }
  url += '&majorDimension=ROWS&valueRenderOption=FORMATTED_VALUE';

  const response = (await getBatchValuesFromGoogleSheet(url)) as GetBatchValuesResponseType;
  return response.valueRanges.map((val) => val.values);
}

async function getApplicationsByBasename(basename: string | undefined) {
  const sheetId = 'Sheet1';
  const cellRef = 'B2:B';
  const range = `${sheetId}!${cellRef}`;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`;
  if (!basename) {
    return [];
  }

  try {
    const res = await getValuesFromGoogleSheet(url);
    const basenameArray = res.values;
    const applicationMatches: number[] = [];
    for (let i = basenameArray.length; i >= 0; i--) {
      if (basenameArray[i] && basenameArray[i][0] === basename) {
        applicationMatches.push(i + 2); // +2 == +1 because of 0-indexing, +1 because of skipping top-row
      }
    }
    return applicationMatches;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

async function getBatchValuesFromGoogleSheet(requestUrl: string) {
  const accessToken = await getAccessToken();
  const config = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await fetch(requestUrl, config);
    if (!res.ok) {
      throw new Error(`HTTP error. Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Could not get values from Google Sheets');
  }
}

async function getValuesFromGoogleSheet(requestUrl: string): Promise<GetValuesResponseType> {
  const accessToken = await getAccessToken();
  const config = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await fetch(requestUrl, config);
    if (!res.ok) {
      throw new Error(`HTTP error. Status: ${res.status}`);
    }
    const data = (await res.json()) as GetValuesResponseType;
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Could not get values from Google Sheets');
  }
}
