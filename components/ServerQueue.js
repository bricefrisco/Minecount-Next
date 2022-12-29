import {
  Box,
  Divider,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { parse, toHTML } from "minecraft-motd-util";

const ServerQueue = ({ title, servers }) => {
  return (
    <Box sx={{ marginTop: 3 }}>
      <Typography variant="h5" component="h5">
        {title}
      </Typography>

      <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

      <TableContainer component={Paper} sx={{ maxWidth: 800 }}>
        <Table sx={{ maxWidth: 800 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">Icon</TableCell>
              <TableCell align="center">IP</TableCell>
              <TableCell align="center">MOTD</TableCell>
              <TableCell align="center">Players</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {servers.map((server) => (
              <TableRow key={server.ip}>
                <TableCell>
                  <Image
                    height={64}
                    width={64}
                    src={server.favicon}
                    alt="Server favicon"
                  />
                </TableCell>
                <TableCell>
                  <Link
                    href={
                      server.approved
                        ? `/minecraft-servers/${server.name.toLowerCase()}`
                        : `/minecraft-servers/pending/${server.id}`
                    }
                    target="_blank"
                    style={{ cursor: "pointer", textDecoration: "none" }}
                  >
                    {server.ip}
                  </Link>
                </TableCell>
                <TableCell
                  sx={{
                    whiteSpace: "pre-wrap",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: server.motd,
                  }}
                ></TableCell>
                <TableCell align="right">
                  {server.playerCount}/{server.maxPlayers}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ServerQueue;
