import { swapiApiParams } from "../types/swapiApiParams";

const filterUtils = (data: swapiApiParams[], filter: string): swapiApiParams[] => {
  return data.filter((item) =>
    item?.fullName?.toLowerCase().includes(filter.toLowerCase())
  );
};

export default filterUtils;
