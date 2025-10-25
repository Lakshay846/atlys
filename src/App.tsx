import { Routes, Route } from "react-router-dom";
import Feed from "./pages/Feed";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
  );
}

export default App;