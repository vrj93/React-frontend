import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "../dist/main.css";
import "../dist/custom.css";
import UserDetails from "./UserDetails";
import Address from "./Address";
import ThankYou from "./ThankYou";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserDetails />} />
          <Route path="/address" element={<Address />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
