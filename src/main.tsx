import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { BrowserRouter } from "react-router-dom";

// link to manifest file in project, make sure the url is exact
// pass an exact 180 * 180px icon image
const manifestUrl = "https://t.me/mobifi_bot/mobifi/tonconnect-manifest.json";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <TonConnectUIProvider
      manifestUrl={manifestUrl}
      actionsConfiguration={{
        // return strategy as a link to your TMA that will be only applied if the App is opened in TMA mode
        twaReturnUrl: "https://t.me/mobifi_bot/mobifi",
      }}
      // list of wallets in the connect wallet modal, in our case, we only need TON wallet
      // exlude this parameter to list all wallets
      walletsListConfiguration={{
        includeWallets: [
          {
            appName: "tonwallet",
            name: "TON Wallet",
            imageUrl: "https://wallet.ton.org/assets/ui/qr-logo.png",
            aboutUrl:
              "https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd",
            universalLink: "https://wallet.ton.org/ton-connect",
            jsBridgeKey: "tonwallet",
            bridgeUrl: "https://bridge.tonapi.io/bridge",
            platforms: ["chrome", "android"],
          },
        ],
      }}
    >
      <App />
    </TonConnectUIProvider>
  </BrowserRouter>
);
