import { Link } from "react-router-dom";
import styles from "./AdminSidebarUi.module.scss";

interface MenuItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

interface AdminSidebarUiProps {
  items: MenuItem[];
  activePath?: string;
}

const AdminSidebarUi = ({ items, activePath }: AdminSidebarUiProps) => {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.sidebar__nav}>
        {items.map((item) => {
          const isActive = activePath === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.sidebar__item} ${
                isActive ? styles.sidebar__itemActive : ""
              }`}
            >
              <span className={styles.sidebar__icon}>{item.icon}</span>
              <span className={styles.sidebar__label}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebarUi;
