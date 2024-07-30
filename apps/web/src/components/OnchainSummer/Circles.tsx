'use client';
// white circle
export function WhiteCircle() {
  return <div className="h-[.8rem] w-[.8rem] rounded-full border-2 border-white bg-white" />;
}

// black css circle
export function BlackCircle() {
  return <div className="h-[.8rem] w-[.8rem] rounded-full border-2 border-black bg-black" />;
}

// empty black css circle
export function EmptyBlackCircle() {
  return (
    <div className="h-[.6rem] w-[.6rem] rounded-full border border-black group-hover:bg-black" />
  );
}

// empty black css circle
export function EmptyBlackCircleFillToWhite() {
  return (
    <div className="h-[.6rem] w-[.6rem] rounded-full border border-black group-hover:border-white group-hover:bg-white" />
  );
}

// pink css circle
export function PinkCircle() {
  return <div className="h-[.8rem] w-[.8rem] rounded-full border-2 border-ocspink bg-ocspink" />;
}
