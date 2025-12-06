import { useEffect, useState } from "react";
import { apiGet } from "../api";

export default function DashboardPage({ user, logout }) {
  const [me, setMe] = useState(user);

  useEffect(() => {
    apiGet("/api/user/me").then(setMe).catch(console.error);
  }, []);

  return (
    <div className="dashboard">
      <h1>Welcome, {me?.name}</h1>
      <p>Email: {me?.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
