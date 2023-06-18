import type {
  DiscordGatewayAdapterCreator,
  DiscordGatewayAdapterLibraryMethods,
} from "@discordjs/voice";
import {
  GatewayDispatchEvents,
  GatewayVoiceServerUpdateDispatchData,
  GatewayVoiceStateUpdateDispatchData,
} from "discord.js";
import {
  Snowflake,
  Client,
  Events,
  Guild,
  VoiceBasedChannel,
  Status
} from "discord.js";

const adapters = new Map<Snowflake, DiscordGatewayAdapterLibraryMethods>();
const trackedClients = new Set<Client>();
const trackedShards = new Map<number, Set<Snowflake>>();

const trackClient = (client: Client) => {
  if (trackedClients.has(client)) return;

  trackedClients.add(client);

  client.ws.on(
    GatewayDispatchEvents.VoiceStateUpdate,
    (payload: GatewayVoiceServerUpdateDispatchData) => {
      adapters.get(payload.guild_id)?.onVoiceServerUpdate(payload);
    }
  );

  client.ws.on(
    GatewayDispatchEvents.VoiceStateUpdate,
    (payload: GatewayVoiceStateUpdateDispatchData) => {
      if (
        payload.guild_id &&
        payload.session_id &&
        payload.user_id === client.user?.id
      ) {
        adapters.get(payload.guild_id)?.onVoiceStateUpdate(payload);
      }
    }
  );

  client.on(Events.ShardDisconnect, (_, shardId) => {
    const guilds = trackedShards.get(shardId);

    if (guilds) {
      for (const guildID in guilds.values) {
        adapters.get(guildID)?.destroy();
      }
    }
    trackedShards.delete(shardId);
  });
};

const trackGuild = (guild: Guild) => {
  let guilds = trackedShards.get(guild.shardId);

  if (!guilds) {
    guilds = new Set();
    trackedShards.set(guild.shardId, guilds);
  }
  guilds.add(guild.id);
};

export const createDiscordJSAdapter = (
  channel: VoiceBasedChannel
): DiscordGatewayAdapterCreator => {
  return (methods) => {
    adapters.set(channel.guild.id, methods);
    trackClient(channel.client);
    trackGuild(channel.guild);

    return {
      sendPayload(data) {
        if (channel.guild.shard.status === Status.Ready) {
          channel.guild.shard.send(data);
          return true;
        }
        return false;
      },
      destroy() {
        return adapters.delete(channel.guild.id);
      },
    };
  };
};
