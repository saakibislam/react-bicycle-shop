import { useEffect, useState } from "react";

const usePagination = (items, perPage) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));

  // Reset to page 1 whenever the filtered list changes
  useEffect(() => {
    setPage(1);
  }, [items]);

  const start = (page - 1) * perPage;
  const pageItems = items.slice(start, start + perPage);

  return { page, setPage, totalPages, pageItems, start };
};

export default usePagination;
