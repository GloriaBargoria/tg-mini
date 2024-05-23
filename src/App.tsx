import { Routes, Route } from "react-router-dom";
// import { TonConnectButton } from '@tonconnect/ui-react'
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import SingleGroup from "./pages/SingleGroup";
import './App.css'
import Grouplist from "./pages/Grouplist";


function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/groups/:groupId" element={<SingleGroup />} />
        <Route path="/groups" element={<Grouplist />} />
      </Routes>
    </div>
  );
}

export default App;
