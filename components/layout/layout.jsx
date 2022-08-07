import { Toaster } from "react-hot-toast";

import Header from "./header";
import Footer from "./footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col justify-between">
      <Header />

      {/* Toast notifications */}
      <Toaster position="top-center" reverseOrder={true} />

      {/* main content */}
      <main className="p-4 h-screen bg-slate-100">{children}</main>

      {/* footer */}
      <Footer />
    </div>
  );
};

export default Layout;
