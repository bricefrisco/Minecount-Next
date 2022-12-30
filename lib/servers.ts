import { JavaStatusResponse } from "minecraft-server-util";
import * as pg from "pg";

export class Servers {
  private CLIENT = new pg.Client({ ssl: true });
  private PAGE_SIZE = 10;

  constructor() {
    this.CLIENT.connect();
  }

  public async findById(id: number): Promise<Server | null> {
    const { rows } = await this.CLIENT.query(
      `SELECT * FROM servers WHERE id = $1`,
      [id]
    );

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  }

  public async findByName(name: string): Promise<Server | null> {
    const { rows } = await this.CLIENT.query(
      `SELECT * FROM servers WHERE LOWER(name) = $1`,
      [name.trim().toLowerCase()]
    );

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  }

  public async countApproved(): Promise<number> {
    const { rows } = await this.CLIENT.query(
      `SELECT COUNT(*) AS count FROM servers WHERE approved = true`
    );

    return rows[0].count;
  }

  public async findApproved(page: number): Promise<Server[]> {
    const { rows } = await this.CLIENT.query(
      `SELECT * FROM servers WHERE approved = true ORDER BY player_count DESC LIMIT ${
        this.PAGE_SIZE
      } OFFSET ${(page - 1) * this.PAGE_SIZE}`
    );

    return rows;
  }

  public async countApprovedWithName(name: string): Promise<number> {
    const { rows } = await this.CLIENT.query(
      `SELECT COUNT(*) AS count FROM servers WHERE approved = true AND LOWER(name) LIKE $1`,
      [`%${name}%`]
    );

    return rows[0].count;
  }

  public async findApprovedWithName(
    name: string,
    page: number
  ): Promise<Server[]> {
    const { rows } = await this.CLIENT.query(
      `SELECT * FROM servers WHERE approved = true AND LOWER(name) LIKE $1 ORDER BY player_count DESC LIMIT ${
        this.PAGE_SIZE
      } OFFSET ${(page - 1) * this.PAGE_SIZE}`,
      [`%${name}%`]
    );

    return rows;
  }

  public async findAllApproved(): Promise<Server[]> {
    const { rows } = await this.CLIENT.query(
      "SELECT * FROM servers WHERE approved = true"
    );

    return rows;
  }

  public async findAllUnapproved(): Promise<Server[]> {
    const { rows } = await this.CLIENT.query(
      `SELECT * FROM servers WHERE approved IS NULL or approved = false`
    );

    return rows;
  }

  public async findAllNoWebsites(): Promise<Server[]> {
    const { rows } = await this.CLIENT.query(
      `SELECT * FROM servers WHERE website IS NULL OR website = ''`
    );

    return rows;
  }

  public async findAllNoDiscord(): Promise<Server[]> {
    const { rows } = await this.CLIENT.query(
      `SELECT * FROM servers WHERE discord IS NULL OR discord = ''`
    );

    return rows;
  }

  public async validateAndInsert(ip: string, ping: JavaStatusResponse) {
    if (!ping.favicon) {
      throw Error("server must have a favicon!");
    }

    // Dupe check
    const existingServer = await this.findExisting(
      ip,
      ping.favicon,
      ping.motd.html
    );
    if (existingServer != null) {
      throw new Error(
        `ip, favicon, or motd already associated with server ${existingServer.id}`
      );
    }

    if (ping.players.online < 50) {
      throw new Error(`server must have at least 50 players online`);
    }

    // Create server
    return await this.insert({
      ip: ip,
      favicon: ping.favicon,
      motd: ping.motd.html,
      versionName: ping.version.name,
      versionProtocol: ping.version.protocol,
      playerCount: ping.players.online,
      maxPlayers: ping.players.max,
    });
  }

  public async update(server: UpdateServerRequest): Promise<Server> {
    let { id, ip, name, website, discord } = server;

    const { rows } = await this.CLIENT.query(
      `UPDATE servers SET ip = $1, name = $2, website = $3, discord = $4 WHERE id = $5`,
      [
        ip.trim().toLowerCase(),
        name,
        website.trim().toLowerCase(),
        discord.trim().toLowerCase(),
        id,
      ]
    );

    return rows[0];
  }

  public async approval(server: ApproveServerRequest): Promise<Server> {
    const { id, approved, name, notes, approver } = server;

    const { rows } = await this.CLIENT.query(
      `UPDATE servers SET approved = $1, name = $2, notes = $3, approver = $4 WHERE id = $5 RETURNING id`,
      [approved, name, notes, approver, id]
    );

    return rows[0];
  }

  public async findExisting(
    ip: string,
    favicon: string,
    motd: string
  ): Promise<Server | null> {
    const { rows } = await this.CLIENT.query(
      "SELECT * FROM servers WHERE ip = $1 OR favicon = $2 OR motd = $3",
      [ip, favicon, motd]
    );

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  }

  private async insert(server: InsertServerRequest): Promise<Server> {
    const {
      ip,
      favicon,
      motd,
      versionName,
      versionProtocol,
      playerCount,
      maxPlayers,
    } = server;

    const { rows } = await this.CLIENT.query(
      `INSERT INTO servers (ip, favicon, motd, version_name, version_protocol, player_count, max_players)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id`,
      [ip, favicon, motd, versionName, versionProtocol, playerCount, maxPlayers]
    );

    return rows[0];
  }
}

export type InsertServerRequest = {
  ip: string;
  favicon: string;
  motd: string;
  versionName: string;
  versionProtocol: number;
  playerCount: number;
  maxPlayers: number;
};

export type UpdateServerRequest = {
  id: number;
  ip: string;
  name: string;
  website: string;
  discord: string;
};

export type ApproveServerRequest = {
  id: number;
  approved: boolean;
  name: string;
  notes?: string;
  approver: string;
};

export type Server = {
  id: number;
  ip: string;
  name?: string;
  favicon: string;
  motd: string;
  version_name: string;
  version_protocol: number;
  player_count: number;
  max_players: number;
  approved?: boolean;
  notes?: string;
  approver?: string;
  website?: string;
  discord?: string;
  created_date: Date;
};

const validateEnv = (keys: string[]) => {
  for (const key of keys) {
    if (!process.env[key]) {
      throw new Error(`'${key}' environment variable must be set!`);
    }
  }
};

validateEnv(["PGUSER", "PGPASSWORD", "PGHOST", "PGPORT", "PGDATABASE"]);

export default new Servers();
