import { Button } from '../../components/Button/Button';
import Link from 'next/link';

export function WhatsIncluded() {
  return (
    <div className="flex w-full max-w-[1440px] flex-col space-y-20 bg-black px-8 pt-12">
      <div className="grid grid-cols-2">
        <div className="flex w-full flex-col font-display text-3xl text-white md:text-5xl lg:text-6xl">
          <p>What's included?</p>
        </div>
  
        <div className="text-md font-sans text-white">
          <p className='font-bold'>Base Camp Curriculum</p>
          <p>The “Base Camp” curriculum is available to the public on bBase.org, but Base Bootcamp participants will have access to additional supplemental resources and graded projects, reviewed by Coinbase engineers.</p>
          <br></br>
          <p className='font-bold'>Mentors</p>
          <p>Each student is paired with a mentor whom you will meet with once a week.</p>
          <br></br>
          <p className='font-bold'>Office Hours</p>
          <p>Base Bootcamp staff will host regular open office hours via Google Meet to answer questions.</p>
          <br></br>
          <p className='font-bold'>Discord</p>
          <p>All students will have access to a private channel in the Base Discord where they can interact with Coinbase staff, mentors and other Base Bootcamp students.</p>
        </div>
      </div>
    </div>
  );
}
