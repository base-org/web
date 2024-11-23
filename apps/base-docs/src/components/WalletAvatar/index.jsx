import ReactBlockies from 'react-blockies';

export const WalletAvatar = ({ address, ensImage, size }) => {
  return ensImage ? (
    <img src={ensImage} width={size} height={size} style={{ borderRadius: 999 }} />
  ) : (
    <div style={{ width: size, height: size, borderRadius: size / 2 }}>
      <ReactBlockies size={8} seed={address} scale={size ? size / 7 : 4} />
    </div>
  );
};
