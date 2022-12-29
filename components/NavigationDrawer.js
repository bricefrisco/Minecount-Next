import { Drawer, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import StorageIcon from "@mui/icons-material/Storage";
import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";
import InfoIcon from "@mui/icons-material/Info";
import QueueIcon from "@mui/icons-material/Queue";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";

const drawerWidth = 88;

const StyledLink = styled(Link)(() => ({
  "&:first-of-type": {
    marginTop: 0,
  },
  marginTop: "17px",
  textDecoration: "none",
  display: "block",
}));

const NavButtonContainer = styled(Box)(() => ({
  ".MuiSvgIcon-bg": {
    maxWidth: "56px",
    margin: "auto",
    borderRadius: "25px",
    color: "#c4c7c5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "4px",
    paddingBottom: "4px",
  },
  ".MuiSvgIcon-bg.selected": {
    backgroundColor: "#004a77",
  },
  ".MuiSvgIcon-bg.selected > .MuiSvgIcon-root": {
    color: "#c2e7ff",
  },
  "&:hover": {
    ".MuiSvgIcon-bg": {
      backgroundColor: "#383a3c",
    },
    ".MuiSvgIcon-bg.selected": {
      backgroundColor: "#004a77",
    },
    ".MuiTypography-root": {
      color: "#E3E3E3",
    },
    ".MuiTypography-root.selected": {
      color: "#c2e7ff",
    },
    ".MuiSvgIcon-root": {
      color: "#E3E3E3",
    },
  },
}));

const NavButtonText = styled(Typography)(() => ({
  "&.selected": {
    color: "#c2e7ff",
  },
  color: "#c4c7c5",
  fontWeight: 500,
  marginTop: "1px",
}));

const NavButton = ({ href, selected, text, children }) => {
  return (
    <StyledLink href={href}>
      <NavButtonContainer>
        <Box className={selected ? "MuiSvgIcon-bg selected" : "MuiSvgIcon-bg"}>
          {children}
        </Box>
        <NavButtonText
          className={selected ? "selected" : null}
          variant="caption"
          display="block"
        >
          {text}
        </NavButtonText>
      </NavButtonContainer>
    </StyledLink>
  );
};

const DrawerContentsContainer = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  textAlign: "center",
}));

const NavigationDrawer = () => {
  const { user, error, isLoading } = useUser();
  const { pathname } = useRouter();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: "none",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <DrawerContentsContainer>
        <NavButton text="Home" href="/" selected={pathname === "/"}>
          <HomeIcon />
        </NavButton>

        <NavButton
          text="Servers"
          href="/minecraft-servers"
          selected={pathname.startsWith("/minecraft-servers")}
        >
          <StorageIcon />
        </NavButton>

        <NavButton text="Pinger" href="/minecraft-pinger">
          <NetworkCheckIcon />
        </NavButton>

        <NavButton text="About" href="/about">
          <InfoIcon />
        </NavButton>

        {Boolean(user) && (
          <NavButton
            text="Queues"
            href="/queues"
            selected={pathname.startsWith("/queues")}
          >
            <QueueIcon />
          </NavButton>
        )}
      </DrawerContentsContainer>
    </Drawer>
  );
};

export default NavigationDrawer;
