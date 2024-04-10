import dynamic from 'next/dynamic';

export default dynamic(async () => import('../src/components/Home.tsx'), {
  ssr: false,
});
