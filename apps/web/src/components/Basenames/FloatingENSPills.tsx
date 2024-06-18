import { RegistrationContext } from 'apps/web/src/components/Basenames/RegistrationContext';
import classNames from 'classnames';
import Image from 'next/image';
import { HTMLAttributes, forwardRef, useCallback, useContext, useEffect, useRef, useState } from 'react';

const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId: number

    const handleMouseMove = (event: MouseEvent) => {
      const updatePosition = () => {
        setPosition({ x: event.clientX, y: event.clientY });
        animationFrameId = requestAnimationFrame(updatePosition);
      };
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return position;
};

const NAMES = [
  'ianlakes',
  'rcmpbell',
  'pataguccigirl',
  'kenzee',
  'jfrankfurt',
  'frogmonkee',
  'dcj',
];
const PILL_COUNT = NAMES.length;
const initialBlurStates = Array.from({ length: PILL_COUNT }).map((_, index) => index % 2 === 0);
const intervals = [2000, 4000, 6000];
const useBlurCycle = () => {
  const [blurredIndices, setBlurredIndices] = useState(initialBlurStates);

  useEffect(() => {
    const timeoutIds: ReturnType<typeof setTimeout>[] = [];

    const toggleBlur = (index: number) => {
      setBlurredIndices((prev) => prev.map((blurred, i) => (i === index ? !blurred : blurred)));

      const randomInterval = intervals[Math.floor(Math.random() * intervals.length)];
      timeoutIds[index] = setTimeout(() => toggleBlur(index), randomInterval);
    };

    for (let i = 0; i < PILL_COUNT; i++) {
      const randomInterval = intervals[Math.floor(Math.random() * intervals.length)];
      timeoutIds[i] = setTimeout(() => toggleBlur(i), randomInterval);
    }

    return () => {
      timeoutIds.forEach(clearTimeout);
    };
  }, []);

  return blurredIndices;
};

type PillProps = { name: string; src: string; x: number; y: number; isBlurred: boolean; transform: string }
const Pill = forwardRef(
  (
    {
      name,
      src,
      x,
      y,
      isBlurred,
      transform,
    }: PillProps,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const { focused, hovered } = useContext(RegistrationContext);
    const baseStyles = `absolute flex h-12 items-center justify-center rounded-full px-2 py-3 border border-[#BFC4CF] opacity-60 transition duration-1000 ${isBlurred ? 'blur-sm' : ''}`;
    const focusedStyles = classNames(baseStyles, 'text-white bg-[#F5F8FF33]');
    const hoveredStyles = classNames(
      baseStyles,
      'text-blue-600 bg-[#F5F8FF] border-[#92B6FF]',
    );
    return (
      <div
        ref={ref}
        className={focused ? focusedStyles : hovered ? hoveredStyles : baseStyles}
        style={{ top: `${y - 24}px`, left: `${x - 86}px`, transform }}
      >
        <Image
          src={src}
          className="rounded-full pr-3"
          alt={`${name}-avatar`}
          width={36}
          height={36}
        />
        <p>{name}.base.eth</p>
      </div>
    );
  },
);
Pill.displayName = 'Pill';

const X_VECTOR_SCALER = 0.4;
const Y_VECTOR_SCALER = 0.32;
export function FloatingENSPills(props: HTMLAttributes<HTMLInputElement>) {
  const [radiusX, setRadiusX] = useState(window.innerWidth * X_VECTOR_SCALER);
  const [radiusY, setRadiusY] = useState(window.innerHeight * Y_VECTOR_SCALER);
  const pillRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleResize = () => {
      setRadiusX(window.innerWidth * X_VECTOR_SCALER);
      setRadiusY(window.innerHeight * Y_VECTOR_SCALER);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const angleStep = (2 * Math.PI) / PILL_COUNT;
  const mousePosition = useMousePosition();

  const pills = Array.from({ length: PILL_COUNT }).map((_, index) => {
    const pill = pillRefs.current[index];
    const pillWidth = pill ? pill.offsetWidth : 100; 
    const pillHeight = pill ? pill.offsetHeight : 100; 

    const angle = index * angleStep;
    const x = centerX + radiusX * Math.cos(angle) - pillWidth / 2;
    const y = centerY + radiusY * Math.sin(angle) - pillHeight / 2;

    const dx = x + pillWidth - mousePosition.x;
    const dy = y + pillHeight - mousePosition.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Normalize the direction vector
    const length = Math.sqrt(dx * dx + dy * dy);
    const nx = dx / length;
    const ny = dy / length;

    const rotationAngle = Math.min(distance / 20, 20);
    const transform = `rotate3d(${-ny}, ${-nx}, 0, ${rotationAngle}deg)`;
    return { name: NAMES[index], x, y, transform };
  });

  const blurredIndices = useBlurCycle();
  const setRef = useCallback((index: number, el: HTMLDivElement | null) => {
    if (!el) return
    pillRefs.current[index] = el;
  }, []);
  return (
    <div {...props} className="absolute inset-0">
      {pills.map(({ name, x, y, transform }, i) => (
        <Pill
          key={`${x}-${y}`}
          name={name}
          src=""
          isBlurred={blurredIndices[i]}
          x={x}
          y={y}
          transform={transform}
          // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
          ref={(el) => setRef(i, el)}
        />
      ))}
    </div>
  );
}
