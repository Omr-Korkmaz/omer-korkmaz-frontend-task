const filterUtils = (data: any[], filter: string): any[] => {
    return data.filter((item) =>
      item.title.toLowerCase().includes(filter.toLowerCase())
    );
  };
  
  export default filterUtils;
  