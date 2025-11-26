import styles from "./FiltersUi.module.scss";
import DropdownUi from "../dropdown/DropdownUi";

interface FiltersUiProps {
  years: string[];
  techStack: string[];
  statuses: string[];
  selectedYear: string;
  selectedTech: string;
  selectedStatus: string;
  sortBy: string;
  onYearChange: (value: string) => void;
  onTechChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onReset: () => void;
}

const FiltersUi = ({
  years,
  techStack,
  statuses,
  selectedYear,
  selectedTech,
  selectedStatus,
  sortBy,
  onYearChange,
  onTechChange,
  onStatusChange,
  onSortChange,
  onReset,
}: FiltersUiProps) => {
  const sortOptions = ["newest", "oldest", "alphabetical"];

  return (
    <div className={styles.filters}>
      <div className={styles.filters__grid}>
        <DropdownUi
          label="Year"
          value={selectedYear}
          options={years}
          onChange={onYearChange}
          placeholder="All years"
        />
        <DropdownUi
          label="Tech Stack"
          value={selectedTech}
          options={techStack}
          onChange={onTechChange}
          placeholder="All technologies"
        />
        <DropdownUi
          label="Status"
          value={selectedStatus}
          options={statuses}
          onChange={onStatusChange}
          placeholder="All statuses"
        />
        <DropdownUi
          label="Sort By"
          value={sortBy}
          options={sortOptions}
          onChange={onSortChange}
          placeholder="Default"
        />
      </div>
      <button className={styles.filters__reset} onClick={onReset}>
        Reset
      </button>
    </div>
  );
};

export default FiltersUi;
