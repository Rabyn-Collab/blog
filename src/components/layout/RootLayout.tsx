import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import ScrollToTop from "../ScrollToTop";

export default function RootLayout() {
  return (
    <main className="max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8 min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="grow">
        <Outlet />
      </main>

      <Footer />
    </main>
  )
}




