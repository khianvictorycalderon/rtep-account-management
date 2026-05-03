import { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, Navigate } from "react-router-dom";
import { BUILT_IN_API_URLS } from "../constants";
import Sidebar from "../components/Sidebar";
import TopNav from "../components/TopNav";

export default function PrivateLayout() {
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    // 👇 ADD THIS
    const [sidebarOpen, setSidebarOpen] = useState(false);

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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-zinc-500">
                Checking session...
            </div>
        );
    }

    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="min-h-screen flex bg-zinc-100 dark:bg-zinc-900">

            {/* SIDEBAR */}
            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

            {/* MAIN AREA */}
            <div className="flex-1 flex flex-col">

                {/* TOP NAVBAR */}
                <TopNav onMenuClick={() => setSidebarOpen(true)} />

                <main className="p-4">
                    <Outlet />
                </main>

            </div>
        </div>
    );
}