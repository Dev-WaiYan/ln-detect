import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Playground from "./pages/playground/Playground";
import Login from "./pages/signup_login/Login";
import Signup from "./pages/signup_login/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Playground />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
