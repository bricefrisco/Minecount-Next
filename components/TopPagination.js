import {
  FirstPage,
  LastPage,
  NavigateBefore,
  NavigateNext,
} from "@mui/icons-material";
import { IconButton, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";

const TopPagination = ({ href, count, page, pageCount, pageSize }) => {
  const startCount = (page - 1) * pageSize + 1;
  const endCount = page === pageCount ? count : page * pageSize;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        marginTop: 3,
        marginBottom: 2,
      }}
    >
      <Typography
        variant="p"
        component="p"
        sx={{
          color: "lightgray",
          display: "inline-flex",
          marginRight: 1,
        }}
      >
        {startCount} - {endCount} of {count} servers.
      </Typography>
      <Box sx={{ display: "flex" }}>
        {/* First Page */}
        {page <= 1 ? (
          <IconButton disabled>
            <FirstPage />
          </IconButton>
        ) : (
          <Tooltip title="First Page" placement="top">
            <Link href={href}>
              <IconButton>
                <FirstPage />
              </IconButton>
            </Link>
          </Tooltip>
        )}
        {/* Previous Page */}
        {page <= 1 ? (
          <IconButton disabled>
            <NavigateBefore />
          </IconButton>
        ) : (
          <Tooltip title="Previous Page" placement="top">
            <Link href={`${href}?page=${page - 1}`}>
              <IconButton>
                <NavigateBefore />
              </IconButton>
            </Link>
          </Tooltip>
        )}
        {/* Next Page */}
        {page >= pageCount ? (
          <IconButton disabled>
            <NavigateNext />
          </IconButton>
        ) : (
          <Tooltip title="Next Page" placement="top">
            <Link href={`${href}?page=${page + 1}`}>
              <IconButton>
                <NavigateNext />
              </IconButton>
            </Link>
          </Tooltip>
        )}
        {/* Last Page */}
        {page >= pageCount ? (
          <IconButton disabled>
            <LastPage />
          </IconButton>
        ) : (
          <Tooltip title="Last Page" placement="top">
            <Link href={`${href}?page=${pageCount}`}>
              <IconButton>
                <LastPage />
              </IconButton>
            </Link>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};

export default TopPagination;
