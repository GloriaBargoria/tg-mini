import React from "react";
import { TonConnectButton } from "@tonconnect/ui-react";
import LoginTelegram from "../components/auth/LoginTelegram";

const Homepage: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <TonConnectButton />
      <LoginTelegram />
    </div>
  );
};

export default Homepage;
