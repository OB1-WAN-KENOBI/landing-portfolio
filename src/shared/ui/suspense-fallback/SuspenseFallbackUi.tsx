import { useTranslation } from "../../lib/i18n/useTranslation";
import styles from "./SuspenseFallbackUi.module.scss";

const SuspenseFallbackUi = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.fallback}>
      <p className={styles.fallback__text}>{t("common.loading")}</p>
    </div>
  );
};

export default SuspenseFallbackUi;
