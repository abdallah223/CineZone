import { Outlet } from "react-router-dom";
import Navbar from "../NavBar/Navbar";
import Footer from "../Footer";
import PageContainer from "./PageContainer";

export default function ContainedLayout() {
  return (
    <>
      <main>
        <PageContainer>
          <Navbar />
          <Outlet />
        </PageContainer>
      </main>
      <Footer />
    </>
  );
}
