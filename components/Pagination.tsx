import {
  ArrowLongRightIcon,
  ArrowLongLeftIcon,
} from "@heroicons/react/20/solid";
import LinkButton from "./LinkButton";

export type Pagination = {
  page: number;
  pageSize: number;
  totalElements: number;
  pageCount: number;
};

const Pagination = ({ count, page, pageCount, pageSize }) => {
  const startCount = (page - 1) * pageSize + 1;
  const endCount = page === pageCount ? count : page * pageSize;

  return (
    <div className="flex place-content-end items-center text-gray-300">
      <span className="mr-5">
        {startCount} - {endCount} of {count} servers.
      </span>

      <LinkButton
        href={`/?page=${page - 1}`}
        disabled={page < 2}
        className="mr-4"
      >
        <ArrowLongLeftIcon className="mr-2 h-6 w-6" /> Back
      </LinkButton>

      <LinkButton href={`/?page=${page + 1}`} disabled={page >= pageCount}>
        Next <ArrowLongRightIcon className="ml-2 h-6 w-6" />
      </LinkButton>
    </div>
  );
};

export default Pagination;
