export const verbs = [
  'Games',
  'Lending',
  'DEXs',
  'NFTs',
  'Bridges',
  'Stablecoins',
  'Anything',
] as const;
export type Verb = typeof verbs;

export const colors = ['blue', 'purple', 'pink', 'red', 'orange', 'yellow', 'green'] as const;
export type Color = typeof colors;
type Direction = 'left' | 'center' | 'right';

export const verbColorMap: Record<Verb[number], string> = {
  Games: '#0052FF',
  DEXs: '#9980FF',
  Lending: '#DC28A8',
  NFTs: '#FF001F',
  Stablecoins: '#FE7401',
  Bridges: '#FFE500',
  Anything: '#28DC86',
};

export const textGradientMap: Record<Verb[number], string> = {
  Games: 'linear-gradient(to right, #0052FF, #0052FF)',
  DEXs: 'linear-gradient(to right, #9980FF, #0052FF)',
  Lending: 'linear-gradient(to right, #DC28A8, #0052FF)',
  NFTs: 'linear-gradient(to right, #FF001F, #0052FF)',
  Stablecoins: 'linear-gradient(to right, #FE7401, #0052FF)',
  Bridges: 'linear-gradient(to right, #FFE500, #0052FF)',
  Anything: 'linear-gradient(to right, #28DC86, #0052FF)',
};

// this has to be hardcoded for Tailwind to work
// it's typed so if verbs are altered, you have to add associated background images
export const gradientBgMap: Record<Verb[number], Record<Direction, string>> = {
  Games: {
    left: 'conic-gradient(from var(--hero-gradient-angle) at var(--hero-gradient-stop-point) 50%, #0052FF 0deg, #FFFFFF 360deg, rgba(255, 255, 255, 0) 360deg)',
    center:
      'conic-gradient(from var(--hero-gradient-angle) at var(--hero-gradient-stop-point) 50%, #0052FF 0deg, #FFFFFF 360deg, rgba(255, 255, 255, 0) 360deg)',
    right:
      'conic-gradient(from var(--hero-gradient-angle) at var(--hero-gradient-stop-point) 50%, #0052FF 0deg, #FFFFFF 360deg, rgba(255, 255, 255, 0) 360deg)',
  },
  DEXs: {
    left: 'conic-gradient(from var(--hero-gradient-angle) at var(--hero-gradient-stop-point) 50%, #0052FF 0deg, #9980FF 178.12deg, #FFFFFF 360deg, rgba(255, 255, 255, 0) 360deg)',
    center:
      'conic-gradient(from var(--hero-gradient-angle) at var(--hero-gradient-stop-point) 50%, #0052FF 0deg, #9980FF 178.12deg, #FFFFFF 360deg, rgba(255, 255, 255, 0) 360deg)',
    right:
      'conic-gradient(from var(--hero-gradient-angle) at var(--hero-gradient-stop-point) 50%, #0052FF 0deg, #9980FF 178.12deg, #FFFFFF 360deg, rgba(255, 255, 255, 0) 360deg)',
  },
  Lending: {
    left: 'conic-gradient(from var(--hero-gradient-angle) at var(--hero-gradient-stop-point) 50%, #0052FF 0deg, #DC28A8 178.12deg, #FFFFFF 360deg, rgba(255, 255, 255, 0) 360deg)',
    center:
      'conic-gradient(from var(--hero-gradient-angle) at var(--hero-gradient-stop-point) 50%, #0052FF 0deg, #DC28A8 178.12deg, #FFFFFF 360deg, rgba(255, 255, 255, 0) 360deg)',
    right:
      'conic-gradient(from var(--hero-gradient-angle) at var(--hero-gradient-stop-point) 50%, #0052FF 0deg, #DC28A8 178.12deg, #FFFFFF 360deg, rgba(255, 255, 255, 0) 360deg)',
  },
  NFTs: {
    left: 'conic-gradient(from var(--hero-gradient-angle) at var(--hero-gradient-stop-point) 50%, #0052FF 0deg, #FF001F 178.12deg, #FFFFFF 360deg, rgba(255, 255, 255, 0) 360deg)',
    center:
      'conic-gradient(from var(--hero-gradient-angle) at var(--hero-gradient-stop-point) 50%, #0052FF 0deg, #FF001F 178.12deg, #FFFFFF 360deg, rgba(255, 255, 255, 0) 360deg)',
    right:
      'conic-gradient(from var(--hero-gradient-angle) at var(--hero-gradient-stop-point) 50%, #0052FF 0deg, #FF001F 178.12deg, #FFFFFF 360deg, rgba(255, 255, 255, 0) 360deg)',
  },
  Stablecoins: {
    left: 'conic-gradient(from var(--hero-gradient-angle) at var(--hero-gradient-stop-point) 50%, #0052FF 0deg, #FE7401 178.12deg, #FFFFFF 360deg, rgba(255, 255, 255, 0) 360deg)',
    center:
      'conic-gradient(from var(--hero-gradient-angle) at var(--hero-gradient-stop-point) 50%, #0052FF 0deg, #FE7401 178.12deg, #FFFFFF 360deg, rgba(255, 255, 255, 0) 360deg)',
    right:
      'conic-gradient(from var(--hero-gradient-angle) at var(--hero-gradient-stop-point) 50%, #0052FF 0deg, #FE7401 178.12deg, #FFFFFF 360deg, rgba(255, 255, 255, 0) 360deg)',
  },
  Bridges: {
    left: 'conic-gradient(from var(--hero-gradient-angle) at var(--hero-gradient-stop-point) 50%, #0052FF 0deg, #FFE500 178.12deg, #FFFFFF 360deg, rgba(255, 255, 255, 0) 360deg)',
    center:
      'conic-gradient(from var(--hero-gradient-angle) at var(--hero-gradient-stop-point) 50%, #0052FF 0deg, #FFE500 178.12deg, #FFFFFF 360deg, rgba(255, 255, 255, 0) 360deg)',
    right:
      'conic-gradient(from var(--hero-gradient-angle) at var(--hero-gradient-stop-point) 50%, #0052FF 0deg, #FFE500 178.12deg, #FFFFFF 360deg, rgba(255, 255, 255, 0) 360deg)',
  },
  Anything: {
    left: 'conic-gradient(from var(--hero-gradient-angle) at var(--hero-gradient-stop-point) 50%, #0052FF 0deg, #28DC86 178.12deg, #FFFFFF 360deg, rgba(255, 255, 255, 0) 360deg)',
    center:
      'conic-gradient(from var(--hero-gradient-angle) at var(--hero-gradient-stop-point) 50%, #0052FF 0deg, #28DC86 178.12deg, #FFFFFF 360deg, rgba(255, 255, 255, 0) 360deg)',
    right:
      'conic-gradient(from var(--hero-gradient-angle) at var(--hero-gradient-stop-point) 50%, #0052FF 0deg, #28DC86 178.12deg, #FFFFFF 360deg, rgba(255, 255, 255, 0) 360deg)',
  },
};
