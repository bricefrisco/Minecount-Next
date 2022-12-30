import Head from "next/head";
import PageWrapper from "../components/PageWrapper";
import SearchBar from "../components/SearchBar";
import ServerList from "../components/ServerList";
import minecount, { ServerDTO } from "../lib/minecount";
import servers from "../lib/servers";
import type { Pagination as PaginationType } from "../components/Pagination";

export const getServerSideProps = async (context) => {
  const page = Number(context.query?.page) || 1;

  const count = await servers.countApproved();
  const approvedServers = await servers.findApproved(page);
  const serverDtos = approvedServers.map((s) => minecount.map(s));
  const pageCount = Math.ceil(count / 10.0);

  return {
    props: {
      servers: serverDtos,
      pagination: {
        page,
        pageSize: 10,
        pageCount,
        totalElements: count,
      },
    },
  };
};

type Props = {
  servers: ServerDTO[];
  pagination: PaginationType;
};

const Home = ({ servers, pagination }: Props) => {
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
        <SearchBar />
        <ServerList servers={servers} pagination={pagination} />
      </PageWrapper>
    </>
  );
};

export default Home;
