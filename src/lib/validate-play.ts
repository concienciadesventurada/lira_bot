import { CommandInteraction } from "discord.js";
import { getVoiceConnection } from "@discordjs/voice";

export default async function validatePlayConnectionAndChannel(
  interaction: CommandInteraction
) {
  if (!interaction.inCachedGuild()) return;

  const channel = interaction.member.voice.channel;
  const connection = getVoiceConnection(interaction.guildId);

  if (!channel) {
    await interaction.followUp({
      ephemeral: true,
      content:
        "You must be in a voice channel to play or add songs to a playlist.",
    });
    return new Error(
      "User who called the command is not connected to a voice channel."
    );
  }
  if (!connection) {
    await interaction.followUp({
      ephemeral: true,
      content:
        "Please use the command /join or /init to connect me to your current voice channel.",
    });
    return new Error("There is no connection.");
  }

  return;
}
