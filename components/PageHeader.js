import { Typography } from "@mui/material";

const PageHeader = ({ children }) => {
  return (
    <Typography component="h1" variant="h3" sx={{ color: "#E3E3E3" }}>
      {children}
    </Typography>
  );
};

export default PageHeader;
