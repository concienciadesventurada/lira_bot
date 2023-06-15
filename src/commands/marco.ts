import { CommandInteraction, Client } from "discord.js";
import { Command } from "../interfaces/command";

export const Marco: Command = {
  name: "marco",
  description: "Returns a Polo",
  run: async (client: Client, interaction: CommandInteraction) => {
    const content = "polo";

    await interaction.followUp({
      ephemeral: true,
      content
    })
  }
}
