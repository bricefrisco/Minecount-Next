import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import minecount, { ServerDTO } from "../../../lib/minecount";
import servers from "../../../lib/servers";

export default withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const serversWithNoDiscord = await servers.findAllNoDiscord();
      const mapped: ServerDTO[] = serversWithNoDiscord.map((s) =>
        minecount.map(s)
      );
      res.status(200).json(mapped);
    } catch (error) {
      res
        .status(500)
        .json({ errorMessage: error.message || "Internal server error" });
    }
  }
);
