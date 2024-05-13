// white css circle
function Circle() {
  return <div className="mx-4 h-4 w-4 rounded-full border-2 border-white" />;
}

export default function ScrollBanner() {
  return (
    <div className="my-8 flex flex-row text-2xl uppercase text-white">
      <div className="flex flex-row items-center">
        <Circle />
        It's time to buikd
      </div>
      <div className="flex flex-row items-center">
        <Circle />
        onchain summer is back
      </div>
      <div className="flex flex-row items-center">
        <Circle />
        It's time to buikd
      </div>
      <div className="flex flex-row items-center">
        <Circle />
        onchain summer is back
      </div>
    </div>
  );
}
