import { Routes, Route } from "react-router-dom";
// import { TonConnectButton } from '@tonconnect/ui-react'
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import SingleGroup from "./pages/SingleGroup";


function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<SingleGroup />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </div>
  );
}

export default App;
