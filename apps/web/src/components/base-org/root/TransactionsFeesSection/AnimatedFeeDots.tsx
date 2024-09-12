'use client';

const maxRows = 52;
const minRows = 6;
const dotsPerRow = 31;
const dotRadius = 3;
const dotSpacing = 9;
const rows: JSX.Element[] = [];

for (let y = 0; y < maxRows; y++) {
  const dots = [];
  for (let x = 0; x < dotsPerRow; x++) {
    dots.push(
      <circle key={`${x}-${y}`} cx={x * dotSpacing + dotRadius} cy={dotRadius} r={dotRadius} />,
    );
  }

  rows.push(
    <g key={y} transform={`translate(0, ${y * dotSpacing})`}>
      {dots}
    </g>,
  );
}

const svgWidth = dotsPerRow * dotSpacing;

type AnimatedfeeDotsProps = {
  isBase?: boolean;
  color?: string;
  progress: number;
  title: string;
};

export default function AnimatedfeeDots({
  isBase,
  color = '#4083CD',
  progress,
  title,
}: AnimatedfeeDotsProps) {
  const visibleRows = isBase ? Math.round(maxRows - progress * (maxRows - minRows)) : maxRows;
  const currentHeight = visibleRows * dotSpacing;
  const viewBox = `0 0 ${svgWidth} ${currentHeight}`;
  // TODO: Gradual viewboxHeight
  return (
    <svg
      width="100%"
      height="100%"
      viewBox={viewBox}
      preserveAspectRatio="xMidYMin meet"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      {rows.slice(0, visibleRows)}
    </svg>
  );
}
