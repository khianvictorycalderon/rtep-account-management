import { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, Navigate } from "react-router-dom";
import { BUILT_IN_API_URLS, PRIVATE_ROUTE_FIRST_PATH } from "../constants";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

export default function PublicLayoutRedirect() {
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
  // Loading state (optional UI)
  // -----------------------------
  if (loading) {
    return <Loading/>
  }

  // -----------------------------
  // If logged in → redirect to dashboard
  // -----------------------------
  if (isAuth) {
    return <Navigate to={PRIVATE_ROUTE_FIRST_PATH} replace />;
  }

  // -----------------------------
  // Not logged in → show public layout
  // -----------------------------
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}