import servers, { Server } from "./servers";
import { JavaStatusResponse, status } from "minecraft-server-util";

export type ServerDTO = {
  id?: number;
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
  createdDate?: number;
};

export type PingResponse = {
  alreadyExists: boolean;
  existingServer: ServerDTO;
  ping: JavaStatusResponse;
};

class Minecount {
  private validIpAddressRegex =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;

  private validHostnameRegex =
    /^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

  public isIpAddress(text: string) {
    return this.validIpAddressRegex.test(text);
  }

  public isHostname(text: string) {
    return this.validHostnameRegex.test(text);
  }

  public mapPing(ip: string, ping: JavaStatusResponse): ServerDTO | null {
    if (!ping) {
      return null;
    }

    return {
      ip: ip,
      favicon: ping.favicon,
      motd: ping.motd.html,
      versionName: ping.version.name,
      versionProtocol: ping.version.protocol,
      playerCount: ping.players.online,
      maxPlayers: ping.players.max,
    };
  }

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
