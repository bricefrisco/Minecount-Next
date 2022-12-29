import { UserProvider } from "@auth0/nextjs-auth0";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "../styles/global.css";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1f1f1f",
      paper: "#2d2f31",
    },
    custom: {
      typography: {
        primary: "red",
      },
    },
  },
});

const MyApp = ({ Component, pageProps }) => {
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </UserProvider>
  );
};

export default MyApp;
