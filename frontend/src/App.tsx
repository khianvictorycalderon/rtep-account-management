import { useEffect } from "react";
import { getTheme, setTheme } from "./utils/theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorPage from "./public_pages/ErrorPage";
import Login from "./public_pages/Login";
import Register from "./public_pages/Register";
import LandingPage from "./public_pages/LandingPage";
import PrivateLayout from "./layouts/PrivateLayout";
import Dashboard from "./private_pages/Dashboard";
import Account from "./private_pages/Account";
import Settings from "./private_pages/Settings";
import PublicLayout from "./layouts/PublicLayout";
import About from "./public_pages/About";
import Changelogs from "./public_pages/Changelogs";
import SlideToTop from "./components/SlideToTop";

export default function App() {

  // Theme initializer
  useEffect(() => {
    setTheme(getTheme());
  }, []);

  const PUBLIC_PAGES = [
    { path: "/", element: <LandingPage /> },
    { path: "/about", element: <About /> },
    { path: "/changelogs", element: <Changelogs /> }
  ];

  const EMPTY_PUBLIC_PAGES = [
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
      <SlideToTop/>
      <Routes>

        {/* Public pages without any layout */}
        {EMPTY_PUBLIC_PAGES.map((page, i) => (
          <Route key={i} path={page.path} element={page.element} />
        ))}

        {/* Public pages with navbar layout */}
        <Route element={<PublicLayout/>}>
          {PUBLIC_PAGES.map((page, i) => (
            <Route key={i} path={page.path} element={page.element} />
          ))}
        </Route>

        {/* Private pages (with sidebar layout) */}
        <Route element={<PrivateLayout />}>
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