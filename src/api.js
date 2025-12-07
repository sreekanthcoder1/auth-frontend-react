// Determine API URL based on environment
const getApiUrl = () => {
  // If VITE_API_URL is set, use it
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // If we're on Render's domain, use the Render backend
  if (window.location.hostname.includes("onrender.com")) {
    return "https://auth-backend-springboot-5vpq.onrender.com";
  }

  // Otherwise, use localhost for development
  return "http://localhost:8080";
};

const API = getApiUrl();

// Debug logging
console.log("API URL being used:", API);
console.log("Current hostname:", window.location.hostname);
console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);

export async function apiPost(path, body) {
  try {
    console.log("Making API POST request to:", API + path);
    const res = await fetch(API + path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(
        data.message || `Request failed with status ${res.status}`,
      );
    }
    return data;
  } catch (error) {
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error(
        "Cannot connect to backend server. Please ensure the backend is running on http://localhost:8080",
      );
    }
    throw error;
  }
}

export async function apiGet(path) {
  try {
    console.log("Making API GET request to:", API + path);
    const res = await fetch(API + path, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(
        data.message || `Request failed with status ${res.status}`,
      );
    }
    return data;
  } catch (error) {
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error(
        "Cannot connect to backend server. Please ensure the backend is running on http://localhost:8080",
      );
    }
    throw error;
  }
}
