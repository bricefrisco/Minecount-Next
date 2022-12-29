import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { parse, toHTML } from "minecraft-motd-util";
import Link from "next/link";

const ServerPing = ({ ip, favicon, playerCount, maxPlayers, motd, href }) => {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        padding: 2,
        fontFamily: "'Minecraftia', sans-serif",
        color: "#E3E3E3",
        maxWidth: 620,
      }}
    >
      <CardMedia
        component="img"
        image={favicon}
        alt="Server Favicon"
        sx={{ width: 64, height: 64 }}
        draggable={false}
      />
      <CardContent
        sx={{
          margin: 0,
          paddingTop: "0!important",
          paddingBottom: "0!important",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Link
            href={href}
            style={{
              color: "#E3E3E3",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            <Typography
              component="div"
              variant="h5"
              sx={{
                fontSize: "1.2rem",
                padding: 0,
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {ip}
            </Typography>
          </Link>
          <Typography
            sx={{ fontFamily: "'Minecraftia', sans-serif", fontSize: "0.9rem" }}
          >
            {playerCount}
            <span
              style={{
                marginLeft: "1px",
                marginRight: "1px",
                color: "darkgray",
              }}
            >
              /
            </span>
            <span>{maxPlayers}</span>
          </Typography>
        </Box>
        <Typography component="div" variant="p" sx={{ fontSize: "0.9rem" }}>
          <Box
            sx={{
              whiteSpace: "pre-wrap",
            }}
            dangerouslySetInnerHTML={{
              __html: motd,
            }}
          />
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ServerPing;
