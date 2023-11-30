import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => (
  <div className="layout">
    <Navbar />
    <main>
      <Outlet />
    </main>
  </div>
);

export default Layout;
