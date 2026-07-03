"use client";

import { useEffect, useState } from "react";

export default function AdminLink() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("mbollopay_user");
    if (userData) {
      const user = JSON.parse(userData);
      if (user.role === "ADMIN") {
        setIsAdmin(true);
      }
    }
  }, []);

  if (!isAdmin) return null;

  return (
    <a href="/admin" className="text-purple-600 font-black hover:text-purple-700 transition-colors flex items-center gap-1">
      <span className="text-xs">🛡️</span> ADMIN
    </a>
  );
}
