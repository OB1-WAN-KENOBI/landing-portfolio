import { useEffect } from "react";
import { useTranslation } from "../../lib/i18n/useTranslation";
import { usePageLoader } from "../../../app/providers/page-loader/PageLoaderProvider";
import styles from "./SuspenseFallbackUi.module.scss";

const SuspenseFallbackUi = () => {
  const { t } = useTranslation();
  const { startLoading, stopLoading } = usePageLoader();

  useEffect(() => {
    startLoading();

    return () => {
      stopLoading();
    };
  }, [startLoading, stopLoading]);

  return (
    <div className={styles.fallback}>
      <p className={styles.fallback__text}>{t("common.loading")}</p>
    </div>
  );
};

export default SuspenseFallbackUi;
