import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

// link to manifest file in project, make sure the url is exact
// pass an exact 180 * 180px icon image
const manifestUrl =
  "https://gloriabargoria.github.io/tg-mini/tonconnect-manifest.json";

// https://gloriabargoria.github.io/tg-mini/"

//background-color: #071330;

// create a client for react query
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <TonConnectUIProvider
        manifestUrl={manifestUrl}
        actionsConfiguration={{
          // return strategy as a link to your TMA that will be only applied if the App is opened in TMA mode
          twaReturnUrl: "https://tg-mini.vercel.app/groups",
        }}
        // list of wallets in the connect wallet modal, in our case, we only need TON wallet
      >
        <App />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
        <ReactQueryDevtools initialIsOpen={false} />
      </TonConnectUIProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
