import { TonConnectButton } from "@tonconnect/ui-react";

const Login = () => {
  const handleButtonClick = () => {
    localStorage.setItem("auth", "true");
  };
  return (
    <div>
      <button onClick={handleButtonClick}>Login with Telegram</button>
      <TonConnectButton />
    </div>
  );
};

export default Login;
