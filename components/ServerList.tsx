import { ServerDTO } from "../lib/minecount";
import Pagination from "./Pagination";
import type { Pagination as PaginationType } from "./Pagination";
import Server from "./Server";

type Props = {
  servers: ServerDTO[];
  pagination: PaginationType;
  query?: string;
};

const ServerList = ({ servers, pagination, query }: Props) => {
  return (
    <section id="server-list">
      <h3 className="text-2xl font-bold">Servers</h3>
      <h4 className="pt-1 text-lg font-light">
        {query
          ? `Browse through tracked servers matching the name '${query}'`
          : "Browse through tracked servers"}
      </h4>

      <Pagination
        count={pagination.totalElements}
        page={pagination.page}
        pageCount={pagination.pageCount}
        pageSize={pagination.pageSize}
      />

      <div className="mt-4 mb-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
        {servers.map((server) => (
          <Server key={server.id} server={server} />
        ))}
      </div>
    </section>
  );
};

export default ServerList;
