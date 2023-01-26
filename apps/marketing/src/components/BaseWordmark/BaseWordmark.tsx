import { Logo } from '../Logo/Logo';

type BaseWordmark = {
  color: 'white' | 'black';
};

export function BaseWordmark({ color = 'white' }: BaseWordmark) {
  return (
    <div className="flex flex-row space-x-1 items-center">
      <Logo color={color} />
      <span className={`text-4xl font-display ${color === 'white' ? 'text-white' : 'text-black'}`}>
        BASE
      </span>
    </div>
  );
}
