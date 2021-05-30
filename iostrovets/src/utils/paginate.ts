export function paginate({ data, pageNumber = 1, pageSize = 7 }) {
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return {
    data: data.slice(startIndex, endIndex),
    info: {
      currentPage: pageNumber,
      total: data.length,
      pagesLeft: Math.ceil(data.length / pageSize),
    },
  };
}
