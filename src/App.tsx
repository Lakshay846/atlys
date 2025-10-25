import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./pages/Feed";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/atlys/" element={<Feed />} />
        <Route path="/atlys/signin" element={<SignIn />} />
        <Route path="/atlys/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;