import React from "react";
import { TonConnectButton } from "@tonconnect/ui-react";



const Homepage: React.FC = () => {

  return (
    <div className="flex justify-center items-center">
     <TonConnectButton />
     <p>TEST NEW DEPLOYMENT</p>
    </div>
  );
};

export default Homepage;
