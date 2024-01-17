import { swapiApiParams } from "../types/swapiApiParams";
import { calculateAverageRating } from "./ratingUtils";

export interface SortingCriteria {
  column: string;
  order: string;
}

const sortDataUtils = (
  data: swapiApiParams[],
  sortingCriteria: SortingCriteria
): swapiApiParams[] => {
  return [...data].sort((a, b) => {
    if (sortingCriteria.column === "release_date") {
      const dateA = new Date(a[sortingCriteria.column]);
      const dateB = new Date(b[sortingCriteria.column]);
      return sortingCriteria.order === "asc"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    } else if (sortingCriteria.column === "episode_id") {
      return sortingCriteria.order === "asc"
        ? (a[sortingCriteria.column] as number) - (b[sortingCriteria.column] as number)
        : (b[sortingCriteria.column] as number) - (a[sortingCriteria.column] as number);
    } else if (sortingCriteria.column === "rate") {
      const averageRatingA = calculateAverageRating(a);
      const averageRatingB = calculateAverageRating(b);

      return sortingCriteria.order === "asc"
        ? averageRatingA - averageRatingB
        : averageRatingB - averageRatingA;
    }

    const comparison = sortingCriteria.order === "asc" ? 1 : -1;
    return (a[sortingCriteria.column] as string) > (b[sortingCriteria.column] as string)
      ? comparison
      : -comparison;
  });
};

export default sortDataUtils
