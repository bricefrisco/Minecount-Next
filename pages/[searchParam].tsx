import Head from "next/head";
import PageWrapper from "../components/PageWrapper";
import SearchBar from "../components/SearchBar";
import ServerList from "../components/ServerList";
import ServerInfo from "../components/ServerInfo";
import minecount, { PingResponse, ServerDTO } from "../lib/minecount";
import servers from "../lib/servers";
import type { Pagination as PaginationType } from "../components/Pagination";

export const getServerSideProps = async (context) => {
  const searchParam = context.query.searchParam;
  if (minecount.isHostname(searchParam) || minecount.isIpAddress(searchParam)) {
    try {
      const server: PingResponse = await minecount.ping(searchParam);
      const serverDto: ServerDTO = server.alreadyExists
        ? server.existingServer
        : minecount.mapPing(searchParam, server.ping);
      return { props: { searchParam, server: serverDto } };
    } catch (error) {
      return { props: { searchParam, error: true } };
    }
  }

  const page = Number(context.query?.page) || 1;
  const param = searchParam.trim().toLowerCase();

  const approvedServers = await servers.findApprovedWithName(param, page);
  const serverDtos = approvedServers.map((s) => minecount.map(s));

  if (serverDtos.length === 1) {
    return {
      props: {
        query: searchParam,
        server: serverDtos[0],
      },
    };
  }

  const count = await servers.countApprovedWithName(searchParam.toLowerCase());
  const pageCount = Math.ceil(count / 10.0);

  return {
    props: {
      query: searchParam,
      serverList: {
        servers: serverDtos,
        pagination: {
          page,
          pageSize: 10,
          totalElements: count,
          pageCount: pageCount,
        },
      },
    },
  };
};

type ServerList = {
  servers: ServerDTO[];
  pagination: PaginationType;
};

type Props = {
  query: string;
  server?: ServerDTO;
  serverList?: ServerList;
  error?: Boolean;
};

const Minecount = ({ query, server, serverList, error }: Props) => {
  return (
    <>
      <Head>
        <title>Minecraft Player Counter | Minecount</title>
        <meta
          name="description"
          content="Track player counts across hundreds of servers"
        />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <PageWrapper
        title="Minecount"
        subtitle="Track player counts across hundreds of servers"
      >
        {/* Search */}
        <SearchBar initialText={query} />

        {/* Individual server */}
        {server && <ServerInfo server={server} />}

        {/* Server list */}
        {serverList && (
          <ServerList
            servers={serverList.servers}
            pagination={serverList.pagination}
            query={query}
          />
        )}
      </PageWrapper>
    </>
  );
};

export default Minecount;
