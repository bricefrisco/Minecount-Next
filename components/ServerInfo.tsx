import Moment from "react-moment";
import { ServerDTO } from "../lib/minecount";
import Server from "./Server";

type StatProps = {
  name: string;
  children: any;
  className?: string;
};

const Stat = ({ name, children, className }: StatProps) => {
  return (
    <div
      className={`grid grid-cols-3 border-b border-neutral-700 pt-3 pb-3 ${
        className || ""
      }`}
    >
      <div className="font-bold">{name}</div>
      <div className="col-span-2">{children}</div>
    </div>
  );
};

type Props = {
  server: ServerDTO;
};

const ServerInfo = ({ server }: Props) => {
  return (
    <section id="server-info">
      <Server
        server={server}
        animation={false}
        className="cursor-default rounded-bl-none rounded-br-none border-b-0"
      />
      <div className="w-full grid-cols-3 rounded rounded-tl-none rounded-tr-none border border-neutral-700 bg-neutral-800 pl-4 pr-4">
        <Stat name="Player Count Tracking">
          {server.approved === true && (
            <span>
              <span className="text-green-500">Enabled </span>
              since <Moment date={server.createdDate} format="MM/DD/yyyy" />
            </span>
          )}

          {server.createdDate === undefined && (
            <span>
              <span className="text-yellow-500">
                Disabled - Never Requested{" "}
              </span>
            </span>
          )}
        </Stat>
        {server.name && <Stat name="Name">{server.name}</Stat>}
        <Stat name="IP">{server.ip}</Stat>
        <Stat name="Players Online">{server.playerCount}</Stat>
        <Stat name="Max Players">{server.maxPlayers}</Stat>
        <Stat name="Version Name">{server.versionName}</Stat>
        <Stat name="Version Protocol" className="border-b-0">
          {server.versionProtocol}
        </Stat>
      </div>
    </section>
  );
};

export default ServerInfo;
