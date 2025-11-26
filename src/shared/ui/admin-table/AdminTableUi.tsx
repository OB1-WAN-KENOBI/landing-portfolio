import { useEffect, useRef } from "react";
import { autoAnimate } from "@formkit/auto-animate";
import styles from "./AdminTableUi.module.scss";

interface AdminTableUiProps {
  headers: string[];
  children: React.ReactNode;
  enableAutoAnimate?: boolean;
}

const AdminTableUi = ({
  headers,
  children,
  enableAutoAnimate = false,
}: AdminTableUiProps) => {
  const tbodyRef = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    if (enableAutoAnimate && tbodyRef.current) {
      autoAnimate(tbodyRef.current);
    }
  }, [enableAutoAnimate]);

  return (
    <div className={styles.table}>
      <table className={styles.table__table}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} className={styles.table__header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody ref={enableAutoAnimate ? tbodyRef : undefined}>{children}</tbody>
      </table>
    </div>
  );
};

export default AdminTableUi;
