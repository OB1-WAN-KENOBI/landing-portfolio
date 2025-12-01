import { useState, useMemo, useEffect } from "react";
import AdminModalUi from "../../shared/ui/admin-modal/AdminModalUi";
import AdminProjectFormUi from "../../shared/ui/admin-project-form/AdminProjectFormUi";
import { projectsApi } from "../../shared/api/http/projectsApi";
import { useToast } from "../../app/providers/toast/ToastProvider";
import type { ApiProject } from "../../shared/api/http/types";

interface ProjectsCRUDWidgetProps {
  projects: ApiProject[];
  onProjectsChange: (projects: ApiProject[]) => void;
  isOpen: boolean;
  mode: "add" | "edit" | "delete" | null;
  projectId?: string;
  onClose: () => void;
}

const ProjectsCRUDWidget = ({
  projects,
  onProjectsChange,
  isOpen,
  mode,
  projectId,
  onClose,
}: ProjectsCRUDWidgetProps) => {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const project = useMemo(
    () => projects.find((p) => p.id === projectId),
    [projects, projectId]
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [year, setYear] = useState("");
  const [status, setStatus] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    techStack?: string;
    year?: string;
    status?: string;
  }>({});

  useEffect(() => {
    if (project && mode === "edit") {
      const titleValue =
        typeof project.title === "object" ? project.title.ru : project.title;
      const descriptionValue =
        typeof project.description === "object"
          ? project.description.ru
          : project.description;
      setTitle(titleValue);
      setDescription(descriptionValue);
      setTechStack(project.techStack.join(", "));
      setYear(project.year.toString());
      setStatus(project.status);
      setImages(project.images || []);
      setImagePreviews([]);
    } else if (mode === "add") {
      setTitle("");
      setDescription("");
      setTechStack("");
      setYear("");
      setStatus("");
      setImages([]);
      setImagePreviews([]);
    }
    setErrors({});
  }, [project, mode]);

  const handleSave = async () => {
    const newErrors: typeof errors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!techStack.trim()) {
      newErrors.techStack = "Tech stack is required";
    }
    if (!year || isNaN(Number(year))) {
      newErrors.year = "Valid year is required";
    }
    if (!status) {
      newErrors.status = "Status is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    const techStackArray = techStack
      .split(",")
      .map((tech) => tech.trim())
      .filter((tech) => tech.length > 0);

    try {
      const imagesData = imagePreviews.length > 0 ? imagePreviews : undefined;

      if (mode === "add") {
        const payload: any = {
          title: title.trim(),
          description: description.trim(),
          techStack: techStackArray,
          year: Number(year),
          status: status,
        };
        if (imagesData) {
          payload.imagesData = imagesData;
        }
        const newProject = await projectsApi.create(payload);
        onProjectsChange([...projects, newProject]);
        showToast("success", "Project created successfully");
      } else if (mode === "edit" && projectId) {
        const payload: any = {
          title: title.trim(),
          description: description.trim(),
          techStack: techStackArray,
          year: Number(year),
          status: status,
          images: images,
        };
        if (imagesData) {
          payload.imagesData = imagesData;
        }
        const updatedProject = await projectsApi.update(projectId, payload);
        const updatedProjects = projects.map((p) =>
          p.id === projectId ? updatedProject : p
        );
        onProjectsChange(updatedProjects);
        showToast("success", "Project updated successfully");
      }
      handleClose();
    } catch (error) {
      showToast(
        "error",
        error instanceof Error ? error.message : "Operation failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!projectId) return;
    setIsLoading(true);
    try {
      await projectsApi.delete(projectId);
      const updatedProjects = projects.filter((p) => p.id !== projectId);
      onProjectsChange(updatedProjects);
      showToast("success", "Project deleted successfully");
      handleClose();
    } catch (error) {
      showToast(
        "error",
        error instanceof Error ? error.message : "Failed to delete project"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleImagesFileSelect = (files: File[]) => {
    if (files.length === 0) return;

    const invalidFiles = files.filter(
      (file) => !file.type.startsWith("image/") || file.size > 5 * 1024 * 1024
    );

    if (invalidFiles.length > 0) {
      showToast("error", "Можно загружать только изображения до 5MB");
      return;
    }

    const newPreviews: string[] = [];
    let loadedCount = 0;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        loadedCount++;
        const result = reader.result as string;
        newPreviews.push(result);
        if (loadedCount === files.length) {
          setImagePreviews((prev) => [...prev, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageRemove = (index: number) => {
    const totalPreviews = imagePreviews.length;
    if (index < totalPreviews) {
      setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    } else {
      const imageIndex = index - totalPreviews;
      setImages((prev) => prev.filter((_, i) => i !== imageIndex));
    }
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setTechStack("");
    setYear("");
    setStatus("");
    setImages([]);
    setImagePreviews([]);
    setErrors({});
    onClose();
  };

  if (mode === "delete") {
    return (
      <AdminModalUi
        isOpen={isOpen}
        title="Delete Project"
        onClose={handleClose}
        onConfirm={handleDelete}
        confirmLabel={isLoading ? "Deleting..." : "Delete"}
        showActions={!isLoading}
      >
        <p>
          Are you sure you want to delete "
          {typeof project?.title === "object"
            ? project.title.ru
            : project?.title || "this project"}
          "?
        </p>
        {isLoading && <p>Deleting...</p>}
      </AdminModalUi>
    );
  }

  return (
    <AdminModalUi
      isOpen={isOpen}
      title={mode === "add" ? "Add Project" : "Edit Project"}
      onClose={handleClose}
      onConfirm={handleSave}
      confirmLabel={isLoading ? "Saving..." : "Save"}
      showActions={!isLoading}
    >
      <AdminProjectFormUi
        title={title}
        description={description}
        techStack={techStack}
        year={year}
        status={status}
        images={images}
        imagePreviews={imagePreviews}
        errors={errors}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
        onTechStackChange={setTechStack}
        onYearChange={setYear}
        onStatusChange={setStatus}
        onImagesFileSelect={handleImagesFileSelect}
        onImageRemove={handleImageRemove}
        disabled={isLoading}
      />
    </AdminModalUi>
  );
};

export default ProjectsCRUDWidget;
