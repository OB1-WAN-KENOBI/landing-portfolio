import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import SuspenseFallbackUi from "../../shared/ui/suspense-fallback/SuspenseFallbackUi";

// Lazy load pages for code splitting
const HomePage = lazy(() => import("../../pages/home/HomePage"));
const ProjectsPage = lazy(() => import("../../pages/projects/ProjectsPage"));
const ProjectDetailsPage = lazy(
  () => import("../../pages/project-details/ProjectDetailsPage")
);
const SkillsPage = lazy(() => import("../../pages/skills/SkillsPage"));
const AboutPage = lazy(() => import("../../pages/about/AboutPage"));
const ContactPage = lazy(() => import("../../pages/contact/ContactPage"));
const AdminLoginPage = lazy(
  () => import("../../pages/admin/login/AdminLoginPage")
);
const AdminLayout = lazy(() => import("../../pages/admin/layout/AdminLayout"));
const AdminDashboardPage = lazy(
  () => import("../../pages/admin/dashboard/AdminDashboardPage")
);
const AdminProjectsPage = lazy(
  () => import("../../pages/admin/projects/AdminProjectsPage")
);
const AdminSkillsPage = lazy(
  () => import("../../pages/admin/skills/AdminSkillsPage")
);
const AdminProfilePage = lazy(
  () => import("../../pages/admin/profile/AdminProfilePage")
);
const AdminStatusPage = lazy(
  () => import("../../pages/admin/status/AdminStatusPage")
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<SuspenseFallbackUi />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetailsPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Routes>
                  <Route path="dashboard" element={<AdminDashboardPage />} />
                  <Route path="projects" element={<AdminProjectsPage />} />
                  <Route path="skills" element={<AdminSkillsPage />} />
                  <Route path="profile" element={<AdminProfilePage />} />
                  <Route path="status" element={<AdminStatusPage />} />
                </Routes>
              </AdminLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
