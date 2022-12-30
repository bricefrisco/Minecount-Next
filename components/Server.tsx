import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { ServerDTO } from "../lib/minecount";

type Props = {
  server: ServerDTO;
  animation?: boolean;
  className?: string;
};

const Server = ({ server, className, animation = true }: Props) => {
  const router = useRouter();

  return (
    <motion.div
      whileHover={animation ? { scale: 1.01 } : undefined}
      whileTap={animation ? { scale: 0.99 } : undefined}
      className={`cursor-pointer rounded border border-neutral-700 bg-neutral-800 p-3.5 ${className}`}
      onClick={() =>
        router.push(`/${(server.name || server.ip).toLowerCase()}`)
      }
    >
      <div className="flex">
        <Image
          className="max-h-[64px] max-w-[64px]"
          src={server.favicon}
          width={64}
          height={64}
          alt="Server Icon"
        />
        <div className="ml-2 w-full">
          <div className="flex w-full place-content-between">
            <span className="text-lg font-bold">
              {server.name || server.ip}
            </span>
            <span className="text-gray-300">
              {server.playerCount} / {server.maxPlayers}{" "}
            </span>
          </div>
          <div
            className="whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: server.motd }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Server;
