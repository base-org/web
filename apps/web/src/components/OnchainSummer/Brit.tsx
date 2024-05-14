export default function Brit({ children, axis = 0 }: { children: React.ReactNode; axis?: number }) {
  return (
    <span
      // className="font-britney text-[1.65rem]"
      // scale britney to match coinbase-display
      className="font-britney text-[86%]"
      style={{ fontVariationSettings: `"styl" ${axis}` }}
    >
      {children}
    </span>
  );
}
