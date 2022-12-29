import { Card, IconButton, Link, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import { parse, toHTML } from "minecraft-motd-util";
import LaunchIcon from "@mui/icons-material/Launch";

const Server = ({ server }) => {
  return (
    <Card sx={{ display: "flex", padding: 2, marginBottom: 3, maxWidth: 1000 }}>
      <Image
        src={server.favicon}
        width={64}
        height={64}
        alt="Server Icon"
        style={{ marginRight: "15px" }}
      />
      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
      >
        <Box
          sx={{
            "& a:hover": { textDecoration: "underline!important" },
          }}
        >
          <Link
            href={`/minecraft-servers/${server.name.toLowerCase()}`}
            style={{ textDecoration: "none", cursor: "pointer" }}
          >
            <Tooltip title="View Server Details" placement="right">
              <Typography
                component="h6"
                variant="h6"
                sx={{
                  display: "inline-block",
                }}
              >
                {server.name}
              </Typography>
            </Tooltip>
          </Link>

          <Box>
            <Tooltip title="Copy IP" placement="right">
              <Typography
                component="p"
                variant="p"
                sx={{
                  marginTop: 0.2,
                  display: "inline-block",
                  cursor: "pointer",
                }}
              >
                {server.ip}
              </Typography>
            </Tooltip>
          </Box>

          <Box
            sx={{
              marginTop: 1,
              whiteSpace: "pre-line",
              fontFamily: "'Minecraftia', sans-serif",
            }}
            dangerouslySetInnerHTML={{
              __html: server.motd,
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography component="p" variant="p" sx={{ textAlign: "right" }}>
            {server.playerCount}
            <span
              style={{
                marginLeft: "2px",
                marginRight: "2px",
                color: "lightgray",
              }}
            >
              /
            </span>
            {server.maxPlayers}
          </Typography>

          <Box sx={{ textAlign: "right" }}>
            {Boolean(server.discord) && (
              <a
                href={server.discord}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Tooltip title="Join Discord" placement="top">
                  <IconButton sx={{ marginRight: 0.2 }}>
                    <Image
                      src="/discord.png"
                      width={21}
                      height={21}
                      alt="Discord"
                    />
                  </IconButton>
                </Tooltip>
              </a>
            )}

            {Boolean(server.website) && (
              <a
                href={server.website}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Tooltip title="Visit Website" placement="top">
                  <IconButton sx={{ color: "#E3E3E3" }}>
                    <LaunchIcon sx={{ color: "#E3E3E3" }} />
                  </IconButton>
                </Tooltip>
              </a>
            )}
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default Server;
