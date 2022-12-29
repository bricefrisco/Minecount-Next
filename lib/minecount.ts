import servers, { Server } from "./servers";
import { JavaStatusResponse, status } from "minecraft-server-util";

export type ServerDTO = {
  id: number;
  ip: string;
  name?: string;
  favicon: string;
  motd: string;
  versionName: string;
  versionProtocol: number;
  playerCount: number;
  maxPlayers: number;
  approved?: boolean;
  notes?: string;
  website?: string;
  discord?: string;
  createdDate: number;
};

export type PingResponse = {
  alreadyExists: boolean;
  existingServer: ServerDTO;
  ping: JavaStatusResponse;
};

class Minecount {
  public map(server: Server): ServerDTO | null {
    if (!server) {
      return null;
    }

    return {
      id: server.id,
      ip: server.ip,
      name: server.name,
      favicon: server.favicon,
      motd: server.motd,
      versionName: server.version_name,
      versionProtocol: server.version_protocol,
      playerCount: server.player_count,
      maxPlayers: server.max_players,
      approved: server.approved,
      notes: server.notes,
      website: server.website,
      discord: server.discord,
      createdDate: server.created_date.getTime(),
    };
  }

  public async ping(ip: string): Promise<PingResponse> {
    if (!ip) {
      throw new Error(`ip cannot be blank`);
    }

    const normalizedIp = ip.trim().toLowerCase();
    const ping = await status(normalizedIp);

    const server: Server | null = await servers.findExisting(
      normalizedIp,
      ping.favicon,
      ping.motd.html
    );

    return {
      alreadyExists: server !== null,
      existingServer: this.map(server),
      ping,
    };
  }
}

export default new Minecount();
