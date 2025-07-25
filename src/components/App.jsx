
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./Form";       // Register
import Login from "./Login";     // Login
import Profile from "./Profile"; // Profile
import ForgotPassword from "./ForgotPassword";
import ResetPassword  from "./ResetPassword"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/register" element={<Form />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot-password" element= {<ForgotPassword />}></Route>
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
