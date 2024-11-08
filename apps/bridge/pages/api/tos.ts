import type { NextApiRequest, NextApiResponse } from 'next';

// Array of two-letter country codes of European Union members (according to ISO 3166-1 alpha-2)
const EU_COUNTRIES = [
  'AT', // Austria
  'BE', // Belgium
  'BG', // Bulgaria
  'CY', // Cyprus
  'CZ', // Czech Republic
  'DE', // Germany
  'DK', // Denmark
  'EE', // Estonia
  'ES', // Spain
  'FI', // Finland
  'FR', // France
  'GB', // United Kingdom
  'GR', // Greece
  'HU', // Hungary
  'HR', // Croatia
  'IE', // Ireland
  'IT', // Italy
  'LT', // Lithuania
  'LU', // Luxembourg
  'LV', // Latvia
  'MT', // Malta
  'NL', // Netherlands
  'PL', // Poland
  'PT', // Portugal
  'RO', // Romania
  'SE', // Sweden
  'SI', // Slovenia
  'SK', // Slovakia
];


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const country = res.getHeader('x-cf-country') as string;
  const tosRegion = EU_COUNTRIES.includes(country) ? 'EU' : 'US';
  res.status(200).json({ tosRegion });
}
