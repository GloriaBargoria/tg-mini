import { TonConnectButton } from "@tonconnect/ui-react";

const Header = () => {
  return (
    <nav className="flex justify-between text-red-500 w-screen">
      <div>
        <p>Mobifi Mini App</p>
      </div>
      <div>
        <TonConnectButton />
      </div>
    </nav>
  );
};

export default Header;
