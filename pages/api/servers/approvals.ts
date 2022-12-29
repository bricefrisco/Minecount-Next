import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import servers, { Server } from "../../../lib/servers";

export default withApiAuthRequired(async (req, res) => {
  if (req.method !== "PUT") {
    res.status(405).json({ errorMessage: "Method not allowed" });
    return;
  }

  try {
    const { user } = getSession(req, res);
    const userId = user["/minecount/user_id"];
    const { id, approved, name, notes } = req.body;

    const server: Server = await servers.approval({
      id,
      approved,
      name,
      notes,
      approver: userId,
    });

    res
      .status(200)
      .json({ message: `Server ${server.id} updated successfully` });
  } catch (e) {
    console.error(e);
    res.status(500).json({ errorMessage: e.message || "Error occurred" });
  }
});
