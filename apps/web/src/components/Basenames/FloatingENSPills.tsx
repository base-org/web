import {
  registrationTransitionDuration,
  useRegistration,
} from 'apps/web/src/components/Basenames/RegistrationContext';
import classNames from 'classnames';
import Image from 'next/image';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';

const useMousePosition = () => {
  const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    let animationFrameId: number;

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
  { name: 'ianlakes', avatar: '/images/avatars/ianlakes.eth.png' },
  { name: 'wilsoncusack', avatar: '/images/avatars/wilsoncusack.eth.png' },
  { name: 'aflock', avatar: '/images/avatars/aflock.eth.png' },
  { name: 'johnpalmer', avatar: '/images/avatars/johnpalmer.eth.svg' },
  { name: 'jfrankfurt', avatar: '/images/avatars/jfrankfurt.eth.jpeg' },
  { name: 'lsr', avatar: '/images/avatars/lsr.eth.png' },
  { name: 'dcj', avatar: '/images/avatars/dcj.eth.avif' },
  { name: 'zencephalon', avatar: '/images/avatars/zencephalon.eth.webp' },
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

type PillProps = {
  name: string;
  avatar: string;
  x: number;
  y: number;
  isBlurred: boolean;
  transform: string;
};
const Pill = forwardRef(
  ({ avatar, name, x, y, isBlurred, transform }: PillProps, ref: React.Ref<HTMLDivElement>) => {
    const { searchInputFocused, searchInputHovered } = useRegistration();

    const pillClasses = classNames(
      'absolute flex gap-3 items-center justify-center rounded-full px-4 py-3 border opacity-60',
      'transition-all duration-500',
      // Default
      'border-[#d9dce2] background-[#f5f6f8] text-[#666]',

      {
        'blur-sm': isBlurred,
        'bg-blue-600/10 border-blue-600/20 text-blue-600':
          !searchInputFocused && searchInputHovered,
        'bg-white/20 border-white/80 text-white': searchInputFocused,
      },
    );

    return (
      <div ref={ref} className={pillClasses} style={{ top: `${y}px`, left: `${x}px`, transform }}>
        <Image
          src={avatar}
          className="rounded-full"
          alt={`${name}-avatar`}
          quality={1}
          priority
          width={34}
          height={34}
        />
        <p>{name}.base.eth</p>
      </div>
    );
  },
);
Pill.displayName = 'Pill';

const X_VECTOR_SCALER = 0.4;
const Y_VECTOR_SCALER = 0.32;
export function FloatingENSPills() {
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
    const pillWidth = pill ? pill.offsetWidth : 170;
    const pillHeight = pill ? pill.offsetHeight : 170;

    const angle = index * angleStep;
    const x = centerX + radiusX * Math.cos(angle) - pillWidth / 2;
    const y = centerY + radiusY * Math.sin(angle) - pillHeight / 2;

    const dx = x + pillWidth / 2 - mousePosition.x;
    const dy = y + pillHeight / 2 - mousePosition.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Normalize the direction vector
    const length = Math.sqrt(dx * dx + dy * dy);
    const nx = dx / length;
    const ny = dy / length;

    const rotationAngle = Math.min(distance / 20, 20);
    const transform = `rotate3d(${-ny}, ${-nx}, 0, ${rotationAngle}deg)`;
    const { name, avatar } = NAMES[index];
    return { name, avatar, x, y, transform };
  });

  const blurredIndices = useBlurCycle();
  const setRef = useCallback((index: number, el: HTMLDivElement | null) => {
    if (!el) return;
    pillRefs.current[index] = el;
  }, []);

  const { searchInputFocused } = useRegistration();

  return (
    <div
      className={classNames(
        'pointer-events-none absolute inset-0 -z-10 overflow-hidden',
        'transition-all',
        registrationTransitionDuration,
        {
          'bg-blue-600': searchInputFocused,
        },
      )}
    >
      {pills.map(({ avatar, name, x, y, transform }, i) => (
        <Pill
          key={`${x}-${y}`}
          avatar={avatar}
          name={name}
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
