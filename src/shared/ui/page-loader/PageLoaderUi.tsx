import styles from "./PageLoaderUi.module.scss";

interface PageLoaderUiProps {
  isLoading?: boolean;
}

const PageLoaderUi = ({ isLoading = true }: PageLoaderUiProps) => {
  return (
    <div
      className={`${styles.loader} ${
        !isLoading ? styles["loader--hidden"] : ""
      }`}
    >
      <div className={styles.loader__spinner}></div>
    </div>
  );
};

export default PageLoaderUi;
