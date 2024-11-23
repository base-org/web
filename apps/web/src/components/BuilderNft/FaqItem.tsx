export function FaqItem({ question, answer }: { question: string; answer: JSX.Element | string }) {
  return (
    <div className="flex flex-col gap-6 border-t border-translucent-200 pt-8">
      <h2 className="text-2xl">{question}</h2>
      {answer}
    </div>
  );
}
