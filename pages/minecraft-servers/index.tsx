import { Button, TextField, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import PageWrapper from "../../components/PageWrapper";
import TopPagination from "../../components/TopPagination";
import Server from "../../components/Server";
import Link from "next/link";
import BottomPagination from "../../components/BottomPagination";
import servers from "../../lib/servers";
import minecount, { ServerDTO } from "../../lib/minecount";

export const getServerSideProps = async (context) => {
  const page = Number(context.query?.page) || 1;

  console.log("page #: " + page);

  const count = await servers.countApproved();
  const approvedServers = await servers.findApproved(page);
  const serverDtos: ServerDTO[] = approvedServers.map((s) => minecount.map(s));
  const pageCount = Math.ceil(count / 15.0);

  return {
    props: {
      servers: serverDtos || null,
      page,
      count: count || null,
      pageCount: pageCount || null,
      pageSize: 15,
    },
  };
};

const MinecraftServers = ({ servers, page, count, pageCount, pageSize }) => {
  return (
    <PageWrapper title="Minecraft Servers">
      <Box sx={{ maxWidth: 1000 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TopPagination
            href="/minecraft-servers"
            page={page}
            count={count}
            pageCount={pageCount}
            pageSize={pageSize}
          />
          <Box sx={{ display: "flex" }}>
            <Tooltip title="Search for a specific server" placement="top">
              <TextField
                variant="outlined"
                sx={{ marginRight: 2, "& input": { padding: 1 } }}
                placeholder="Search..."
              />
            </Tooltip>
            <Link
              href="/minecraft-servers/add"
              style={{
                textDecoration: "none!important",
              }}
            >
              <Tooltip title="Add a new server" placement="top">
                <Button
                  variant="outlined"
                  sx={{
                    textDecoration: "none!important",
                    "&:visited": { textDecoration: "none!important" },
                    height: "100%",
                  }}
                >
                  Add Server
                </Button>
              </Tooltip>
            </Link>
          </Box>
        </Box>

        {servers.map((server) => (
          <Server server={server} key={server.ip} />
        ))}

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <BottomPagination
            href="/minecraft-servers"
            page={page}
            pageCount={pageCount}
          />
        </Box>
      </Box>
    </PageWrapper>
  );
};

export default MinecraftServers;
