import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const navigate = useNavigate();

  const handleAuthSuccess = (auth) => {
    localStorage.setItem("token", auth.token);
    localStorage.setItem("user", JSON.stringify({ name: auth.name, email: auth.email }));
    setUser({ name: auth.name, email: auth.email });
    navigate("/dashboard");
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/signup" element={<SignupPage onSuccess={handleAuthSuccess} />} />
      <Route path="/login" element={<LoginPage onSuccess={handleAuthSuccess} />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardPage user={user} logout={logout} />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
