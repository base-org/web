import React from 'react';

export default function ActiveCommunityOfBuilders() {
  return (
    <div className="flex flex-col bg-black pt-20 pb-10 px-20">
      <div className="flex flex-row justify-between">
        <div className="h-[320px] min-w-[550px] bg-ocsyellow">Placeholder</div>
        <div className="flex flex-col gap-4 grow mx-20">
          <h2 className="font-display text-5xl">
            <ol>
              <li className="list-decimal">Join an active community of Onchain Builders</li>
            </ol>
          </h2>
          <span className="text-white">
            Join a community of over X00+ builders just like you, building some of the coolest
            projects onchain. Need help?
          </span>
          <span className="text-white">Reach out to our Discord support team!</span>
        </div>
      </div>
      <div className='flex flex-row justify-between mt-16'>
        <div className="h-[320px] w-[400px] bg-ocsyellow">Placeholder</div>
        <div className="h-[320px] w-[400px] bg-ocsyellow">Placeholder</div>
        <div className="h-[320px] w-[400px] bg-ocsyellow">Placeholder</div>
      </div>
    </div>
  );
}
