import { Outlet } from "react-router-dom";
import Footer from "../Footer";

export default function OnlyFooterLayout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
