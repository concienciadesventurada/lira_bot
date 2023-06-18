import { VoiceBasedChannel } from "discord.js";
import {
  VoiceConnectionStatus,
  entersState,
  joinVoiceChannel,
} from "@discordjs/voice";

export const connectToChannel = async (channel: VoiceBasedChannel) => {
  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
    selfDeaf: false,
    selfMute: false,
  });

  try {
    await entersState(connection, VoiceConnectionStatus.Ready, 30_000);

    return connection;
  } catch (err) {
    connection.destroy();

    throw err;
  }
};
