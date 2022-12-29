import {
  Button,
  CircularProgress,
  Divider,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { JavaStatusResponse } from "minecraft-server-util";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import ServerPing from "../../components/ServerPing";
import minecount from "../../lib/minecount";
import { Server } from "../../lib/servers";

export const getServerSideProps = async (context) => {
  const { query } = context;

  if (query?.ip) {
    try {
      const res = await minecount.ping(query.ip);
      return {
        props: {
          initialIp: query.ip,
          alreadyExists: res.alreadyExists,
          existingServer: res.existingServer,
          ping: res.ping,
          error: false,
        },
      };
    } catch (error) {
      return {
        props: {
          initialIp: query.ip,
          alreadyExists: null,
          existingServer: null,
          ping: null,
          error: true,
        },
      };
    }
  }

  return {
    props: {},
  };
};

type Props = {
  initialIp: string;
  existingServer: Server;
  ping: JavaStatusResponse;
  error: boolean;
};

const AddAServer = ({ initialIp = "", existingServer, ping, error }: Props) => {
  const router = useRouter();

  const [ip, setIp] = useState(initialIp);
  const [loading, setLoading] = useState(false);

  const [submittedServer, setSubmittedServer] = useState();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const onPing = () => {
    setLoading(true);
    router.push(`/minecraft-servers/add?ip=${ip}`);
  };

  const onSubmit = async () => {
    setSubmittedServer(null);
    setSubmitError(false);
    setSubmitLoading(true);

    const res = await fetch(`/api/servers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ip: initialIp }),
    });

    const data = await res.json();

    setSubmitLoading(false);

    if (res.status !== 200) {
      setSubmitError(true);
      return;
    }

    setSubmittedServer(data);
  };

  const getLink = () => {
    if (existingServer?.approved) {
      return `/minecraft-servers/${existingServer.name.toLowerCase()}`;
    } else if (existingServer) {
      return `/minecraft-servers/pending/${existingServer.id}`;
    } else {
      return `/minecraft-servers/add?ip=${initialIp}`;
    }
  };

  useEffect(() => {
    setSubmittedServer(null);
    setSubmitLoading(false);
    setSubmitError(false);
  }, [initialIp]);

  useEffect(() => {
    const handleComplete = (url) => url === router.asPath && setLoading(false);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <PageWrapper
      title="Add a Server"
      description="Adding a server to our lists is easy! Any server with over 50 players
    online is allowed as long as it is appropriate. Added servers are
    tracked right away, although they are not publicly listed until they
    undergo manual review."
    >
      <Divider sx={{ marginTop: 3, marginBottom: 5 }} />

      <Box sx={{ color: "#E3E3E3" }}>
        <Box
          sx={{
            display: "flex",
            alignContent: "center",
            marginBottom: 2,
          }}
        >
          <TextField
            label="Server IP"
            placeholder="mc.example.com"
            variant="outlined"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            sx={{
              width: "100%",
              maxWidth: "520px",
              ".MuiInputBase-root": {
                borderTopRightRadius: "0px",
                borderBottomRightRadius: "0px",
                marginRight: "-1px",
              },
            }}
          ></TextField>
          <Button
            variant="contained"
            sx={{
              width: 100,
              borderTopLeftRadius: "0px",
              borderBottomLeftRadius: "0px",
            }}
            disabled={ip?.length <= 5 || loading}
            onClick={onPing}
          >
            {loading ? (
              <CircularProgress
                size={24}
                sx={{
                  color: "#90caf9",
                }}
              />
            ) : (
              "Ping"
            )}
          </Button>
        </Box>

        {ping && (
          <ServerPing
            favicon={ping.favicon}
            playerCount={ping.players.online}
            maxPlayers={ping.players.max}
            motd={ping.motd.html}
            ip={initialIp}
            href={getLink()}
          />
        )}

        {Boolean(ping) && <Divider sx={{ marginTop: 5, marginBottom: 4 }} />}

        <Box sx={{ maxWidth: 850 }}>
          {/* Could not ping the server */}
          {error && (
            <Typography component="p">
              ⚠️ Oh no! We cannot connect to that server. Please check the IP
              and try again.
            </Typography>
          )}

          {/* Server already exists, and is approved */}
          {existingServer?.approved && (
            <Box>
              <Typography component="p">
                Hmm 🤔, it looks like this server already exists and has been
                approved!
              </Typography>
              <Typography component="p" sx={{ marginTop: 0.5 }}>
                You can view the server details here:{" "}
                <Link href={`/minecraft-servers/${existingServer.name}`}>
                  {existingServer.name}
                </Link>
              </Typography>
            </Box>
          )}

          {/* Server already exists, but is not approved */}
          {existingServer && !existingServer.approved && (
            <Box>
              <Typography component="p">
                Hmm 🤔, it looks like this server is pending approval!
              </Typography>

              <Typography component="p" sx={{ marginTop: 0.5 }}>
                You can view the status of this request here:{" "}
                <Link href={`/minecraft-servers/pending/${existingServer.id}`}>
                  Server Request #{existingServer.id}
                </Link>
              </Typography>
            </Box>
          )}

          {/* Server doesn't already exist, but does not have enough players */}
          {!Boolean(existingServer) && ping?.players?.online < 50 && (
            <Typography component="p">
              Sorry 😔! To ensure quality and prevent spam, servers must have at
              least 50 players online to be added.
            </Typography>
          )}

          {/* Server doesn't already exist, and may be added */}
          {!Boolean(existingServer) &&
            !Boolean(submittedServer) &&
            ping?.players?.online >= 50 && (
              <Box>
                <Typography>
                  Looks like that server isn&apos;t on our site yet! If you are
                  sure you would like it to be added, you can submit it for
                  approval.
                </Typography>
                <Button
                  variant="contained"
                  sx={{ marginTop: 2 }}
                  onClick={onSubmit}
                  disabled={submitLoading || Boolean(submittedServer)}
                >
                  {submitLoading ? (
                    <CircularProgress
                      size={24}
                      sx={{
                        color: "#90caf9",
                      }}
                    />
                  ) : (
                    "Submit For Approval"
                  )}
                </Button>
              </Box>
            )}

          {/* Server has been successfully submitted */}
          {!Boolean(existingServer) && Boolean(submittedServer) && (
            <Box sx={{ marginTop: 2 }}>
              <Typography component="p">
                ✅ Success! This server has been submitted for review.
              </Typography>

              <Typography component="p" sx={{ marginTop: 0.5 }}>
                You can track the status of this request here:{" "}
                {/* @ts-ignore */}
                <Link href={`/minecraft-servers/pending/${submittedServer.id}`}>
                  {/* @ts-ignore */}
                  Server Request #{submittedServer.id}
                </Link>
              </Typography>

              <Typography component="p" sx={{ marginTop: 0.5 }}>
                If you lose this link, you can return here and ping the IP to
                retrieve it again. 🙂
              </Typography>
            </Box>
          )}

          {/* An error occurred while submitting the server */}
          {!Boolean(existingServer) && Boolean(submitError) && (
            <Box sx={{ marginTop: 2 }}>
              <Typography component="p">
                ❌ Oh no! Something went wrong while submitting the server for
                review. Please wait awhile and try again.
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </PageWrapper>
  );
};

export default AddAServer;
