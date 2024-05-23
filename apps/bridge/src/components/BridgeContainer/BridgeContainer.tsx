type BridgeContainerProps = {
  children: JSX.Element;
};

export function BridgeContainer({ children }: BridgeContainerProps) {
  return <div className="m-0 flex h-full w-full flex-col p-0">{children}</div>;
}
