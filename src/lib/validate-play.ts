import { CommandInteraction } from "discord.js";
import { getVoiceConnection } from "@discordjs/voice";

export default async function validatePlayConnectionAndChannel(
  interaction: CommandInteraction
) {
  if (!interaction.inCachedGuild()) return;

  const channel = interaction.member.voice.channel;
  const connection = getVoiceConnection(interaction.guildId);
  const { value: url } = interaction.options.get("url", true);

  if (!channel) {
    await interaction.followUp({
      ephemeral: true,
      content:
        "You must be in a voice channel to play or add songs to a playlist.",
    });
    return;
  }
  if (!url || typeof url !== "string") {
    await interaction.followUp({
      ephemeral: true,
      content: "Please provide a valid url to play or add to a playlist.",
    });
    return;
  }
  if (!connection) {
    await interaction.followUp({
      ephemeral: true,
      content:
        "Please use the command /join or /init to connect me to your current voice channel.",
    });
    return;
  }
}
