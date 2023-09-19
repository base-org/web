import type { NextApiRequest, NextApiResponse } from 'next';

const EU_COUNTRIES = [
  'AT',
  'BE',
  'BG',
  'CY',
  'CZ',
  'DE',
  'DK',
  'EE',
  'ES',
  'FI',
  'FR',
  'GB',
  'GR',
  'HU',
  'HR',
  'IE',
  'IT',
  'LT',
  'LU',
  'LV',
  'MT',
  'NL',
  'PL',
  'PT',
  'RO',
  'SE',
  'SI',
  'SK',
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const country = res.getHeader('x-cf-country') as string;
  const tosRegion = EU_COUNTRIES.includes(country) ? 'EU' : 'US';
  res.status(200).json({ tosRegion });
}
