import { useState, useMemo, useEffect } from "react";
import styles from "./AdminProjectsPage.module.scss";
import TitleUi from "../../../shared/ui/title/TitleUi";
import AdminTableUi from "../../../shared/ui/admin-table/AdminTableUi";
import ButtonUi from "../../../shared/ui/form/ButtonUi";
import InputUi from "../../../shared/ui/form/InputUi";
import DropdownUi from "../../../shared/ui/dropdown/DropdownUi";
import PaginationUi from "../../../shared/ui/pagination/PaginationUi";
import ProjectsCRUDWidget from "../../../widgets/admin-projects-crud/ProjectsCRUDWidget";
import { mockProjects } from "../../../shared/api/mocks/mockProjects";
import { normalizeProject } from "../../../shared/lib/api/normalize";
import { useToast } from "../../../app/providers/toast/ToastProvider";
import { useLanguage } from "../../../app/providers/language/useLanguage";
import type { ApiProject } from "../../../shared/api/http/types";

const PAGE_SIZE = 10;

const AdminProjectsPage = () => {
  const { showToast } = useToast();
  const { language } = useLanguage();
  const [apiProjects, setApiProjects] = useState<ApiProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"title" | "year" | "status">("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    setIsLoading(true);
    mockProjects
      .getAll()
      .then((data) => {
        setApiProjects(data);
        setIsLoading(false);
      })
      .catch((error) => {
        showToast(
          "error",
          error instanceof Error ? error.message : "Failed to load projects"
        );
        setIsLoading(false);
      });
  }, [showToast]);

  const projects = useMemo(
    () => apiProjects.map((p) => normalizeProject(p, language)),
    [apiProjects, language]
  );

  const filteredAndSorted = useMemo(() => {
    let filtered = projects;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.techStack.some((tech) => tech.toLowerCase().includes(query))
      );
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === "title") {
        const comparison = a.title.localeCompare(b.title);
        return sortOrder === "asc" ? comparison : -comparison;
      } else if (sortBy === "year") {
        return sortOrder === "asc" ? a.year - b.year : b.year - a.year;
      } else {
        const comparison = a.status.localeCompare(b.status);
        return sortOrder === "asc" ? comparison : -comparison;
      }
    });

    return filtered;
  }, [projects, searchQuery, sortBy, sortOrder]);

  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return filteredAndSorted.slice(start, end);
  }, [filteredAndSorted, currentPage]);

  const totalPages = Math.ceil(filteredAndSorted.length / PAGE_SIZE);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: "add" | "edit" | "delete" | null;
    projectId?: string;
  }>({
    isOpen: false,
    mode: null,
  });

  const handleAdd = () => {
    setModalState({ isOpen: true, mode: "add" });
  };

  const handleEdit = (id: string) => {
    setModalState({ isOpen: true, mode: "edit", projectId: id });
  };

  const handleDelete = (id: string) => {
    setModalState({ isOpen: true, mode: "delete", projectId: id });
  };

  const handleClose = () => {
    setModalState({ isOpen: false, mode: null });
  };

  const handleProjectsChange = (updatedProjects: ApiProject[]) => {
    setApiProjects(updatedProjects);
  };

  const handleSortChange = (field: "title" | "year" | "status") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  if (isLoading) {
    return (
      <div className={styles.adminProjectsPage}>
        <TitleUi variant="h1">Projects</TitleUi>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.adminProjectsPage}>
      <div className={styles.adminProjectsPage__header}>
        <TitleUi variant="h1">Projects</TitleUi>
        <ButtonUi onClick={handleAdd}>Add Project</ButtonUi>
      </div>

      <div className={styles.adminProjectsPage__filters}>
        <InputUi
          label="Search by title or tech"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={setSearchQuery}
        />
        <DropdownUi
          label="Sort by"
          value={`${sortBy}-${sortOrder}`}
          options={[
            "title-asc",
            "title-desc",
            "year-asc",
            "year-desc",
            "status-asc",
            "status-desc",
          ]}
          onChange={(value) => {
            const [field, order] = value.split("-") as [
              "title" | "year" | "status",
              "asc" | "desc"
            ];
            setSortBy(field);
            setSortOrder(order);
          }}
          placeholder="Sort..."
        />
      </div>

      <AdminTableUi
        headers={["Title", "Year", "Status", "Tech Stack", "Actions"]}
        enableAutoAnimate={true}
      >
        {paginatedProjects.map((project) => (
          <tr key={project.id} className={styles.adminProjectsPage__row}>
            <td className={styles.adminProjectsPage__cell}>
              <button
                className={styles.adminProjectsPage__sortButton}
                onClick={() => handleSortChange("title")}
              >
                {project.title}
              </button>
            </td>
            <td className={styles.adminProjectsPage__cell}>
              <button
                className={styles.adminProjectsPage__sortButton}
                onClick={() => handleSortChange("year")}
              >
                {project.year}
              </button>
            </td>
            <td className={styles.adminProjectsPage__cell}>
              <button
                className={styles.adminProjectsPage__sortButton}
                onClick={() => handleSortChange("status")}
              >
                {project.status}
              </button>
            </td>
            <td className={styles.adminProjectsPage__cell}>
              {project.techStack.join(", ")}
            </td>
            <td className={styles.adminProjectsPage__cell}>
              <div className={styles.adminProjectsPage__actions}>
                <button
                  className={styles.adminProjectsPage__actionButton}
                  onClick={() => handleEdit(project.id)}
                >
                  Edit
                </button>
                <button
                  className={`${styles.adminProjectsPage__actionButton} ${styles.adminProjectsPage__actionButtonDanger}`}
                  onClick={() => handleDelete(project.id)}
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </AdminTableUi>

      {totalPages > 0 && (
        <PaginationUi
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          pageSize={PAGE_SIZE}
          totalItems={filteredAndSorted.length}
          showingFrom={(currentPage - 1) * PAGE_SIZE + 1}
          showingTo={Math.min(
            currentPage * PAGE_SIZE,
            filteredAndSorted.length
          )}
        />
      )}
      <ProjectsCRUDWidget
        projects={apiProjects}
        onProjectsChange={handleProjectsChange}
        isOpen={modalState.isOpen}
        mode={modalState.mode}
        projectId={modalState.projectId}
        onClose={handleClose}
      />
    </div>
  );
};

export default AdminProjectsPage;
