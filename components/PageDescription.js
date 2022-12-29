import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTypography = styled(Typography)(({ theme }) => ({
  lineHeight: 1.7,
  fontWeight: "normal",
  color: "#E3E3E3",
  fontSize: "1rem",
  marginTop: theme.spacing(1),
  maxWidth: "850px",
}));

const PageDescription = ({ children }) => {
  return (
    <StyledTypography variant="p" component="h2">
      {children}
    </StyledTypography>
  );
};

export default PageDescription;
