import {
  Button,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0";
import { Box } from "@mui/system";
import { useState } from "react";
import Moment from "react-moment";
import PageWrapper from "../../components/PageWrapper";
import ServerPing from "../../components/ServerPing";
import servers from "../../lib/servers";
import minecount from "../../lib/minecount";

export const getServerSideProps = async (context) => {
  const { name } = context.query;

  try {
    const server = await servers.findByName(name);
    if (server === null) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        server: minecount.map(server),
      },
    };
  } catch (error) {
    return {
      props: {
        error: true,
      },
    };
  }
};

const Server = ({ server }) => {
  const { user, isLoading } = useUser();
  const [name, setName] = useState(server.name);
  const [ip, setIp] = useState(server.ip);
  const [website, setWebsite] = useState(server.website || "");
  const [discord, setDiscord] = useState(server.discord || "");

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(false);

  const save = async () => {
    setLoading(true);
    setSaved(false);
    setError(false);

    const res = await fetch(`/api/servers`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: server.id,
        ip,
        name,
        website,
        discord,
      }),
    });

    const data = await res.json();

    setLoading(false);

    if (res.status !== 200) {
      setError(data?.errorMessage || true);
    } else {
      setSaved(true);
    }
  };

  return (
    <PageWrapper title="Servers">
      <Box sx={{ color: "#E3E3E3" }}>
        {Boolean(server) && (
          <>
            <Typography variant="h5" sx={{ marginTop: 3, marginBottom: 1 }}>
              {server.name}
            </Typography>

            <Divider />

            <Box sx={{ marginTop: 3, marginBottom: 3 }}>
              <ServerPing
                key={server.ip}
                ip={server.ip}
                favicon={server.favicon}
                playerCount={server.playerCount}
                maxPlayers={server.maxPlayers}
                motd={server.motd}
                href={`/minecraft-servers/pending/${server.id}`}
              />
            </Box>

            <Divider />

            <Typography component="p" sx={{ marginTop: 3 }}>
              🔍 Tracking this server since{" "}
              <Moment date={server.createdDate} format="MM/DD/yyyy" /> at{" "}
              <Moment date={server.createdDate} format="hh:mma" />
            </Typography>

            {/* Server Info */}
            <TableContainer
              component={Paper}
              sx={{ maxWidth: 400, marginTop: 3 }}
            >
              <Table sx={{ maxWidth: 400 }} size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Server Info</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 500 }}>IP</TableCell>
                    <TableCell>{server.ip}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 500 }}>Version(s)</TableCell>
                    <TableCell>{server.versionName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 500 }}>Players</TableCell>
                    <TableCell>
                      {server.playerCount}/{server.maxPlayers}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 500 }}>Added</TableCell>
                    <TableCell>
                      <Moment date={server.createdDate} format="MM/DD/YYYY" />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            {/* Admin section */}
            {!isLoading && user && (
              <>
                <Divider sx={{ marginTop: 4, marginBottom: 4 }} />
                <Typography
                  variant="h5"
                  component="h5"
                  sx={{ marginBottom: 2 }}
                >
                  Administrator: Modify Server
                </Typography>

                <Box sx={{ maxWidth: 250 }}>
                  <TextField
                    label="Name"
                    sx={{ display: "block", marginBottom: 2 }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                  />

                  <TextField
                    label="IP"
                    sx={{ display: "block", marginBottom: 2 }}
                    value={ip}
                    onChange={(e) => setIp(e.target.value)}
                    fullWidth
                  />

                  <TextField
                    label="Website"
                    sx={{ display: "block", marginBottom: 2 }}
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    fullWidth
                  />

                  <TextField
                    label="Discord"
                    sx={{ display: "block", marginBottom: 2 }}
                    value={discord}
                    onChange={(e) => setDiscord(e.target.value)}
                    fullWidth
                  />

                  <Button
                    variant="contained"
                    fullWidth
                    disabled={loading}
                    onClick={save}
                  >
                    Save
                  </Button>
                </Box>

                {Boolean(error) && (
                  <Typography component="p" sx={{ marginTop: 2 }}>
                    ⚠️ Oh no! An error occurred: &quot;{error}&quot;
                  </Typography>
                )}

                {Boolean(saved) && (
                  <Typography component="p" sx={{ marginTop: 2 }}>
                    ✅ Successfully updated server.
                  </Typography>
                )}
              </>
            )}
          </>
        )}
      </Box>
    </PageWrapper>
  );
};

export default Server;
