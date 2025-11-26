import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import Header from "../../widgets/header/Header";
import Footer from "../../widgets/footer/Footer";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  const isAdminPage = useMemo(
    () => location.pathname.startsWith("/admin"),
    [location.pathname]
  );

  return (
    <>
      {!isAdminPage && <Header />}
      <main>{children}</main>
      {!isAdminPage && <Footer />}
    </>
  );
};

export default AppLayout;
