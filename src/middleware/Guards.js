// intercepteurs/guards.js
import { Navigate } from "react-router-dom";

export function GuardedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}
