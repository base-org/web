type UsernameProfileCardProps = {
  description: string;
};

export default function UsernameProfileCard({ description }: UsernameProfileCardProps) {
  return (
    <div className="flex flex-col gap-8 rounded-2xl bg-[#EEF0F3] p-8 shadow-xl">
      <p className="text-lg font-bold text-[#5B616E]">{description}</p>
    </div>
  );
}
