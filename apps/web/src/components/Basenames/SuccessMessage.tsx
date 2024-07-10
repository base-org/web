import { Button } from 'apps/web/src/components/Button/Button';

export function SuccessMessage() {
  return (
    <>
      <div className="mx-auto w-full max-w-[50rem] rounded-3xl border border-[#266EFF] bg-blue-600 p-10 shadow-xl transition-all duration-500">
        <h1 className="text-3xl font-bold text-white">Congrats! This name is yours!</h1>
        <Button rounded>Customize Profile</Button>
      </div>
      <p className="text-white">{/* <ShareUsernameModal /> */}</p>
    </>
  );
}
