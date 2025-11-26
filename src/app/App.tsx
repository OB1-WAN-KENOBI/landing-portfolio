import { BrowserRouter } from "react-router-dom";
import styles from "./App.module.scss";
import AppLayout from "./ui/AppLayout";
import AppRoutes from "./routes/AppRoutes";
import { LanguageProvider } from "./providers/language/LanguageProvider";
import { AuthProvider } from "./providers/auth/AuthProvider";
import { HeadManagerProvider } from "./providers/head/HeadManager";
import { ThemeProvider } from "./providers/theme/ThemeProvider";
import { ToastProvider } from "./providers/toast/ToastProvider";
import { HotkeyProvider } from "./providers/hotkey/HotkeyProvider";
import {
  PageLoaderProvider,
  usePageLoader,
} from "./providers/page-loader/PageLoaderProvider";
import ErrorBoundary from "./providers/error-boundary/ErrorBoundary";
import ToastContainerUi from "../shared/ui/toast/ToastContainerUi";
import { useToast } from "./providers/toast/ToastProvider";
import HeadRenderer from "./providers/head/HeadRenderer";
import PageLoaderUi from "../shared/ui/page-loader/PageLoaderUi";

const AppContent = () => {
  const { toasts, removeToast } = useToast();
  const { isLoading } = usePageLoader();

  return (
    <>
      <HeadRenderer />
      <PageLoaderUi isLoading={isLoading} />
      <div className={styles.app}>
        <AppLayout>
          <div className={styles.app__content}>
            <HotkeyProvider>
              <AppRoutes />
            </HotkeyProvider>
          </div>
        </AppLayout>
      </div>
      <ToastContainerUi toasts={toasts} onRemove={removeToast} />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <LanguageProvider>
          <ThemeProvider>
            <HeadManagerProvider>
              <AuthProvider>
                <ToastProvider>
                  <PageLoaderProvider>
                    <AppContent />
                  </PageLoaderProvider>
                </ToastProvider>
              </AuthProvider>
            </HeadManagerProvider>
          </ThemeProvider>
        </LanguageProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
