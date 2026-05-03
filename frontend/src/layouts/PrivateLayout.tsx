import { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, Navigate } from "react-router-dom";
import { BUILT_IN_API_URLS } from "../constants";

export default function PrivateLayout() {
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const res = await axios.get(BUILT_IN_API_URLS.authenticate, {
            withCredentials: true,
          });

          setIsAuth(res.data === true);
        } catch {
          setIsAuth(false);
        } finally {
          setLoading(false);
        }
      };

      checkAuth();
    }, []);

    // -----------------------------
    // Loading state
    // -----------------------------
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center text-zinc-500">
          Checking session...
        </div>
      );
    }

    // -----------------------------
    // Not authenticated → redirect
    // -----------------------------
    if (!isAuth) {
      return <Navigate to="/login" replace />;
    }

    // -----------------------------
    // Authenticated → show layout
    // -----------------------------
    return (
      <>
        {/* Sidebar placeholder */}
        <div>This is a Sidebar</div>

        {/* Page content */}
        <Outlet />
      </>
    );
}