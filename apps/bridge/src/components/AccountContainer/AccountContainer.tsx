type AccountContainerProps = {
  children: JSX.Element;
};

export function AccountContainer({ children }: AccountContainerProps) {
  return (
    <div className="flex-col border-t border-sidebar-border bg-[#0A0B0D] px-4 font-sans text-white lg:flex lg:h-full lg:flex-row">
      {children}
    </div>
  );
}
