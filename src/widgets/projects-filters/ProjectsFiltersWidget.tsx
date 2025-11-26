import { useState, useMemo, useEffect } from "react";
import FiltersUi from "../../shared/ui/filters/FiltersUi";
import type { Project } from "../../shared/api/mockData";

interface ProjectsFiltersWidgetProps {
  projects: Project[];
  onFilteredProjectsChange: (filtered: Project[]) => void;
}

type SortOption = "newest" | "oldest" | "alphabetical" | "";

const ProjectsFiltersWidget = ({
  projects,
  onFilteredProjectsChange,
}: ProjectsFiltersWidgetProps) => {
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedTech, setSelectedTech] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("");

  // Извлекаем уникальные значения для фильтров
  const { years, techStack, statuses } = useMemo(() => {
    const uniqueYears = Array.from(
      new Set(projects.map((p) => p.year.toString()))
    ).sort((a, b) => Number(b) - Number(a));

    const uniqueTech = Array.from(
      new Set(projects.flatMap((p) => p.techStack))
    ).sort();

    const uniqueStatuses = Array.from(
      new Set(projects.map((p) => p.status))
    ).sort();

    return {
      years: uniqueYears,
      techStack: uniqueTech,
      statuses: uniqueStatuses,
    };
  }, [projects]);

  // Фильтрация и сортировка
  useEffect(() => {
    let filtered = [...projects];

    // Применяем фильтры
    if (selectedYear) {
      filtered = filtered.filter((p) => p.year.toString() === selectedYear);
    }

    if (selectedTech) {
      filtered = filtered.filter((p) => p.techStack.includes(selectedTech));
    }

    if (selectedStatus) {
      filtered = filtered.filter((p) => p.status === selectedStatus);
    }

    // Применяем сортировку
    if (sortBy === "newest") {
      filtered.sort((a, b) => b.year - a.year);
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => a.year - b.year);
    } else if (sortBy === "alphabetical") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    // Обновляем отфильтрованные проекты
    onFilteredProjectsChange(filtered);
  }, [
    projects,
    selectedYear,
    selectedTech,
    selectedStatus,
    sortBy,
    onFilteredProjectsChange,
  ]);

  const handleReset = () => {
    setSelectedYear("");
    setSelectedTech("");
    setSelectedStatus("");
    setSortBy("");
  };

  return (
    <FiltersUi
      years={years}
      techStack={techStack}
      statuses={statuses}
      selectedYear={selectedYear}
      selectedTech={selectedTech}
      selectedStatus={selectedStatus}
      sortBy={sortBy}
      onYearChange={setSelectedYear}
      onTechChange={setSelectedTech}
      onStatusChange={setSelectedStatus}
      onSortChange={(value) => {
        if (
          value === "newest" ||
          value === "oldest" ||
          value === "alphabetical" ||
          value === ""
        ) {
          setSortBy(value);
        }
      }}
      onReset={handleReset}
    />
  );
};

export default ProjectsFiltersWidget;
