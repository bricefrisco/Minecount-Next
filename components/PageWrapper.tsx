import { Box } from "@mui/system";
import NavigationDrawer from "./NavigationDrawer";
import { styled } from "@mui/material/styles";
import PageHeader from "./PageHeader";
import PageDescription from "./PageDescription";

const Container = styled(Box)(() => ({
  display: "flex",
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: "auto",
  width: "100%",
  maxWidth: 1000,
}));

type Props = {
  title: string;
  description?: string;
  children: any;
};

const PageWrapper = ({ title, description, children }: Props) => {
  return (
    <Container>
      <NavigationDrawer />
      <ContentContainer>
        <PageHeader>{title}</PageHeader>
        <PageDescription>{description}</PageDescription>
        {children}
      </ContentContainer>
    </Container>
  );
};

export default PageWrapper;
