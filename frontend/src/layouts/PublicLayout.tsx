import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <>
      <nav className="fixed top-0 left-0">
        Navbar
      </nav>
      <Outlet/>
    </>
  )
}