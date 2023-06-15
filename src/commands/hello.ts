import { CommandInteraction, Client } from "discord.js";
import { Command } from "src/command";

export const Hello: Command = {
  name: "hello",
  description: "Returns a greeting",
  run: async (client: Client, interaction: CommandInteraction) => {
    const content = "oLA";

    await interaction.followUp({
      ephemeral: true,
      content
    })
  }
}
