import { useEffect } from "react";
import { getTheme, setTheme } from "./utils/theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorPage from "./public_pages/ErrorPage";
import Login from "./public_pages/Login";
import Register from "./public_pages/Register";
import LandingPage from "./public_pages/LandingPage";
import Sidebar from "./layouts/Sidebar";
import Dashboard from "./private_pages/Dashboard";
import Account from "./private_pages/Account";
import Settings from "./private_pages/Settings";

export default function App() {

  // Theme initializer
  useEffect(() => {
    setTheme(getTheme());
  }, []);

  const PUBLIC_PAGES = [
    { path: "/", element: <LandingPage /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> }
  ];

  const PRIVATE_PAGES = [
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/settings", element: <Settings /> },
    { path: "/account", element: <Account /> }
  ];

  return (
    <BrowserRouter>
      <Routes>

        {/* Public pages */}
        {PUBLIC_PAGES.map((page, i) => (
          <Route key={i} path={page.path} element={page.element} />
        ))}

        {/* Private pages (with sidebar layout) */}
        <Route element={<Sidebar />}>
          {PRIVATE_PAGES.map((page, i) => (
            <Route key={i} path={page.path} element={page.element} />
          ))}
        </Route>

        {/* Error page */}
        <Route path="*" element={<ErrorPage />} />

      </Routes>
    </BrowserRouter>
  );
}