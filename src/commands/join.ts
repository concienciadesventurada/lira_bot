import { CommandInteraction, Client } from "discord.js";
import { Command } from "../interfaces/command";

export const Join: Command = {
  name: "join",
  description: "Makes the bot enter a voice channel",
  // @ts-ignore
  run: async (client: Client, interaction: CommandInteraction) => {
    const content = "join triggered";

    await interaction.followUp({
      ephemeral: true,
      content
    })
  }
}
