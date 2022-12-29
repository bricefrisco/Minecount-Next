import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import servers from "../../../lib/servers";
import { JavaStatusResponse, status } from "minecraft-server-util";

export default withApiAuthRequired(async (req, res) => {
  if (req.method === "POST") {
    try {
      const { ip } = req.body;
      if (!ip) {
        throw new Error("ip cannot be blank or null");
      }

      const normalizedIp = ip.trim().toLowerCase();

      const ping: JavaStatusResponse = await status(normalizedIp);
      const server = await servers.validateAndInsert(normalizedIp, ping);
      res.status(200).json({ id: server.id });
    } catch (e) {
      res.status(500).json({ errorMessage: e.message || "Error occurred" });
    }

    return;
  }

  if (req.method === "PUT") {
    try {
      const { id, ip, name, website, discord } = req.body;
      servers.update({ id, ip, name, website, discord });
      res.status(200).json({ message: "Server updated successfully" });
    } catch (e) {
      res.status(500).json({ errorMessage: e.message || "Error occurred" });
    }

    return;
  }

  res.status(405).json({ errorMessage: "Method not allowed" });
});
