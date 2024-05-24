// import { TonConnectButton } from "@tonconnect/ui-react";

import { TonConnectButton } from "@tonconnect/ui-react";

const Header = () => {
  return (
    <nav className="flex justify-between text-red-500 w-full">
      <div className="flex justify-between w-full">
        <p>Mobifi Mini App</p>
        <TonConnectButton />
      </div>
      <div>
        
      </div>
    </nav>
  );
};

export default Header;
