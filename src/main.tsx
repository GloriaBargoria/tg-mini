import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";


const manifestUrl =
  "https://t.me/mobifi_bot/mobifi/tonconnect-manifest.json";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <TonConnectUIProvider
    manifestUrl={manifestUrl}
    actionsConfiguration={{
      // return strategy as a link to your TMA that will be only applied if the App is opened in TMA mode
      twaReturnUrl: "https://t.me/mobifi_bot/mobifi",
    }}
  >
    <App />
  </TonConnectUIProvider>
);
