import { Pagination, PaginationItem } from "@mui/material";
import Link from "next/link";

const BottomPagination = ({ href, page, pageCount }) => {
  return (
    <Pagination
      page={page}
      count={pageCount}
      defaultPage={page}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          href={`${href}?page=${item.page}`}
          {...item}
        />
      )}
    />
  );
};

export default BottomPagination;
