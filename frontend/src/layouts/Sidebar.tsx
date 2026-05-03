import { Outlet } from "react-router-dom";

export default function Sidebar() {
  return (
    <div>
      This is a Sidebar
      <Outlet/>
    </div>
  )
}
