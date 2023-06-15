import { CommandInteraction, Client } from "discord.js";
import { Command } from "../interfaces/command";

export const Jason: Command = {
  name: "jason",
  description: "Returns a Jason",
  run: async (client: Client, interaction: CommandInteraction) => {
    const content = "oLA jason culiao basao";

    await interaction.followUp({
      ephemeral: true,
      content
    })
  }
}
