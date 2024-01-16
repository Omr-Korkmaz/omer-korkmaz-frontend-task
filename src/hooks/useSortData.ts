import { useState } from "react";

interface SortingCriteria {
  column: string;
  order: string;
}

interface UseSortDataProps<T> {
  initialData: T[];
  defaultSortingCriteria: SortingCriteria;
}

const useSortData = <T>({ initialData, defaultSortingCriteria }: UseSortDataProps<T>) => {
  const [data, setData] = useState<T[]>(initialData);
  const [sortingCriteria, setSortingCriteria] = useState<SortingCriteria>(defaultSortingCriteria);

  const sortData = () => {
    const sortedData = [...data].sort((a, b) => {
      if (sortingCriteria.column === "release_date") {
        const dateA = new Date((a as  Record<string, Date>)[sortingCriteria.column]);
        const dateB = new Date((b as  Record<string, Date>)[sortingCriteria.column]);
        return sortingCriteria.order === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
      } else if (sortingCriteria.column === "episode_id") {
        return sortingCriteria.order === "asc" ? (a as Record<string, number>)[sortingCriteria.column] - (b as Record<string, number>)[sortingCriteria.column] : (b as any)[sortingCriteria.column] - (a as any)[sortingCriteria.column];
      }
      return (a as Record<string, string>)[sortingCriteria.column] > (b as Record<string, string>)[sortingCriteria.column] ? 1 : -1;
    });

    setData(sortedData);
  };

  const handleSort = (column: string, order: string) => {
    setSortingCriteria({ column, order });
  };

  return {
    data,
    sortingCriteria,
    handleSort,
    sortData,
  };
};

export default useSortData;
