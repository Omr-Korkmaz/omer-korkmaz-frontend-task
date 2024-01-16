// import { swapiApiParams, swapiApiResponse } from "../types/swapiApiParams";

const filterUtils = (data: any[], filter: string): any[] => {
  return data.filter((item) =>
    item.fullName.toLowerCase().includes(filter.toLowerCase())
  );
};

export default filterUtils;
