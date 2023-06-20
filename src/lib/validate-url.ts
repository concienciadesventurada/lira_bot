import { CommandInteraction } from "discord.js";

// TODO: Use it
export default async function validatePlayUrl(interaction: CommandInteraction) {
  if (!interaction.inCachedGuild()) return;

  const { value: url } = interaction.options.get("url", true);

  if (!url || typeof url !== "string") {
    await interaction.followUp({
      ephemeral: true,
      content: "Please provide a valid url to play or add to a playlist.",
    });
  }
  return url;
}

