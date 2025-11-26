import styles from "./PaginationUi.module.scss";
import ButtonUi from "../form/ButtonUi";

interface PaginationUiProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  totalItems: number;
  showingFrom: number;
  showingTo: number;
}

const PaginationUi = ({
  currentPage,
  totalPages,
  onPageChange,
  showingFrom,
  showingTo,
  totalItems,
}: PaginationUiProps) => {
  return (
    <div className={styles.pagination}>
      <div className={styles.pagination__info}>
        Showing {showingFrom}–{showingTo} of {totalItems}
      </div>
      <div className={styles.pagination__controls}>
        <ButtonUi
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </ButtonUi>
        <span className={styles.pagination__page}>
          Page {currentPage} of {totalPages}
        </span>
        <ButtonUi
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </ButtonUi>
      </div>
    </div>
  );
};

export default PaginationUi;
