type LogoProps = {
  color?: 'white' | 'black';
  width?: string;
  height?: string;
};

export function Logo({ color = 'white', width = '32', height = '32' }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 190 190"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M94.2407 189.14C146.47 189.14 188.811 146.8 188.811 94.5701C188.811 42.3405 146.47 0 94.2407 0C44.6883 0 4.03726 38.1111 0 86.6207H125V102.519H6.78908e-07C4.03726 151.029 44.6883 189.14 94.2407 189.14Z"
        fill={color}
      />
    </svg>
  );
}
