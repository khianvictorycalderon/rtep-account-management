import { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { BUILT_IN_API_URLS } from "../constants";
import Sidebar from "../components/Sidebar";
import TopNav from "../components/TopNav";
import Loading from "../components/Loading";
import PrivateFooter from "../components/PrivateFooter";

export default function PrivateLayout() {
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get(BUILT_IN_API_URLS.verify, {
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

        const interval = setInterval(checkAuth, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, [location.pathname]);

    if (loading) {
        return <Loading/>
    }

    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="h-screen flex flex-col">

            {/* TOP NAV */}
            <TopNav onMenuClick={() => setSidebarOpen(true)} />

            {/* BODY */}
            <div className="flex flex-1 overflow-hidden">

            {/* SIDEBAR */}
            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

            {/* MAIN */}
            <main className="flex-1 overflow-y-auto p-4 bg-neutral-100 dark:bg-neutral-900">
                <Outlet />
                <PrivateFooter/>
            </main>

            </div>

        </div>
    );
}