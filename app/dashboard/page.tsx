"use client";

import { useEffect, useState } from "react";

type User = {
  name?: string | null;
  email?: string | null;
};

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSession() {
      const res = await fetch("/api/auth/get-session");
      const data = await res.json();

      if (data?.user) {
        setUser(data.user);
      }

      setLoading(false);
    }

    getSession();
  }, []);

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Hello {user?.name ?? "User"} 👋
      </h1>

      <button
        onClick={() => alert("Welcome to the Dashboard 🚀")}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Click Me
      </button>
    </div>
  );
}
