import { useLocation } from "react-router-dom";
import Header from "../../widgets/header/Header";
import Footer from "../../widgets/footer/Footer";
import styles from "../App.module.scss";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Header />}
      <main className={styles.app__main}>{children}</main>
      {!isAdminPage && <Footer />}
    </>
  );
};

export default AppLayout;
