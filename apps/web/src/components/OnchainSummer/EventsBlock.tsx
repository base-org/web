import Brit from 'apps/web/src/components/OnchainSummer/Brit';
import { BlackCircle } from 'apps/web/src/components/OnchainSummer/Circles';

export default function EventsBlock() {
  return (
    <div className="my-12 flex flex-col">
      <div className="text-l flex flex-row items-center gap-2 px-8 font-mono uppercase">
        <BlackCircle /> Events
      </div>
      <div className="my-6 flex flex-col md:flex-row md:items-end">
        <span className="px-8 text-5xl font-extrabold leading-9 md:text-7xl">
          J<Brit axis={147}>o</Brit>IN <Brit axis={183}>u</Brit>S ON<Brit axis={60}>c</Brit>HAIN
        </span>
      </div>
    </div>
  );
}
